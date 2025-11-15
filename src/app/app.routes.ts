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
        path: 'synthetic-hair',
        loadComponent: () =>
          import('./views/synthetic-hair/synthetic-hair.component').then(
            (m) => m.SyntheticHairComponent
          ),
      },
      {
        path: 'braid-hair',
        loadComponent: () =>
          import('./views/braid-hair/braid-hair.component').then(
            (m) => m.BraidHairComponent
          ),
      },
      {
        path: 'synthetic-training-hair',
        loadComponent: () =>
          import(
            './views/synthetic-training-hair/synthetic-training-hair.component'
          ).then((m) => m.SyntheticTrainingHairComponent),
      },
      {
        path: 'real-training-hair',
        loadComponent: () =>
          import(
            './views/real-training-hair/real-training-hair.component'
          ).then((m) => m.RealTrainingHairComponent),
      },
      {
        path: 'real-human-hair',
        loadComponent: () =>
          import('./views/real-human-hair/real-human-hair.component').then(
            (m) => m.RealHumanHairComponent
          ),
      },
      {
        path: 'african-afro-hair',
        loadComponent: () =>
          import('./views/african-afro-hair/african-afro-hair.component').then(
            (m) => m.AfricanAfroHairComponent
          ),
      },
      {
        path: 'russian-afro-hair',
        loadComponent: () =>
          import('./views/russian-afro-hair/russian-afro-hair.component').then(
            (m) => m.RussianAfroHairComponent
          ),
      },
      {
        path: 'training-mannequins',
        loadComponent: () =>
          import(
            './views/training-mannequins/training-mannequins.component'
          ).then((m) => m.TrainingMannequinsComponent),
      },
      {
        path: 'hair-accessories',
        loadComponent: () =>
          import('./views/hair-accessories/hair-accessories.component').then(
            (m) => m.HairAccessoriesComponent
          ),
      },
      {
        path: 'hair-extension-materials',
        loadComponent: () =>
          import(
            './views/hair-extension-materials/hair-extension-materials.component'
          ).then((m) => m.HairExtensionMaterialsComponent),
      },
      {
        path: 'wig-materials',
        loadComponent: () =>
          import('./views/wig-materials/wig-materials.component').then(
            (m) => m.WigMaterialsComponent
          ),
      },
      {
        path: 'bead-extensions',
        loadComponent: () =>
          import('./views/bead-extensions/bead-extensions.component').then(
            (m) => m.BeadExtensionsComponent
          ),
      },
      {
        path: 'micro-extensions',
        loadComponent: () =>
          import('./views/micro-extensions/micro-extensions.component').then(
            (m) => m.MicroExtensionsComponent
          ),
      },
      {
        path: 'hairpieces',
        loadComponent: () =>
          import('./views/hairpieces/hairpieces.component').then(
            (m) => m.HairpiecesComponent
          ),
      },
      {
        path: 'synthetic-tresses',
        loadComponent: () =>
          import('./views/synthetic-tresses/synthetic-tresses.component').then(
            (m) => m.SyntheticTressesComponent
          ),
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
