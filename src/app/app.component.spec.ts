import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './share/components/navbar/navbar.component';

describe(`AppComponent`, () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let component: AppComponent;

  @Component({
    selector: 'navbar',
    standalone: true,
    template: `<h1>Hello world</h1>`,
  })
  class NavbarComponentMock {}

  beforeEach(async () => {
    // TestBed.overrideComponent(AppComponent, {
    //   set: {
    //     imports: [NavbarComponentMock],
    //     // tells to angular that ignores all schemas like providers, directives, pipes
    //     schemas: [CUSTOM_ELEMENTS_SCHEMA],
    //   },
    // });

    // better way
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      // app component render the navbar child component and navbar use a router
      // navbar has dependencies on router
      // we don't test navbar here
      // one way, to test navbar, is to provide an empty router
      // providers: [provideRouter([])],
    })
      //Better: Replace NavbarComponent with NavbarComponentMock
      .overrideComponent(AppComponent, {
        add: {
          imports: [NavbarComponentMock],
        },
        remove: {
          imports: [NavbarComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // delete if not needed. It Detects input data changes
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(compiled).toBeTruthy();
    expect(component).toBeTruthy();
    console.log(compiled);
  });

  it('should render the navbar and router-outlet', () => {
    const navbar = compiled.querySelector('navbar');
    const routerOutlet = compiled.querySelector('router-outlet');

    expect(navbar).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });
});
