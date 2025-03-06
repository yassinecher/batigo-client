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
    path: '/task',
    title: 'Task',
    icon: 'bi bi-list-task',
    class: '',
    extralink: false,
    submenu: [{
      path: '/task/list',
      title: 'Task List',
      icon: 'bi bi-view-list',
      class: '',
      extralink: false,
      submenu: []
    }, {
      path: '/task/new',
      title: 'New Task',
      icon: 'bi bi-plus-circle-dotted',
      class: '',
      extralink: false,
      submenu: []
    }]
  },
  {
    path: '/fournisseur/add',  // Nouveau chemin pour ajouter un fournisseur
    title: 'Add Supplier',
    icon: 'bi bi-person-add',  // Icône pour l'ajout
    class: '',
    extralink: false,
    submenu: []
  }
  , {
    path: '/fournisseur/list',  // Nouveau chemin pour afficher la liste des fournisseurs
    title: 'Supplier List',
    icon: 'bi bi-person-lines-fill',  // Icône pour la liste des fournisseurs
    class: '',
    extralink: false,
    submenu: []
  }
  ,
  
  {
    path: '/users',
    title: 'Users',
    icon: 'bi bi-person',
    class: '',
    extralink: false,
    submenu: []
  }
];
