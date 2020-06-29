import {
  Component,
  ComponentFactoryResolver, EventEmitter,
  OnInit, Output, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SetTimerComponent} from '../set-timer/set-timer.component';
import {Subscription, throwError} from 'rxjs';


@Component({
  selector: 'app-bereidingswijze',
  templateUrl: './bereidingswijze.component.html',
  styleUrls: ['./bereidingswijze.component.css']
})
export class BereidingswijzeComponent implements OnInit {

  @ViewChild('timerDiv', {read: ViewContainerRef}) container: ViewContainerRef;

  @Output() open: EventEmitter<any> = new EventEmitter();

  // Keep track of list of generated components for removal purposes
  timerComponents = [];

  bereidingswijze = '';

  name = '';

  image: '';

  setTimerComponentClass = SetTimerComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {

  }

  addTimer(componentClass: Type<any>) {
    if (this.timerComponents.length < 3) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
      const component = this.container.createComponent(componentFactory);
      this.timerComponents.push(component);

      component.instance.timerId = this.timerComponents.indexOf(component);

      const sub: Subscription = component.instance.removeEvent.subscribe(id => this.removeComponentById(id));


    }
  }


  getName() {
    if (this.name.length < 2) {
      throw new Error('De naam is te kort!');
    } else {
      return this.name;
    }
  }

  private removeComponentById(id: number) {
    this.timerComponents.splice(id, 1);
    this.container.remove(id);
    this.timerComponents.forEach((comp) => comp.instance.timerId = this.timerComponents.indexOf(comp));
  }

  getBereidingswijze() {
    if (this.bereidingswijze.length < 20) {
      throw new Error('De bereidingswijze is te kort!');
    } else {
      return this.bereidingswijze;
    }
  }

  getImage() {
    if (this.image != null) {
      if (this.image.length <= 0) {
        return null;
      } else if (!this.image.match(/\.(jpeg|jpg|png)$/)) {
        throw new Error('Geen geldige afbeelding!');
      }

      return this.image;
    } else {
      return null;
    }
  }


  // Returnt een array met maps van de timers.

  getTimerData() {
    const data = [];

    for (const timerRef of this.timerComponents) {
      const timer = timerRef.instance;
      if (!timer.validate()) {
        return;
      }
      data.push(timer.getData());
    }
    return data;
  }
}
