import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { NormasComponent } from './components/normas/normas.component';
import { EmpalmadoresComponent } from './components/empalmadores/empalmadores.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'historico', component: HistoricoComponent},
    { path: 'normas', component: NormasComponent},
    { path: 'empalmador', component: EmpalmadoresComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];
