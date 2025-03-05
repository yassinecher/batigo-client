import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/commande',
    title: 'Commande',
    icon: 'bi bi-shop',
    class: '',
    extralink: false,
    submenu: []
  },
  
  {
    path: '/dashboard/livraison',
    title: 'Livraison',
    icon: 'bi bi-truck',
    class: '',
    extralink: false,
    submenu: []
  },
 {
    path: '/users',
    title: 'Users',
    icon: 'bi bi-person',
    class: '',
    extralink: false,
    submenu: []
  }
];
