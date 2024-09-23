import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SimplePokemon } from '../interfaces';
import { PokemonAPIResponse } from '../interfaces/pokemon-api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    // page 1 -> 0 (offset)
    // page size -> 20
    // https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
    if (page !== 0) {
      // 1st page is 0 offset, 2nd page is 20 offset, 3rd page is 40 offset, etc
      --page;
    }

    // sanity: make sure page is not negative. this always give us the max number
    // if page -1 max(0, -1) return 0
    page = Math.max(0, page);

    return this.http
      .get<PokemonAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
      )
      .pipe(
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map(
            ({ name, url }) => ({
              id: url.split('/').at(-2) ?? '',
              name,
            })
          );

          return simplePokemons;
        }),
        tap(console.log)
      );
  }
}
