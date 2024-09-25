import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { PokemonsListComponent } from './pokemons-list.component';

const pokemonsMock: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
  { id: '3', name: 'venusaur' },
];

describe(`PokemonsListComponent`, () => {
  let fixture: ComponentFixture<PokemonsListComponent>;
  let compiled: HTMLElement;
  let component: PokemonsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonsListComponent);
    // this set the input required by the component
    // we set a mock pokemon as input
    fixture.componentRef.setInput('pokemons', pokemonsMock);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // delete if not needed. It Detects input data changes
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(compiled).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should have the pokemons into component', () => {
    expect(component.pokemons()).toEqual(pokemonsMock);
  });

  it('should render the pokemons into html', () => {
    const pokemonCards = compiled.querySelectorAll('pokemon-card');
    expect(pokemonCards.length).toBe(pokemonsMock.length);
  });

  it('should render no pokemons with empty array', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const pokemonCards = compiled.querySelectorAll('pokemon-card');
    expect(pokemonCards.length).toBe(0);

    const noPokemonsText = compiled.querySelector('div');
    expect(noPokemonsText?.innerText).toContain('There are no pokemons');
  });
});
