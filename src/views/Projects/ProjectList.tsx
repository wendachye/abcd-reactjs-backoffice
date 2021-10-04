import { useState, useEffect, useCallback } from 'react';
import { Container, Card, CardHeader, CardBody, Row, Col, Input } from 'reactstrap';
import PageSubheader from 'components/Headers/PageSubheader';
import Button from 'components/Custom/Button';
import CreateProjectModal from 'components/Project/CreateProjectModal';
import ProjectListTable from 'components/Project/ProjectListTable';
import { selectProjects } from 'redux/slices/projectSlice';
import { useSelector } from 'hooks/useRedux';
import { ProjectType } from 'types/Project';

const ProjectList = () => {
  const projects = useSelector(selectProjects);
  const [modalNewVisible, setModalNewVisible] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>(projects);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (searchValue) {
      const searchResult = projects.filter((project) => {
        return (
          project.name.toLowerCase().includes(searchValue) ||
          project.address.toLowerCase().includes(searchValue) ||
          project.startDate.toLowerCase().includes(searchValue) ||
          (project?.contactNo && project.contactNo.toLowerCase().includes(searchValue))
        );
      });

      setFilteredProjects(searchResult);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchValue, projects]);

  const onClickNewProject = () => setModalNewVisible(true);

  const onClickCancelProject = useCallback(() => setModalNewVisible(false), []);

  return (
    <>
      <PageSubheader title="Projects" />
      <Container className="mt--6" fluid>
        <Card>
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <Col className="" sm="6" xs="12">
                <Input
                  style={{ width: 250 }}
                  placeholder="Search"
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Col>
              <Col className="text-right" sm="6" xs="12">
                <Button color="primary" size="sm" onClick={onClickNewProject}>
                  Create
                </Button>
                <Button color="primary" size="sm">
                  Filter
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <ProjectListTable projects={filteredProjects} />
          </CardBody>
        </Card>
      </Container>
      <CreateProjectModal visible={modalNewVisible} onClickCancel={onClickCancelProject} />
    </>
  );
};

export default ProjectList;
