import { Component, OnInit } from '@angular/core';
import { Asistente } from '../../interfaces/asistente.interface';

@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.css']
})
export class NuevoRegistroComponent implements OnInit {

  submitted = false;
errorCoincidenciaCorreo = false;
  asistente: Asistente;

  constructor() {
    this.asistente = new Asistente();
   }

  ngOnInit() {
  }

  guardar() {
    console.log('guardar');
  }

  atras() {
  }
}
