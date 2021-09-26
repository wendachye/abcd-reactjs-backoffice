import React from 'react';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import AuthNavbar from 'components/Navbars/AuthNavbar';
import AuthFooter from 'components/Footers/AuthFooter';
import routes from 'routes';

function Auth() {
  const location = useLocation();
  const mainContentRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
    document.body.classList.add('bg-default');
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove('bg-default');
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/auth') {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="main-content" ref={mainContentRef}>
        <AuthNavbar />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </div>
      <AuthFooter />
    </>
  );
}

export default Auth;
