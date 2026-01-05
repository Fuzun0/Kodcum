/**
 * Safe Code Runner
 * Kullanıcı kodlarını güvenli bir şekilde çalıştırmak için sandbox
 */

import logger from './logger';

// Çalıştırma sonucu
interface RunResult {
  success: boolean;
  output: string[];
  error: string | null;
  executionTime: number;
}

// Güvenli global objeler (sadece bunlara erişim var)
const SAFE_GLOBALS = [
  'Math',
  'Date',
  'String',
  'Number',
  'Boolean',
  'Array',
  'Object',
  'JSON',
  'parseInt',
  'parseFloat',
  'isNaN',
  'isFinite',
  'encodeURI',
  'decodeURI',
  'encodeURIComponent',
  'decodeURIComponent'
];

// Yasaklı anahtar kelimeler
const FORBIDDEN_PATTERNS = [
  /\beval\b/,
  /\bFunction\b/,
  /\bimport\b/,
  /\bexport\b/,
  /\brequire\b/,
  /\bprocess\b/,
  /\bglobal\b/,
  /\bwindow\b/,
  /\bdocument\b/,
  /\bfetch\b/,
  /\bXMLHttpRequest\b/,
  /\bWebSocket\b/,
  /\bsetTimeout\b/,
  /\bsetInterval\b/,
  /\bclearTimeout\b/,
  /\bclearInterval\b/,
  /\b__proto__\b/,
  /\bconstructor\b\.prototype/,
  /\.prototype\s*=/,
];

// Maksimum çalışma süresi (ms)
const MAX_EXECUTION_TIME = 3000;

// Maksimum output satır sayısı
const MAX_OUTPUT_LINES = 100;

// Maksimum output karakter sayısı
const MAX_OUTPUT_CHARS = 10000;

class SafeCodeRunner {
  /**
   * Kodun güvenli olup olmadığını kontrol et
   */
  validateCode(code: string): { valid: boolean; error?: string } {
    // Yasaklı pattern kontrolü
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(code)) {
        return {
          valid: false,
          error: `Güvenlik: "${pattern.source.replace(/\\b/g, '')}" kullanımına izin verilmiyor.`
        };
      }
    }

    // Çok uzun kod kontrolü
    if (code.length > 50000) {
      return {
        valid: false,
        error: 'Kod çok uzun (maksimum 50.000 karakter).'
      };
    }

    // Sonsuz döngü tespiti (basit)
    if (/while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)/.test(code)) {
      return {
        valid: false,
        error: 'Sonsuz döngü tespit edildi.'
      };
    }

    return { valid: true };
  }

  /**
   * JavaScript kodunu güvenli çalıştır
   */
  runJavaScript(code: string): RunResult {
    const startTime = Date.now();
    const output: string[] = [];
    
    // Güvenlik kontrolü
    const validation = this.validateCode(code);
    if (!validation.valid) {
      return {
        success: false,
        output: [],
        error: validation.error || 'Geçersiz kod',
        executionTime: Date.now() - startTime
      };
    }

    // Custom console oluştur
    const customConsole = {
      log: (...args: any[]) => {
        if (output.length < MAX_OUTPUT_LINES) {
          const line = args.map(arg => this.formatValue(arg)).join(' ');
          if ((output.join('\n').length + line.length) < MAX_OUTPUT_CHARS) {
            output.push(line);
          }
        }
      },
      error: (...args: any[]) => {
        if (output.length < MAX_OUTPUT_LINES) {
          const line = '❌ ' + args.map(arg => this.formatValue(arg)).join(' ');
          if ((output.join('\n').length + line.length) < MAX_OUTPUT_CHARS) {
            output.push(line);
          }
        }
      },
      warn: (...args: any[]) => {
        if (output.length < MAX_OUTPUT_LINES) {
          const line = '⚠️ ' + args.map(arg => this.formatValue(arg)).join(' ');
          if ((output.join('\n').length + line.length) < MAX_OUTPUT_CHARS) {
            output.push(line);
          }
        }
      },
      info: (...args: any[]) => {
        if (output.length < MAX_OUTPUT_LINES) {
          const line = 'ℹ️ ' + args.map(arg => this.formatValue(arg)).join(' ');
          if ((output.join('\n').length + line.length) < MAX_OUTPUT_CHARS) {
            output.push(line);
          }
        }
      },
      table: (data: any) => {
        if (output.length < MAX_OUTPUT_LINES) {
          const line = this.formatValue(data);
          if ((output.join('\n').length + line.length) < MAX_OUTPUT_CHARS) {
            output.push(line);
          }
        }
      }
    };

    try {
      // console.log'ları replace et
      const safeCode = code
        .replace(/console\.log/g, 'customConsole.log')
        .replace(/console\.error/g, 'customConsole.error')
        .replace(/console\.warn/g, 'customConsole.warn')
        .replace(/console\.info/g, 'customConsole.info')
        .replace(/console\.table/g, 'customConsole.table');

      // Güvenli context oluştur
      const sandbox = {
        customConsole,
        Math,
        Date,
        String,
        Number,
        Boolean,
        Array,
        Object,
        JSON,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        encodeURI,
        decodeURI,
        encodeURIComponent,
        decodeURIComponent,
        undefined,
        NaN,
        Infinity
      };

      // Sandbox parametreleri
      const sandboxKeys = Object.keys(sandbox);
      const sandboxValues = Object.values(sandbox);

      // Fonksiyon oluştur ve çalıştır
      const fn = new Function(...sandboxKeys, `
        "use strict";
        ${safeCode}
      `);

      fn(...sandboxValues);

      return {
        success: true,
        output,
        error: null,
        executionTime: Date.now() - startTime
      };

    } catch (error: any) {
      logger.error('Code execution error:', error.message);
      
      return {
        success: false,
        output,
        error: this.formatError(error),
        executionTime: Date.now() - startTime
      };
    }
  }

  /**
   * HTML kodunu kontrol et (XSS önleme)
   */
  sanitizeHTML(html: string): string {
    // Script taglarını kaldır
    let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Event handler'ları kaldır
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    
    // javascript: protokolünü kaldır
    sanitized = sanitized.replace(/javascript:/gi, '');
    
    // data: URI'leri kaldır (potansiyel XSS)
    sanitized = sanitized.replace(/data:/gi, 'data-blocked:');
    
    return sanitized;
  }

  /**
   * Değeri string'e çevir
   */
  private formatValue(value: any): string {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }
    
    return String(value);
  }

  /**
   * Hata mesajını formatla
   */
  private formatError(error: Error): string {
    let message = error.message;
    
    // Satır numarası bilgisi ekle
    if (error.stack) {
      const lineMatch = error.stack.match(/<anonymous>:(\d+):(\d+)/);
      if (lineMatch) {
        const line = parseInt(lineMatch[1]) - 2; // Wrapper satırlarını çıkar
        const col = parseInt(lineMatch[2]);
        message += ` (Satır ${line}, Sütun ${col})`;
      }
    }
    
    return message;
  }

  /**
   * Kod çalıştırma sonucunu formatla
   */
  formatOutput(result: RunResult): string {
    if (result.error) {
      return `❌ Hata: ${result.error}`;
    }
    
    if (result.output.length === 0) {
      return '✅ Kod başarıyla çalıştı (çıktı yok)';
    }
    
    return result.output.join('\n');
  }
}

export default new SafeCodeRunner();
