import Projects from 'views/Projects';
import { RouteType } from 'types/App';

const routes: RouteType[] = [
  {
    path: '/projects',
    name: 'Projects',
    icon: 'ni ni-calendar-grid-58 text-red',
    component: Projects,
  },
];

export default routes;
