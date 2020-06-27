import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Output() loggedIn: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {



  }

}
