import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  title = 'Student Activity Visualization Tool';

  scrollToUpload() {
    document.querySelector('.setting-control')?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
