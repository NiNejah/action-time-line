# [Student Activity Visualization Tool](https://sav-tool.web.app/)

![Screenshot](home.png)

An AI-powered tool for analyzing second language (French) writing patterns with Gemini integration.

## Features

- 📊 **Multi-Modal Visualization**
  - Interactive XRange Timeline
  - Before/After Comparison Charts
  - AI-Generated Insights

- 🎨 **Color-coded Actions**: Consistent color scheme across visualizations
- 📁 **CSV Import**: Process multiple student files simultaneously
- 🔍 **Interactive Charts**: Zoomable timeline and detailed tooltips

## Installation

1. **Prerequisites**
   - Node.js (v14+)
   - npm (v6+)
   - Angular CLI (`npm install -g @angular/cli`)
   - Google Gemini API Key ([Get Key](https://aistudio.google.com/app/apikey))

2. **Clone Repository**
    ```bash
    git clone https://github.com/NiNejah/action-time-line.git
    cd action-time-line
    ```
3. **Install Dependencies**
    ```bash
    npm install
    ```

4. **Run Application**
    ```bash
    npm start or ng serve --open
    ```

## Configuration

### Environment Variables
Google Gemini API Key ([Get Key](https://aistudio.google.com/app/apikey))
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  GEMINI_API_KEY: 'your_google_api_key_here' // Required for AI features
};
```

## Data Preparation

### CSV Format Requirements

* **File Naming Convention:**
  * [student-name]-SANS.csv
  * [student-name]-AVEC.csv 

* **File Content:**
```csv
temps,description
00:01:30,Cop-txt-trad
00:00:45,frappe
00:00:15,pause
```

## Usage 

1. **Upload Files**
   * Click "Choose Files" and select student CSV files
   * Files must follow naming convention `studentname-SANS.csv` / `studentname-AVEC.csv`
2. **Analyze Patterns**
   - Toggle visualization types
   - Hover for detailed metrics
   - Click copy icon 📋 to export insights

3. **AI Features**
   - Automatic analysis on upload
   - Refresh with 🔄 button
   - Error handling with snackbar notifications
 
4. **Toggle Views**
    * Use checkboxes to show/hide:
      * 🥧 Pie Charts (Time distribution)
      * ⏳ Timeline (Chronological sequence)
  
5. **Interpret Results**
    * **Timeline:**
      * X-axis: Time progression
      * Y-axis: Before/After phases
      * Colors: Action types
    * **Pie Charts:**
      * Left: Before intervention
      * Right: After intervention
      * Percentage: Time allocation per action

6. **Interact with Charts**
    * **Timeline:**
      * Drag to zoom
      * Click bars for details
      * Use reset zoom button
    * **Pie Charts:**
      * Hover for time breakdown
      * Click slices to highlight