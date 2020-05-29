import {Ingredient} from './ingredienten/ingredienten';
import {Bereidwijze} from "./bereidingsweize/bereidwijze";

export const ingredienten = [
  new Ingredient('Appels', '700g'),
  new Ingredient('Bloem', '500g'),
  new Ingredient('boter', '400g'),
  new Ingredient('suiker', '80g'),
  new Ingredient('eieren', '2'),
  new Ingredient('appels', '8'),
  new Ingredient('eetlepel suiker', '1')
];
export const bereidwijze = [
  new Bereidwijze('Appeltaart', 'Verwarm de oven voor tot 180 °C. Maak een deeg door bloem, boter, suiker en eieren goed door elkaar te kneden. Laat het deeg even rusten.\n' +
    '\n' + 'Schil de appels en haal de klokhuizen eruit. Snijd de appels in blokjes en meng die met de suiker en de kaneel.\n' +
    '\n' + 'Rol het deeg uit en leg het in een beboterde taartvorm. Schep de vulling hierin en druk goed aan. Gebruik restjes deeg om de bovenkant van de taart te versieren.\n' +
    '\n' + 'Bak de taart in de voorverwarmde oven ongeveer 50 minuten tot gaar en goudbruin.')
];




