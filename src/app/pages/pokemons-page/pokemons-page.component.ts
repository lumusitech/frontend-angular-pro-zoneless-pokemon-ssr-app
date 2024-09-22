import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent {}
