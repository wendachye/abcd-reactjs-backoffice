import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import ProjectListing from './ProjectListing';
import ProjectDetails from './ProjectDetails';

const Projects = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={ProjectListing} />
      <Route path={`${path}/:id`} component={ProjectDetails} />
      <Redirect from="*" to={path} />
    </Switch>
  );
};

export default Projects;
