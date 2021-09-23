import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, CardHeader, Table, Row, Col } from 'reactstrap';
import PageSubheader from 'components/Headers/PageSubheader';
import Button from 'components/Custom/Button';
import ModalNewProject from 'components/ModalNewProject';
import { createProject } from 'redux/slices/projectSlice';
import { propertyData } from 'constants/app';

const ProjectListing = () => {
  const dispatch = useDispatch();
  const { loading, projects } = useSelector((state) => state.project);
  const [modalNewVisible, setModalNewVisible] = useState(false);

  const onClickNewProject = () => {
    setModalNewVisible(true);
  };

  const onClickCancelProject = () => {
    setModalNewVisible(false);
  };

  const onClickSaveProject = (data) => {
    try {
      const project = {
        name: data.name,
        property: propertyData.find((property) => property.id === data.property)?.text,
        nric: data.nric,
        contactNo: data.contactNo,
        address: data.address,
        startDate: data.startDate.format('DD MMM YYYY'),
      };

      dispatch(createProject.trigger({ project }));
    } catch (error) {
      console.log(error);
    }
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
                <th scope="col" />
              </tr>
            </thead>
            <tbody className="list">
              {projects.map((project, index) => {
                return (
                  <tr key={index}>
                    <td className="no">{index + 1}</td>
                    <td className="name">{project.name}</td>
                    <td className="property">{project.property}</td>
                    <td className="address">{project.address}</td>
                    <td className="contactNo">{project.contactNo}</td>
                    <td className="startDate">{project.startDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </Container>
      <ModalNewProject
        visible={modalNewVisible}
        onClickCancel={onClickCancelProject}
        onClickSave={onClickSaveProject}
        loading={loading}
      />
    </>
  );
};

export default ProjectListing;
