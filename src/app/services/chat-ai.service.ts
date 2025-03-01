import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';
import { AnalysisResult } from '../type';

@Injectable({
  providedIn: 'root'
})
export class ChatAiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
      }
    });
  }

  async analyzeStudentData(prompt: string): Promise<AnalysisResult> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Clean response and parse JSON  
      const cleanedResponse = text.replace(/```json/g, '').replace(/```/g, '');
      const analysis: AnalysisResult = JSON.parse(cleanedResponse);

      // Validate response structure
      if (!analysis.metrics || !analysis.conclusions || !analysis.recommendations) {
        throw new Error('Invalid analysis format');
      }

      return analysis;
    } catch (error) {
      console.error('Error fetching AI analysis:', error);
      throw new Error('Analysis failed. Please try again later.');
    }
  }
}