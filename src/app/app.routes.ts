import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'hair-colors',
        loadComponent: () =>
          import('./views/hair-colors/hair-colors.component').then(
            (m) => m.HairColorsComponent
          ),
      },
      {
        path: 'wigs',
        loadComponent: () =>
          import('./views/wigs/wigs.component').then((m) => m.WigsComponent),
      },

      {
        path: 'product/:id',
        loadComponent: () =>
          import('./views/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent
          ),
      },
      {
        path: 'about-us',
        loadComponent: () =>
          import('./views/about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
      },
    ],
  },
];
