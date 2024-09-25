import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError } from 'rxjs';
import { PokemonAPIResponse, SimplePokemon } from '../interfaces';
import { PokemonsService } from './pokemons.service';

// Take a chunk of real response and mock its shape
const mockPokeApiResponse: PokemonAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemonsFromService: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

// we don't want to test the real response with all the properties,
// so we don't set the type of the response
const expectedPokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // after each test, we can assert that no other requests were made.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', () => {
    // prepare the mock service to fire controlled response
    // this mock will not be fired at least we flush the request to complete it
    service.loadPage(1).subscribe((pokemons) => {
      // check that the service returns the expected pokemons
      expect(pokemons).toEqual(expectedPokemonsFromService);
    });

    // expectOne, expectNone, expectCount, etc in function of what you want to test
    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );

    // we can analyze the request before it is sent
    expect(req.request.method).toBe('GET');

    // with this, we fire the request and complete it
    // it returns a mocked response from api
    req.flush(mockPokeApiResponse);
  });

  it('should load a page 5 of SimplePokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemonsFromService);
    });

    const req = httpMock.expectOne(
      // We put 80 because in the service we subtract 1 from the page received,
      // 5 - 1 = 4, and then we multiply it by 20 = 80
      `https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load a Pokemon by ID', () => {
    const ID = '1';
    // we set type to any because before set without type into expectedPokemon
    // by this way, we can test only the properties we want
    service.loadPokemon(ID).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(expectedPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${ID}`);

    expect(req.request.method).toBe('GET');

    req.flush(expectedPokemon);
  });

  it('should load a Pokemon by name', () => {
    const PokemonName = 'bulbasaur';
    // we set type to any because before set without type into expectedPokemon
    // by this way, we can test only the properties we want
    service.loadPokemon(PokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(expectedPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${PokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(expectedPokemon);
  });

  it('should catch error if Pokemon not found', () => {
    const PokemonName = 'nonexistent-pokemon';
    service
      .loadPokemon(PokemonName)
      .pipe(
        // before this, we need handle error into real service
        catchError((err) => {
          // console.log(err);
          expect(err.message).toContain('pokemon not found');
          return [];
        })
      )
      // we don't need any from subscription, only testing error
      .subscribe();

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${PokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush('pokemon not found', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
