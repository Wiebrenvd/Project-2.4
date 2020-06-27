import {Component, OnInit, ViewChild} from '@angular/core';
import {BereidingswijzeComponent} from '../bereidingswijze/bereidingswijze.component';
import {IngredientenComponent} from '../ingredienten/ingredienten.component';
import {ConfigService} from '../config.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-recepten-delen',
  templateUrl: './recepten-delen.component.html',
  styleUrls: ['./recepten-delen.component.css']
})
export class ReceptenDelenComponent implements OnInit {

  @ViewChild(BereidingswijzeComponent) bereidingsWijze: BereidingswijzeComponent;

  @ViewChild(IngredientenComponent) ingredientenComponent: IngredientenComponent;

  public error: any;


  constructor(private configService: ConfigService, private router: Router) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.error = null;
    // Clear warning
    let name, bereidingswijze, ingredienten, timers;
    try {

      name = this.bereidingsWijze.getName();
      bereidingswijze = this.bereidingsWijze.getBereidingswijze(); // Verkrijg textarea data

      ingredienten = this.ingredientenComponent.getIngredienten();

      timers = this.bereidingsWijze.getTimerData();


    } catch (error) {
      this.showErrorPopup(error);
      return;
    }
    this.configService.sendNewRecipe(name, bereidingswijze, ingredienten, timers).subscribe(
      (res) => this.uploadSuccessful(res),
      error => console.log(error.message));


  }

  showErrorPopup(error: any) {
    this.error = error.message;
  }


  private uploadSuccessful(res: any) {
    this.router.navigate([`recept/${res.id}`]);
  }
}
