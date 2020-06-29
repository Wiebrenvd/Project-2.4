import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../config.service';
import {RecipeResultComponent} from '../recipe-result/recipe-result.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  private searchString: string;
  public recipes: any;
  private components = [];
  private recipeResultComponentClass = RecipeResultComponent;

  constructor(private configService: ConfigService, private route: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.searchString = this.route.snapshot.paramMap.get('searchString');

    this.configService.sendSearch(this.searchString).subscribe(
      res => this.createResultViews(res),
      error => console.log(error.message));

  }

  addRecipe(componentClass: Type<any>, recipe: any) {
    if (this.components.length < 20) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
      const component = this.container.createComponent(componentFactory);
      this.components.push(component);
      component.instance.id = recipe.id;
      component.instance.title = recipe.name;
      component.instance.desc = recipe.desc;
    }
  }

  noRecipeFound(componentClass: Type<any>) {
    if (this.searchString) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
      const component = this.container.createComponent(componentFactory);
      this.components.push(component);

      component.instance.desc = 'Geen resultaat gevonden, probeer iets anders';
    }

  }

  private createResultViews(response: any) {
    if (response.recipes) {

      if (response === 'empty') {
        this.noRecipeFound(this.recipeResultComponentClass);
      }
      const recipes = response.recipes;
      for (const recipe of recipes) {
        this.addRecipe(this.recipeResultComponentClass, recipe);
      }
    }
  }
}
