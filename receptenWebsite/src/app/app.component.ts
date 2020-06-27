import {Component, OnInit} from '@angular/core';
import {ConfigService} from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ReceptenWebsite';
  loggedIn: boolean;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
  }



  checkIfJWTValid() {
    this.configService.verifyJWT().subscribe(
      res => this.setLoggedIn(true),
      error => this.setLoggedIn(false));
  }

  setLoggedIn(b: boolean) {
    console.log(b);
    this.loggedIn = b;
  }

  logout() {
    localStorage.removeItem('jwt');
    this.setLoggedIn(false);
  }
}




