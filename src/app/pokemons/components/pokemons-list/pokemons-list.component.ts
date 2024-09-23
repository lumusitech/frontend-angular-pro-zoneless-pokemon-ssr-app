import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemons-list',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemons-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListComponent {
  public pokemons = input.required<SimplePokemon[]>();
}
