import Dashboard from 'views/pages/dashboards/Dashboard.js';
import Projects from 'views/Projects';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'ni ni-shop text-primary',
    component: Dashboard,
  },
  {
    path: '/projects',
    name: 'Projects',
    icon: 'ni ni-calendar-grid-58 text-red',
    component: Projects,
  },
];

export default routes;
