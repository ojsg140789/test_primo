import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  formData: FormGroup;
  numbers: Array<any> = [];

  constructor(private fb: FormBuilder, private store: AngularFirestore) {
    //Se crea estructura de formulario
    this.formData = this.fb.group({
      number: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  calculate() {
    //Se crea arreglo con numeros primo con ayuda del operador modulo
    for (let index = 1; index <= this.formData.controls['number'].value; index++) {
      if (index % 3 == 0 || index % 5 == 0 || index % 7 == 0) {
        this.numbers.push(index);
      }
    }
    //Cada que se realiza un calculo se agrega un documento a la base de datos
    this.store
      .collection('primosCollection')
      .add({
        numero: this.formData.controls['number'].value,
        primos: this.numbers,
      })
      .then((res) => {})
      .catch((e) => {
        console.error(e);
      });
  }
}
