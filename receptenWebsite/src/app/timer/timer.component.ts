import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

/*
* Deze timer werkt dmv timestamps. Elke seconde berekent hij het verschil tussen de starttijd en de tijd op dat moment.
* Als de timer gepauzeerd is, loopt hij wel door. De verloren seconden worden er weer bij op gerekend dmv de pauseTimeStamp en de timestamp op het moment van resumen.
*/
export class TimerComponent implements OnInit {
  // Het ID van de timer. Bij het uploaden van het recept wordt deze momenteel gezet. (0, 1 of 2)
  @Input() id: number;
  // Aantal seconden dat de timer moet lopen. Verandert NIET
  @Input() seconds: number;

  // Timestamp dat de timer is gestart
  private startTime: Date;
  // Timestamp wanneer hij gepauzeerd was
  private pauseTimeStamp: Date;

  // Of de timer aan het runnen is. Wanneer hij op pauze staat loopt de timer nog door, maar running staat op false.
  private running: boolean;

  // Het interval dat de view update
  private interval: any;

  // Begint bij de te-lopen seconden. Alle pauzes worden hier bij op gegooid.
  timeSum: number;

  /*
  * Aantal resterende seconden op het moment.
  * (Verschil tussen starttijd en stop/pauze tijd).
  * Stopt wanneer hij 0 bereikt. Begint bij this.seconds
  */
  time: number;

  // Knoptekst in de view
  buttonText: string;
  // Tijd in de view
  timeString: string;

  // Functie van de knop. Wordt geschakelt tussen Start, Stop en Resume
  buttonFunction: any;

  // Om de hoeveel ms hij de timer update.
  // Lager is hoger cpu gebruik. Hoger kan mogelijk seconden overslaan.
  // Default = 500
  private refreshRate = 500;

  constructor() {
  }

  ngOnInit(): void {
    this.reset();
  }

  /*
  * Zet alle waarden terug naar beginwaarden en update de view.
  * */
  private reset() {
    this.setButtonFunction(this.start);
    this.setButtonText('Start');
    this.setRunning(false);
    this.resetTime();
  }

  private resetTime() {
    this.timeSum = this.seconds;
    this.time = this.seconds;
    this.placeTimeString(); // Zet de juiste tijd in de view
  }

  /*
  * Stopt de timer volledig
  * */
  private stop() {
    this.setButtonFunction(this.reset);
    this.setButtonText('Reset');
  }


  /*
  * Pauzeert de timer om later hervat te worden
  * */
  private pause() {
    this.setButtonFunction(this.resume);
    this.setRunning(false);
    this.pauseTimeStamp = new Date(); // Stel nieuwe pauze tijdstip vast
    this.setButtonText('Start');
  }


  /*
  * Herstart de timer. Telt mogelijk een pauze op bij de time
  * */
  private resume() {
    if (this.pauseTimeStamp != null) {
      this.calcPauseDifference();
    }
    this.setRunning(true);
    this.setButtonText('Pause');
    this.setButtonFunction(this.pause);
  }

  /*
  * Berekent het verschil tussen de timestamp van de starttijd en timestamp op dit moment
  * */
  private calcTimeDifference() {
    const difference = ((new Date().getTime() / 1000) - (this.startTime.getTime() / 1000));
    const time = Math.round(this.timeSum - difference); // Rond het af. Op het eind afronden betekent mogelijk het skippen van seconden.
    if (time < 0) {
      this.time = 0;
    } else {
      this.time = time;
    }
  }

  /*
  * Creëert tijdstrings en laat ze zien op de view.
  *  */
  private placeTimeString() {
    this.showTimeStrings(this.getTimeString(this.getMinutes()), this.getTimeString(this.getSeconds()));
  }

  /*
  * Returnt de volledige minuten uit de time
  */
  private getMinutes() {
    return Math.floor(this.time / 60);
  }

  /*
  * Returnt de alle seconden uit de time
  */
  private getSeconds() {
    return this.time % 60;
  }

  /*
  * Laat de tijdstrings zien op de view
  * */
  private showTimeStrings(minutes: string, seconds: string) {
    this.timeString = minutes + ':' + seconds;
  }


  /*
  * Returnt een tijd string van een getal. Bijvoorbeeld 0 wordt 00.
  * */
  private getTimeString(nmbr: number) {
    if (nmbr === 0) {
      return '00';
    } else if (nmbr < 10) {
      return '0' + nmbr;
    } else {
      return '' + nmbr;
    }
  }

  /*
  * Berekent het verschil tussen de pauze en het moment van resumen. Voegt het daarna toe aan de timeSum.
  * */
  private calcPauseDifference() {
    const pauseTime = (new Date().getTime() / 1000) - (this.pauseTimeStamp.getTime() / 1000); // Bereken tijd tussen pauzetijd en herstart tijd / tijd nu
    this.timeSum += pauseTime; // Voeg deze tijd toe aan de startseconden zodat this.time ook omhoog gaat.
  }

  /*
  * Initialiseert de timer en start hem daarna.
  * */
  private start() {
    this.startTime = new Date(); // Zet starttijd vast
    this.interval = this.startTimerInterval();
    this.resume();
  }

  private startTimerInterval() {
    return setInterval(() => {
      if (this.time <= 0 && this.running) { // Als hij runnend onder 0 seconde is, dan stopt het interval en sluit de timer af.
        clearInterval(this.interval);
        this.stop();
      }
      this.calcTimeDifference(); // Bereken verschil tussen starttijd en tijd op dit moment
      if (this.running) {
        this.placeTimeString(); // Als hij runt update hij de view.
      }

    }, this.refreshRate);

  }

  private setButtonFunction(func: () => void) {
    this.buttonFunction = func;
  }


  private setRunning(b: boolean) {
    this.running = b;
  }

  private setButtonText(text: string) {
    this.buttonText = text;
  }
}
