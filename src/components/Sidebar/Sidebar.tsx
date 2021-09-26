import { useState } from 'react';
import { useLocation, NavLink as NavLinkRRD, Link } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav } from 'reactstrap';
import { RouteType } from 'types/App';

interface SidebarProps {
  sidenavOpen: boolean;
  toggleSidenav: () => void;
  routes: RouteType[];
  logo?: {
    innerLink?: string;
    outterLink?: string;
    imgSrc: string;
    imgAlt: string;
    width: string;
    height: string;
  };
}

const Sidebar = ({ toggleSidenav, sidenavOpen, routes, logo }: SidebarProps): JSX.Element => {
  const location = useLocation();

  const getCollapseInitialState = (routes: RouteType[]) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views || [])) {
        return true;
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };

  const getCollapseStates = (routes: RouteType[]) => {
    let initialState = {};
    routes.map((route) => {
      if (route.collapse && route.state && route.views) {
        initialState = {
          [route.state]: getCollapseInitialState(route.views),
          ...getCollapseStates(route.views),
          ...initialState,
        };
      }
      return {};
    });
    return initialState;
  };

  const [state, setState] = useState<{
    [k in string]: boolean;
  }>(getCollapseStates(routes));

  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };

  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.add('g-sidenav-show');
    }
  };

  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-show');
    }
  };

  const closeSidenav = () => {
    if (window.innerWidth < 1200) {
      toggleSidenav();
    }
  };

  const createLinks = (routes: RouteType[]) => {
    return routes.map((route) => {
      if (state && route.collapse && route.state && route.views) {
        const st: { [k in string]: boolean } = {};
        st[route['state']] = !state[route.state];

        return (
          <NavItem key={route.name}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[route.state]}
              className={classnames({
                active: getCollapseInitialState(route.views),
              })}
              onClick={(e) => {
                e.preventDefault();
                setState(st);
              }}
            >
              {route.icon && (
                <>
                  <i className={route.icon} />
                  <span className="nav-link-text">{route.name}</span>
                </>
              )}
            </NavLink>
            <Collapse isOpen={state[route.state]}>
              <Nav className="nav-sm flex-column">{createLinks(route.views)}</Nav>
            </Collapse>
          </NavItem>
        );
      }

      return (
        <NavItem key={route.name} className={activeRoute(route.path)}>
          <NavLink to={route.path} activeClassName="" onClick={closeSidenav} tag={NavLinkRRD}>
            {route.icon ? (
              <>
                <i className={route.icon} />
                <span className="nav-link-text">{route.name}</span>
              </>
            ) : (
              route.name
            )}
          </NavLink>
        </NavItem>
      );
    });
  };

  let navbarBrandProps = {};

  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank',
    };
  }

  const scrollBarInner = (
    <div className="scrollbar-inner">
      <div className="sidenav-header d-flex align-items-center">
        {logo && (
          <NavbarBrand {...navbarBrandProps} style={{ flex: 0.7 }} className="text-center">
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
              width={logo.width || '100%'}
              height={logo.height || '100%'}
            />
          </NavbarBrand>
        )}
        <div className="ml-auto" style={{ flex: 0.3 }}>
          <div
            className={classnames('sidenav-toggler d-none d-xl-block', {
              active: sidenavOpen,
            })}
            onClick={toggleSidenav}
          >
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </div>
    </div>
  );

  return (
    <Navbar
      className="sidenav navbar-vertical navbar-expand-xs navbar-light bg-white fixed-left"
      onMouseEnter={onMouseEnterSidenav}
      onMouseLeave={onMouseLeaveSidenav}
    >
      {navigator.platform.indexOf('Win') > -1 ? (
        <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
      ) : (
        scrollBarInner
      )}
    </Navbar>
  );
};

export default Sidebar;
