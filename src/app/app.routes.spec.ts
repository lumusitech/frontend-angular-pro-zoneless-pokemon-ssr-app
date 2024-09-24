import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about" redirects to "/about"', async () => {
    await router.navigate(['about']);
    expect(location.path()).toEqual('/about');
  });

  it('should navigate to "pokemons/page/1" redirects to "/pokemons/page/1"', async () => {
    await router.navigate(['pokemons', 'page', '1']);
    expect(location.path()).toEqual('/pokemons/page/1');
  });

  it('should redirects to "about" when route is not found', async () => {
    await router.navigate(['unknown-route']);
    expect(location.path()).toEqual('/about');
  });

  it('should load the proper Component', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();

    const aboutComponent = (await aboutRoute.loadComponent!()) as any;
    expect(aboutComponent.default.name).toBe('AboutPageComponent');

    const pokemonPageRoute = routes.find(
      (route) => route.path === 'pokemons/page/:page'
    )!;
    expect(pokemonPageRoute).toBeDefined();

    const pokemonsPage = (await pokemonPageRoute.loadComponent!()) as any;
    expect(pokemonsPage.default.name).toBe('PokemonsPageComponent');
  });
});
