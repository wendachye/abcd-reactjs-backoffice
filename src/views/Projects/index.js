import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import ProjectListing from './ProjectListing';

const Projects = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={ProjectListing} />
      <Redirect from="*" to={path} />
    </Switch>
  );
};

export default Projects;
