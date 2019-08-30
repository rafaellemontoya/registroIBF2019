import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoRegistroComponent } from './pages/nuevo-registro/nuevo-registro.component';
import { BuscarRegistroComponent } from './pages/buscar-registro/buscar-registro.component';

const routes: Routes = [
  {path: 'nuevo-registro', component: NuevoRegistroComponent},
  {path: 'buscar-registro', component: BuscarRegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
