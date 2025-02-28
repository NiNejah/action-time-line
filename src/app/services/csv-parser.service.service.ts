import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvParserService {
  parse(csv: string): any[] {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      if (values.length < 2) return null;
      
      const duration = this.timeToSeconds(values[0]);
      return {
        durationInSecond: duration,
        etiquette: values[1].trim()
      };
    }).filter(Boolean);
  }

  private timeToSeconds(timeString: string): number {
    const parts = timeString.split(':').map(part => parseInt(part, 10));
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
}