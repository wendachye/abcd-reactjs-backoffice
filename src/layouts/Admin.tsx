import { useRef, useState, useEffect } from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes';
import { RouteType } from 'types/App';

const Admin = (): JSX.Element => {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    if (mainContentRef.current) mainContentRef.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes: RouteType[]): unknown[] => {
    return routes.map((route: RouteType) => {
      if ((route.collapse, route.views)) {
        return getRoutes(route.views);
      }

      return <Route key={route.name} path={route.path} component={route.component} />;
    });
  };

  const toggleSidenav = () => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    setSidenavOpen(!sidenavOpen);
  };

  return (
    <>
      <Sidebar
        routes={routes}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: '/',
          imgSrc: require('assets/img/logo.png').default,
          imgAlt: 'logo',
          width: '50px',
          height: '50px',
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar sidenavOpen={sidenavOpen} toggleSidenav={toggleSidenav} />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </div>
      {sidenavOpen && <div className="backdrop d-xl-none" onClick={toggleSidenav} />}
    </>
  );
};

export default Admin;
