import { useRef, useState, useEffect } from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Sidebar from 'components/Sidebar/Sidebar.js';
import routes from 'routes';

const Admin = () => {
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const location = useLocation();
  const mainContentRef = useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.views);
      }

      return <Route path={route.path} component={route.component} key={route.name} />;
    });
  };

  const toggleSidenav = (e) => {
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
        <AdminNavbar toggleSidenav={toggleSidenav} sidenavOpen={sidenavOpen} />
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
