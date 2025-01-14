class StorageService {
	getInt(key: string): number | null {
		const value = localStorage.getItem(key);
		return value ? Number.parseInt(value) : null;
	}

	setItem(key: string, value: unknown) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}

export const storageService = new StorageService();
