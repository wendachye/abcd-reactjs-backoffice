import { useState, useCallback } from 'react';
import { Container, Card, CardHeader, CardBody, Row, Col, Input } from 'reactstrap';
import PageSubheader from 'components/Headers/PageSubheader';
import Button from 'components/Custom/Button';
import ModalCreateProject from 'components/Projects/ModalCreateProject';
import TableProjectList from 'components/Projects/TableProjectList';
import { useAppSelector } from 'hooks/app';
import { ProjectType } from 'types/Project';

const ProjectListing = () => {
  const { projects } = useAppSelector((state) => state.project);
  const [modalNewVisible, setModalNewVisible] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>(projects);
  const [searchValue, setSearchValue] = useState<string>('');

  const onClickNewProject = () => setModalNewVisible(true);

  const onClickCancelProject = useCallback(() => setModalNewVisible(false), []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchValue(value);

    if (value) {
      const searchResult = projects.filter((project) => {
        return (
          project.name.toLowerCase().includes(value) ||
          project.address.toLowerCase().includes(value) ||
          project.contactNo.toLowerCase().includes(value) ||
          project.startDate.toLowerCase().includes(value)
        );
      });

      setFilteredProjects(searchResult);
    } else {
      setFilteredProjects(projects);
    }
  };

  return (
    <>
      <PageSubheader title="Projects" />
      <Container className="mt--6" fluid>
        <Card>
          <CardHeader className="border-0">
            <Row className="align-items-end">
              <Col className="" sm="6" xs="12">
                <Input
                  style={{ width: 250 }}
                  placeholder="Search"
                  type="text"
                  value={searchValue}
                  onChange={onChangeSearch}
                />
              </Col>
              <Col className="mt-4 text-right" sm="6" xs="12">
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
            <TableProjectList projects={filteredProjects} />
          </CardBody>
        </Card>
      </Container>
      <ModalCreateProject visible={modalNewVisible} onClickCancel={onClickCancelProject} />
    </>
  );
};

export default ProjectListing;
