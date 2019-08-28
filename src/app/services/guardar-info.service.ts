import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asistente } from '../interfaces/asistente.interface';

@Injectable({
  providedIn: 'root'
})
export class GuardarInfoService {

  constructor(private http: HttpClient) { }

nuevoParticipante(asistente: Asistente) {

  return this.http.post('https://www.themyt.com/frankie/funcionesfrankie.php', asistente);
}
}
