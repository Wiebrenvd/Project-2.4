import {Component, OnInit, ViewChild} from '@angular/core';
import {BereidingswijzeComponent} from '../bereidingswijze/bereidingswijze.component';
import {IngredientenComponent} from '../ingredienten/ingredienten.component';

@Component({
  selector: 'app-recepten-delen',
  templateUrl: './recepten-delen.component.html',
  styleUrls: ['./recepten-delen.component.css']
})
export class ReceptenDelenComponent implements OnInit {

  @ViewChild(BereidingswijzeComponent) bereidingsWijze: BereidingswijzeComponent;

  @ViewChild(IngredientenComponent) ingredientenComponent: IngredientenComponent;

  public error: any;


  constructor() {
  }

  ngOnInit(): void {
  }

  submit() {
    this.error = null; // Clear warning

    try {
      // tslint:disable-next-line:prefer-const
      var bereidingswijze = this.bereidingsWijze.getBereidingswijze(); // Verkrijg textarea data

      // tslint:disable-next-line:prefer-const
      var ingredienten = this.ingredientenComponent.getIngredienten();

      var timers = this.bereidingsWijze.getTimerData(); // Verkrijg timer data: {id: __, minutes: __, seconds: __}

    } catch (error) {
      this.showErrorPopup(error);
      return;
    }

    console.log(bereidingswijze);
    console.log(ingredienten);
    console.log(timers);


    // sendDataToDatabase(); TODO

  }

  showErrorPopup(error: any) {
    this.error = error.message;
  }


}
