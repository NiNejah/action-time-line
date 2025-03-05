// legend.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { COLOR, LegendItem } from '../type';


@Injectable({ providedIn: 'root' })
export class LegendService {
  private legendItemsSubject = new BehaviorSubject<LegendItem[]>(this.loadFromStorage());
  legendItems$ = this.legendItemsSubject.asObservable();

  private loadFromStorage(): LegendItem[] {
    const saved = localStorage.getItem('legendColors');
    return saved ? JSON.parse(saved) : Object.entries(COLOR).map(([key, color]) => ({ key, color }));
  }

  private saveToStorage(items: LegendItem[]): void {
    localStorage.setItem('legendColors', JSON.stringify(items));
  }

  addItem(item: LegendItem): void {
    const current = this.legendItemsSubject.value;
    const updated = [...current, item];
    this.legendItemsSubject.next(updated);
    this.saveToStorage(updated);
  }

  removeItem(key: string): void {
    const updated = this.legendItemsSubject.value.filter(item => item.key !== key);
    this.legendItemsSubject.next(updated);
    this.saveToStorage(updated);
  }
}