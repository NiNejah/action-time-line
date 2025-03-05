import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentInfoComponent } from './student-info/student-info.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { StudentPieChartsComponent } from './student-pie-charts/student-pie-charts.component';
import { StudentAnalysisComponent } from './student-analysis/student-analysis.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { LegendComponent } from './legend/legend.component';
import { StudentAccordionComponent } from './student-accordion/student-accordion.component';
import { SettingsControlComponent } from './settings-control/settings-control.component';
import { LoadingComponent } from './loading/loading.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AppComponent,
    StudentInfoComponent,
    StudentPieChartsComponent,
    StudentAnalysisComponent,
    StudentDashboardComponent,
    LandingComponent,
    LegendComponent,
    StudentAccordionComponent,
    SettingsControlComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
