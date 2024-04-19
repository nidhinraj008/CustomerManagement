import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/horizontal/horizontal.component').then(m => m.HorizontalComponent),
        children: [
            {
                path: 'CustomerList',
                loadComponent: () => import('./pages/customer-list/customer-list.component').then(c => c.CustomerListComponent)
            },
            {
                path: 'CustomerDetail/:id',
                loadComponent: () => import('./pages/customer-details/customer-details.component').then(c => c.CustomerDetailsComponent)
            },
            {
                path: 'CustomerEdit/:id',
                loadComponent: () => import('./pages/customer-edit/customer-edit.component').then(c => c.CustomerEditComponent)
            },
            {
                path: '',
                redirectTo: 'CustomerList',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./pages/page404/page404.component').then(c => c.Page404Component)
    },
];
