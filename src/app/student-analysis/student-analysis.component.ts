import { Component, Input, OnInit } from '@angular/core';

import { action, AnalysisResult, student } from '../type';
import { ChatAiService } from '../services/chat-ai.service';

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

  constructor(private chatAiService: ChatAiService) { }

  ngOnInit(): void {
    if (this.analysis === null) {
      this.onAnalyze();
    }
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

    return `As a language learning expert, analyze this FLE student's writing process data.
  Generate JSON output with these exact keys:
  {
    "metrics": {
      "efficiency_change": number,
      "accuracy_improvement": number,
      "deepl_usage_impact": number
    },
    "conclusions": [3 strings],
    "recommendations": [3 strings]
  }
  
  Data Context:
  [BEFORE DEEPL]
  ${beforeData}
  
  [AFTER DEEPL]
  ${afterData}
  
  Analysis Requirements:
  1. Compare distribution of writing activities (typing, corrections, pauses)
  2. Analyze changes in writing processes/strategies
  3. Evaluate cognitive behavior patterns
  4. Measure DeepL's impact on workflow structure
  5. Study time redistribution between activities
  
  Strict Constraints:
  - Base all observations solely on the dataset provided
  - Do not reference external knowledge or common patterns
  - Avoid assumptions not verifiable by the data
  - Focus exclusively on quantifiable differences
  - Ignore any factors not represented in the data
  
  Required Output Structure:
  - Metrics as percentages (-100 to 100 range)
  - Conclusions: Specific to observable data patterns
  - Recommendations: Actionable teaching strategies`;
  }

  async onAnalyze(): Promise<void> {

    this.isLoading = true;
    this.error = null;

    try {
      const prompt = this.createAnalysisPrompt();
      this.analysis = await this.chatAiService.analyzeStudentData(prompt);
    } catch (error) {
      this.error = 'Failed to analyze student data.';
    } finally {
      this.isLoading = false;
    }
  }
}