import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asistente } from '../interfaces/asistente.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardarInfoService {

  constructor(private http: HttpClient) { }

nuevoParticipante(asistente: Asistente) {

  return this.http.post('https://www.themyt.com/frankie/funcionesfrankie.php', asistente);
}

obtenerParticipantes() {

  const request = "Hola";
  return this.http.post('https://www.themyt.com/frankie/buscarInfo.php', request );
}
getInfo(): Observable<any[]> {
  return this.http.get<any>('https://www.themyt.com/frankie/buscarInfo.php')
      ;
}
}
