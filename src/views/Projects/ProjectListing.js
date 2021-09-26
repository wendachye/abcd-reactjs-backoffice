import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';
import List from 'list.js';
import PageSubheader from 'components/Headers/PageSubheader';
import Button from 'components/Custom/Button';
import ModalNewProject from 'components/Projects/ModalNewProject';

const ProjectListing = () => {
  const tableRef = useRef(null);
  const { projects } = useSelector((state) => state.project);
  const [modalNewVisible, setModalNewVisible] = useState(false);

  useEffect(() => {
    new List(tableRef.current, {
      valueNames: ['no', 'name', 'property', 'address', 'contactNo', 'startDate'],
      listClass: 'list',
    });
  }, []);

  const onClickNewProject = () => {
    setModalNewVisible(true);
  };

  const onClickCancelProject = () => {
    setModalNewVisible(false);
  };

  return (
    <>
      <PageSubheader title="Projects" />
      <Container className="mt--6" fluid>
        <Card>
          <CardHeader className="border-0">
            <Row className="align-items-end">
              <Col className="mt-3 mt-md-0 text-md-right" xs="12">
                <Button color="primary" size="sm" onClick={onClickNewProject}>
                  New
                </Button>
                <Button color="primary" size="sm">
                  Filter
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div className="table-responsive" ref={tableRef}>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th className="sort" data-sort="no" scope="col">
                      no
                    </th>
                    <th className="sort" data-sort="name" scope="col">
                      Name
                    </th>
                    <th className="sort" data-sort="property" scope="col">
                      Property
                    </th>
                    <th className="sort" data-sort="address" scope="col">
                      Address
                    </th>
                    <th className="sort" data-sort="contactNo" scope="col">
                      Contact No
                    </th>
                    <th className="sort" data-sort="startDate" scope="col">
                      Start Date
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="list">
                  {projects.map((project, index) => {
                    return (
                      <tr key={index}>
                        <td className="no">{index + 1}</td>
                        <td className="name">
                          <Link
                            // className="font-weight-bold text-primary mt-5"
                            to={`/projects/${project.uuid}`}
                          >
                            {project.name}
                          </Link>
                        </td>
                        <td className="property">{project.property}</td>
                        <td className="address">{project.address}</td>
                        <td className="contactNo">{project.contactNo}</td>
                        <td className="startDate">{project.startDate}</td>
                        <td>
                          <a
                            id={`tooltip-delete-${project.uuid}`}
                            className="table-action table-action-delete"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-trash" />
                          </a>
                          <UncontrolledTooltip delay={0} target={`tooltip-delete-${project.uuid}`}>
                            Delete
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    );
                  })}
                  {projects.length === 0 && (
                    <tr>
                      <td>No data found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Container>
      <ModalNewProject visible={modalNewVisible} onClickCancel={onClickCancelProject} />
    </>
  );
};

export default ProjectListing;
