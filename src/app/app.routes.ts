import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Transactions } from './features/transactions/transactions';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Área de login | Financy',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Dashboard | Financy',
  },
  {
    path: 'transactions',
    component: Transactions,
    title: 'Transações | Financy',
  },
];
