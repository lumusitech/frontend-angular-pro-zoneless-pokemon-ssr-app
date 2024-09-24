import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.pokemonsService
      .loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          const title = `#${id} - ${name}`;
          const description = `Page of pokemon ${name}`;
          this.title.setTitle(title);
          // 'og:title' and og:description is used by facebook and other social networks
          this.meta.updateTag({ name: 'og:title', content: title });
          this.meta.updateTag({ name: 'description', content: description });
          this.meta.updateTag({ name: 'og:description', content: description });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
          this.meta.updateTag({
            name: 'keywords',
            content: 'angular,project,ssr,zoneless,lumusitech',
          });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
