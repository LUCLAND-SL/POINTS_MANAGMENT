import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { HistoricoComponent } from "./components/historico/historico.component";
import { NormasComponent } from "./components/normas/normas.component";
import { EmpalmadoresComponent } from "./components/empalmadores/empalmadores.component";
import { HistoricoEmpComponent } from "./components/historico-emp/historico-emp.component";

const routesDef: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'historico', component: HistoricoComponent},
    { path: 'normas', component: NormasComponent},
    { path: 'empalmador', component: EmpalmadoresComponent},
    { path: 'historico-emp', component: HistoricoEmpComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routesDef)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
