import { Component, OnInit } from '@angular/core';
import { Asistente } from '../../interfaces/asistente.interface';
import { GuardarInfoService } from '../../services/guardar-info.service';

@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.css']
})
export class NuevoRegistroComponent implements OnInit {

  submitted = false;
  errorCoincidenciaCorreo = false;
  asistente: Asistente;

  constructor(private guardarService: GuardarInfoService) {
    this.asistente = new Asistente();
   }

  ngOnInit() {
  }

  guardarAsistente() {
    console.log('guardar');
    this.guardarService.nuevoParticipante(this.asistente).subscribe ( (data) => {

      // tslint:disable-next-line:no-string-literal
      if (data['estado'] === 1) {
        console.log('si guardó ' + data);
        this.submitted = true;
      } else {
        console.log('No guardó' + data);
      }
    });

  }

  atras() {
  }
}
