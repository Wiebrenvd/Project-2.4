import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BoodschappenlijstComponent } from './boodschappenlijst/boodschappenlijst.component';
import { ReceptenPaginaComponent } from './recepten-pagina/recepten-pagina.component';
import { ReceptenDelenComponent } from './recepten-delen/recepten-delen.component';
import { CategorieComponent } from './categorie/categorie.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'boodschappenlijstje', component: BoodschappenlijstComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'recept', component: ReceptenPaginaComponent},
  {path: 'receptDelen', component: ReceptenDelenComponent},
  {path: 'categorie', component: CategorieComponent},
  {path: 'registreren', component: RegisterComponent},
  {path: 'inloggen', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
