import { Component } from '@angular/core';
import { COLOR } from '../type';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss'
})
export class LegendComponent {
  colorEntries = Object.entries(COLOR).map(([key, value]) => ({ key, value }));

}
