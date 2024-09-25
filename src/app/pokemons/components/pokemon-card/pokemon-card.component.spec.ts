import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { PokemonCardComponent } from './pokemon-card.component';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe(`PokemonCardComponent`, () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    // this set the input required by the component
    // we set a mock pokemon as input
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(compiled).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name and image correctly', () => {
    const pokemonName = compiled.querySelector('h2');
    expect(pokemonName).toBeDefined();
    expect(pokemonName).toBeTruthy();
    expect(pokemonName?.textContent?.trim()).toBe(mockPokemon.name);

    const pokemonImage = compiled.querySelector('img');
    const imagURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`;
    expect(pokemonImage).toBeDefined();
    expect(pokemonImage).toBeTruthy();
    expect(pokemonImage?.src).toContain(mockPokemon.id);
    expect(pokemonImage?.src).toBe(imagURL);
  });

  it('should have the proper ng-reflect-router-link', () => {
    const divWithLink = compiled.querySelector('div');
    const link = divWithLink?.attributes.getNamedItem(
      'ng-reflect-router-link'
    )?.value;

    expect(link).toBe(`/pokemons,${mockPokemon.name}`);
  });
});
