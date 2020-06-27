import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-set-timer',
  templateUrl: './set-timer.component.html',
  styleUrls: ['./set-timer.component.css']
})
export class SetTimerComponent implements OnInit {

  @Input() timerId: number;

  @Output()
  public removeEvent = new EventEmitter<any>();

  minutes: any;
  seconds: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  remove(): void {
    this.removeEvent.emit(this.timerId);
  }

  getMinutes(): number {
    return this.minutes;
  }

  getSeconds(): number {
    return this.seconds;

  }



  getId(): number {
    return this.timerId;
  }

  validate(): boolean {
    if (this.seconds == null && this.minutes == null) {
      throw new Error('Lege timer!');
      return false;
    }

    if (this.minutes == null || this.minutes < 0) {
      this.minutes = 0;
    }
    if (this.seconds == null || this.seconds < 0) {
      this.seconds = 0;
    }

    if (this.minutes > 60 || this.minutes > 60) {
      throw new Error('Te hoog getal ingevuld!');
      return false;
    }

    return true;
  }


  getData(): number {
    return (this.minutes * 60) + this.seconds;
  }
}
