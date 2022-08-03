import { Component, OnInit } from '@angular/core';
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
    //Se crea estructura de formulario
    this.formData = this.fb.group({
      number: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  calculate() {
    //Se crea un arreglo con los numeros del 1 al numero ingresado con ES6 con una funciona map para empezar desde el 1
    this.numbers = Array.from({ length: this.formData.controls['number'].value }, (_, i) => i + 1);
  }
}
