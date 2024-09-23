import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PokemonsListComponent } from '../../pokemons/components/pokemons-list/pokemons-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonsPageComponent,
    PokemonsListComponent,
    PokemonListSkeletonComponent,
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  private pokemonsService = inject(PokemonsService);

  ngOnInit(): void {
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    this.pokemonsService.loadPage(page).subscribe({
      next: (pokemons) => {
        console.log('onInit');
      },
    });
  }

  // this is for client side, but not needed for server side
  // public isLoading = signal(true);
  // this is for app state
  // private appRef = inject(ApplicationRef);
  // is stable when the server finish the rendering
  // private $appState = this.appRef.isStable.subscribe({
  //   next: (isStable) => {
  //     console.log({ isStable });
  //   },
  // });
  // ngOnInit(): void {
  //   this delay 5s the server to finish the rendering
  //   setTimeout(() => {
  //     this.isLoading.set(false);
  //   }, 5000);
  // }
  // ngOnDestroy(): void {
  //   this destroy the subscription to avoid memory leaks
  //   this.$appState.unsubscribe();
  //   console.log('pokemon page destroyed');
  // }
}
