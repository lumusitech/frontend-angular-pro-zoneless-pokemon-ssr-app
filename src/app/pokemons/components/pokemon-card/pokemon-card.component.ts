import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      this.pokemon().id
    }.png`;
  });

  // logEffect = effect(() => {
  //   console.log('pokemonCard: ', this.pokemon());
  // });
}
