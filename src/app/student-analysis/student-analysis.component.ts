import { Component, Input, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { action, student } from '../type';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface AnalysisResult {
  metrics: {
    efficiency_change: number;
    accuracy_improvement: number;
    deepl_usage_impact: number;
  };
  conclusions: string[];
  recommendations: string[];
}

@Component({
  selector: 'app-student-analysis',
  templateUrl: './student-analysis.component.html',
  styleUrls: ['./student-analysis.component.scss']
})
export class StudentAnalysisComponent implements OnInit {
  @Input() student!: student;
  analysis: AnalysisResult | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.analyzeStudentData();
  }

  private analyzeStudentData(): void {
    this.isLoading = true;
    const prompt = this.createAnalysisPrompt();
    
    this.http.post<any>(API_URL, {
      model:'deepseek-reasoner',
      messages: [{
        role: "user",
        content: prompt
      }],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${environment.deepseekApiKey}`,
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(error => {
        let errorMessage = 'Analysis failed';
        if (error.status === 402) {
          errorMessage = 'API quota exceeded - Please contact administrator';
        } else if (error.status === 401) {
          errorMessage = 'Invalid API configuration';
        }
        return throwError(() => new Error(errorMessage));
      })
    ).subscribe({
      next: (response) => {
        // ... existing handling
      },
      error: (err) => {
        this.error = err.message;
        this.isLoading = false;
        console.error('API Error:', err);
        // Consider fallback to local analysis
      }
    });
  }

  private createAnalysisPrompt(): string {
    const formatDuration = (seconds: number) => 
      new Date(seconds * 1000).toISOString().substr(11, 8);
    
    const beforeData = this.student.sansAction.map((a: action) => 
      `${a.etiquette}: ${formatDuration(a.durationInSecond)}`
    ).join('\n');

    const afterData = this.student.avecAction.map((a: action) => 
      `${a.etiquette}: ${formatDuration(a.durationInSecond)}`
    ).join('\n');

    return `Analyze this FLE student's writing process data. Provide JSON output with:
    - metrics: efficiency_change (%), accuracy_improvement (%), deepl_usage_impact (%)
    - 3 conclusions
    - 3 recommendations
    
    BEFORE DEEPL USAGE:
    ${beforeData}
    
    AFTER DEEPL USAGE:
    ${afterData}
    
    Consider these factors:
    1. Time spent on corrections (immediate vs previous)
    2. Pause frequency/duration
    3. Direct tool usage (DeepL vs keyboard)
    4. Writing flow (linear vs fragmented)
    5. Revision patterns`;
  }
  
  onAnalyze(): void{
    this.analyzeStudentData();
  }
}