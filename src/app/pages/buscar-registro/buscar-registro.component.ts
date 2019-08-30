import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistente } from '../../interfaces/asistente.interface';
import { GuardarInfoService } from '../../services/guardar-info.service';

@Component({
  selector: 'app-buscar-registro',
  templateUrl: './buscar-registro.component.html',
  styleUrls: ['./buscar-registro.component.css']
})
export class BuscarRegistroComponent implements OnInit {


  items: any[];
  usersJson: any[];

  constructor(private http: GuardarInfoService) {
    this.getInfo();
   }

  ngOnInit() {

  }

  getInfo() {
    this.http.obtenerParticipantes().subscribe((data) => {
      console.log(data);
      // tslint:disable-next-line:no-string-literal
      // this.items = data;
      this.usersJson = Array.of(data);
      console.log (this.usersJson);
    });
  }
}
