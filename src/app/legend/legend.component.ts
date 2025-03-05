// legend.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LegendItem } from '../type';
import { LegendService } from '../services/legend.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  private destroy$ = new Subject<void>();
  legendItems!: LegendItem[];

  showAddForm = false;

  constructor(
    private legendService: LegendService,
    private fb: UntypedFormBuilder
  ) {
    this.form = this.fb.group({
      key: ['', Validators.required],
      color: ['#000000', Validators.required]
    });
  }

  ngOnInit(): void {
    this.legendService.legendItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.legendItems = items;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) this.form.reset();
  }

  addItem() {
    if (this.form.valid) {
      this.legendService.addItem(this.form.value as LegendItem);
      this.toggleForm();
    }
  }

  removeItem(key: string) {
    this.legendService.removeItem(key);
  }
}