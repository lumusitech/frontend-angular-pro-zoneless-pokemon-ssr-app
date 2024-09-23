import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonCardComponent } from '../../../../pokemons/components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list-skeleton',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeletonComponent {}
