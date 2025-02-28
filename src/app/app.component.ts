import { Component } from '@angular/core';
import { CsvParserService } from './services/csv-parser.service.service';
import { action, COLOR, student } from './type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Chachout Student Activity Visualization Tool';
  showPieCharts = false;
  showTimeline = false;
  students: student[] = [];
  colorEntries = Object.entries(COLOR).map(([key, value]) => ({ key, value }));
  private studentsMap: { [key: string]: student } = {};

  constructor(private csvParser: CsvParserService) {}

  async onFileSelected(event: any) {
    const files = event.target.files;
    this.studentsMap = {};

    for (const file of files) {
      try {
        const content = await this.readFile(file);
        const actions = this.csvParser.parse(content);
        this.processFile(file.name, actions);
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }

    this.students = Object.values(this.studentsMap);
  }

  private processFile(filename: string, actions: action[]) {
    const match = filename.match(/^(.*?)-(AVEC|SANS)\.csv$/i);
    if (!match) return;

    const studentName = match[1].trim();
    const type = match[2].toLowerCase() as 'sans' | 'avec';

    if (!this.studentsMap[studentName]) {
      this.studentsMap[studentName] = {
        name: studentName,
        sansAction: [],
        avecAction: []
      };
    }

    if (type === 'sans') {
      this.studentsMap[studentName].sansAction = actions;
    } else {
      this.studentsMap[studentName].avecAction = actions;
    }
  }

  private readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
}
