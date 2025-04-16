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
  }, {
    path: '/users',
    title: 'Users',
    icon: 'bi bi-person',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/incident',
    title: 'Incident',
    icon: 'bi bi-view-list',
    class: '',
    extralink: false,
    submenu: []
  }
];
