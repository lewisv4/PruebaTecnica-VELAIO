import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cacheKey = 'taskCache';

  // Almacenar en LocalStorage
  setItem(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Obtener del LocalStorage
  getItem(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Limpiar el cache
  clearItem(key: string): void {
    localStorage.removeItem(key);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el cache
  clearAll(): void {
    localStorage.clear();
  }
}

