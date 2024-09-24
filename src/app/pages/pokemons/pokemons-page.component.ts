import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { PokemonsListComponent } from '../../pokemons/components/pokemons-list/pokemons-list.component';
import { SimplePokemon } from '../../pokemons/interfaces';
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
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParams.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 0 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  ngOnInit(): void {
    this.loadPokemons();

    console.log(this.currentPage());

    // this.$route.queryParamMap.subscribe((params) => {
    //   const page = params.get('page');

    //   console.log({ page });

    //   if (page) this.loadPokemons(+page);
    // });
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          // this navigate to the new page, with empty [] only add the query params
          // and not navigate to the new page
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() => this.title.setTitle(`Pokemons SSR - page ${pageToLoad}`))
      )
      .subscribe((pokemons) => this.pokemons.set(pokemons));
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
