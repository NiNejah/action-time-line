import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { action, DisplaySettings, student } from '../type';
import { CsvParserService } from '../services/csv-parser.service.service';
import { AnalysisService } from '../services/analysis-service';

@Component({
  selector: 'app-settings-control',
  templateUrl: './settings-control.component.html',
  styleUrl: './settings-control.component.scss'
})
export class SettingsControlComponent implements OnInit, OnDestroy {

  settingsKeys = ['showPie', 'showTimeline', 'showAnalysis'] as const;
  private studentsMap: { [key: string]: student } = {};
  settings: DisplaySettings | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private csvParser: CsvParserService,
    private analysisService: AnalysisService
  ) { }

  ngOnInit(): void {
    this.analysisService.settings$
      .pipe(takeUntil(this.destroy$))
      .subscribe(settings => {
        this.settings = settings;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  async onFileSelected(event: any) {
    this.analysisService.setLoading(true);
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
    this.analysisService.setLoading(false);
    this.analysisService.updateStudents(Object.values(this.studentsMap));
  }

  updateSetting(key: keyof DisplaySettings, event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (this.settings && target) {
      this.analysisService.updateSettings({
        ...this.settings,
        [key]: { ...this.settings[key], status: target.checked }
      });
    }
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
