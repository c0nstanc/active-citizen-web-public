export class BrowserStorageUtils {

  static storeEntry(key: string, value: any): void {
    if (value !== undefined && value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      this.deleteEntry(key);
    }
  }

  static readEntry<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key), reviver) as T;
  }

  static deleteEntry(key: string): void {
    localStorage.removeItem(key);
  }

  static deleteAll(): void {
    localStorage.clear();
  }

}

const dateFormat = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.{0,1}\d*))(?:Z|(\+|-)([\d|:]*))?$/;

function reviver(key: string, value: any): any {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
}

