import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjectDetails from './ProjectDetails';
import QuotationDetails from './QuotationDetails';

const Projects = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={ProjectList} />
      <Route exact path={`${path}/:id`} component={ProjectDetails} />
      <Route
        exact
        path={`${path}/:projectId/quotation/:quotationId`}
        component={QuotationDetails}
      />
      <Redirect from="*" to={path} />
    </Switch>
  );
};

export default Projects;
