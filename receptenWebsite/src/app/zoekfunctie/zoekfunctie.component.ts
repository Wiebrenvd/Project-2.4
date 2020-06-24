import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-zoekfunctie',
  templateUrl: './zoekfunctie.component.html',
  styleUrls: ['./zoekfunctie.component.css']
})
export class ZoekfunctieComponent implements OnInit {
  searchString: string;


  constructor(private configService: ConfigService, private router: Router) {
  }

  ngOnInit(): void {
    this.searchString = '';
  }

  submit() {
    this.router.navigate(['resultaat', this.searchString]);
  }

}
