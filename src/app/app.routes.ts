import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'income',
    loadComponent: () => import('./pages/income/income.page').then(m => m.IncomePage),
  },
  {
    path: 'expenses',
    loadComponent: () => import('./pages/expenses/expenses.page').then(m => m.ExpensesPage),
  },
];
