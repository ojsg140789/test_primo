import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  formData: FormGroup;
  numbers: Array<any> = [];

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      number: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  calculate() {
    this.numbers = Array(5).map((x, i) => i);
    console.log('this.numbers', this.numbers);
  }
}
