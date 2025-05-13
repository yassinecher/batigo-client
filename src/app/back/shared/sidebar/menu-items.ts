import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
  },
   {
    path: '/dashboard/projets',
    title: 'Financial projets',
    icon: 'bi bi-credit-card',
    class: '',
    extralink: false,
    submenu: []
  },
   
  {
    path: '/dashboard/expense',
    title: 'Expenses',
    icon: 'bi bi-graph-down-arrow',
    class: '',
    extralink: false,
    submenu: []
  },
   
  {
    path: '/dashboard/income',
    title: 'Incomes',
    icon: 'bi bi-graph-up-arrow',
    class: '',
    extralink: false,
    submenu: []
  },
   {
    path: '/workflow',
    title: 'Workflow',
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
    path: '/dashboard/commande',
    title: 'Commande',
    icon: 'bi bi-shop',
    class: '',
    extralink: false,
    submenu: [],
  },

  {
    path: '/dashboard/livraison',
    title: 'Livraison',
    icon: 'bi bi-truck',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/users',
    title: 'Users',
    icon: 'bi bi-person',
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/dashboard/fournisseur/add', // Nouveau chemin pour ajouter un fournisseur
    title: 'Add Supplier',
    icon: 'bi bi-person-add', // Icône pour l'ajout
    class: '',
    extralink: false,
    submenu: [],
  },

  {
    path: '/dashboard/fournisseur/list', // Nouveau chemin pour afficher la liste des fournisseurs
    title: 'Supplier List',
    icon: 'bi bi-person-lines-fill', // Icône pour la liste des fournisseurs
    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/dashboard/category/list', // Nouveau chemin pour afficher la liste des fournisseurs
    title: 'Category Product List',
    icon: 'bi bi-tags-fill',
    class: '',  
    extralink: false,
    submenu: [],
  },

  // {
  //   path: '/dashboard/livrable-admin', // Nouveau chemin pour afficher la liste des fournisseurs
  //   title: 'Livrables',
  //   icon: 'bi bi-tags-fill',
  //   class: '',
  //   extralink: false,
  //   submenu: [],
  // },

  // {
  //   path: '/dashboard/projectlist', // Nouveau chemin pour afficher la liste des fournisseurs
  //   title: 'Projet',
  //   icon: 'bi bi-tags-fill',
  //   class: '',
  //   extralink: false,
  //   submenu: [],
  // },


  {
    path: '/incident', // Nouveau chemin pour afficher la liste des fournisseurs
    title: 'Incidents',
    icon: 'bi bi-tags-fill',
    class: '',
    extralink: false,
    submenu: [],
  },

  {
    path: '/dashboard/products/list', // Nouveau chemin pour afficher la liste des fournisseurs
    title: 'Product List',
    icon: 'bi bi-bag-check-fill',

    class: '',
    extralink: false,
    submenu: [],
  },
  {
    path: '/dashboard/products/stats',
    title: 'Product  Stats',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
  },
];
