import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoodschappenlijstComponent } from './boodschappenlijst/boodschappenlijst.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ReceptenDelenComponent } from './recepten-delen/recepten-delen.component';
import { ReceptenPaginaComponent } from './recepten-pagina/recepten-pagina.component';
import { AlInHuisComponent } from './al-in-huis/al-in-huis.component';
import { BoodschappenlijstjeComponent } from './boodschappenlijstje/boodschappenlijstje.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BereidingsweizeComponent } from './bereidingsweize/bereidingsweize.component';
import { IngredientenComponent } from './ingredienten/ingredienten.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ZoekfunctieComponent } from './zoekfunctie/zoekfunctie.component';
import { PopulaireReceptenComponent } from './populaire-recepten/populaire-recepten.component';
import { ReceptVanDeDagComponent } from './recept-van-de-dag/recept-van-de-dag.component';
import { ReceptenInHuisComponent } from './recepten-in-huis/recepten-in-huis.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    BoodschappenlijstComponent,
    HomePageComponent,
    ReceptenDelenComponent,
    ReceptenPaginaComponent,
    AlInHuisComponent,
    BoodschappenlijstjeComponent,
    RegisterComponent,
    LoginComponent,
    BereidingsweizeComponent,
    IngredientenComponent,
    CategorieComponent,
    ZoekfunctieComponent,
    PopulaireReceptenComponent,
    ReceptVanDeDagComponent,
    ReceptenInHuisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
