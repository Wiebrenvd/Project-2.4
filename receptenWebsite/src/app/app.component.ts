import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'receptenWebsite';
  public loggedIn: boolean;

  ngOnInit() {

    if (localStorage.getItem('jwt')) {
      this.loggedIn = true;
    }

  }


}




