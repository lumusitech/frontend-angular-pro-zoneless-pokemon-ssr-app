import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  },
  // {
  //   path: 'pokemons',
  //   loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  // },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page.component'),
  },
  {
    path: '**',
    redirectTo: '/about',
    // new optional way with function to inject services pre redirect to destination
    // redirectTo: () => {
    //   const authService = inject(AuthService);
    //   if (authService.isAuthenticated()) {
    //     return '/about';
    //   }
    //   return '/login';
    // },
    pathMatch: 'full',
  },
];
