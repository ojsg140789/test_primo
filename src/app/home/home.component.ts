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
  multiplos: any = {
    number: '',
    color: '',
    multiplos: [],
  };

  constructor(private fb: FormBuilder, private store: AngularFirestore) {
    //Se crea estructura de formulario
    this.formData = this.fb.group({
      number: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  calculate() {
    this.multiplos = {
      number: this.formData.controls['number'].value,
      color: '',
      multiplos: [],
    };
    let color = undefined;
    //El número debe ser mayor a 0, si la funcion regresa verdadero es multiplo de 3 y se agrega al arreglo para indicar que tiene multiplo
    if (this.formData.controls['number'].value > 0 && this.multiple(this.formData.controls['number'].value, 3)) {
      color = 'verde';
      this.multiplos.multiplos.push(3);
    }
    //El número debe ser mayor a 0, si la funcion regresa verdadero es multiplo de 5 y se agrega al arreglo para indicar que tiene multiplo
    if (this.formData.controls['number'].value > 0 && this.multiple(this.formData.controls['number'].value, 5)) {
      color = !color ? 'rojo' : color;
      this.multiplos.multiplos.push(5);
    }
    //El número debe ser mayor a 0, si la funcion regresa verdadero es multiplo de 7 y se agrega al arreglo para indicar que tiene multiplo
    if (this.formData.controls['number'].value > 0 && this.multiple(this.formData.controls['number'].value, 7)) {
      color = !color ? 'azul' : color;
      this.multiplos.multiplos.push(7);
    }
    this.multiplos.color = color ? color : 'none';
    console.log('this.multiplos', this.multiplos);

    //Cada que se realiza un calculo se agrega un documento a la base de datos
    this.store
      .collection('primosCollection')
      .add({
        primos: this.multiplos,
      })
      .then((res) => {})
      .catch((e) => {
        console.error(e);
      });
  }

  //Función que define si tiene multiplo por medio de dos parametros, el numero y el multipo a conocer
  multiple(valor: number, multiple: number) {
    let resto = valor % multiple;
    if (resto == 0) return true;
    else return false;
  }
}
