class StorageService {
  getInt(key: string): number | null {
    const value = localStorage.getItem(key);
    return value ? parseInt(value) : null;
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const storageService = new StorageService();
