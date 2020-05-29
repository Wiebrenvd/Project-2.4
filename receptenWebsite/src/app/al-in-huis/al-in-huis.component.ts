import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredienten/ingredienten';
import { UserDataService } from '../user-data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-al-in-huis',
  templateUrl: './al-in-huis.component.html',
  styleUrls: ['./al-in-huis.component.css']
})
export class AlInHuisComponent implements OnInit {
  alInHuis: Ingredient[];

  constructor(private userDataService: UserDataService) { }
  ngOnInit(): void {
    this.getInHuis();
  }

  getInHuis(): void{
    this.userDataService.getInHuis().subscribe(alInHuis => this.alInHuis = alInHuis);
  }

  toevoegen(): void{
    this.alInHuis.push(new Ingredient(document.getElementById('name').innerText, document.getElementById('amount').innerText));
    console.log(document.getElementById('name').innerText);
    console.log('test');
  }

}
