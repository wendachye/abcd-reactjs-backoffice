import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import PageSubheader from 'components/Headers/PageSubheader';
import FormProjectDetails from 'components/Projects/FormProjectDetails';
import Button from 'components/Custom/Button';
import { ProjectType } from 'types/Project';

const ProjectDetails = () => {
  const location = useLocation();
  const [project] = useState<ProjectType | null>(
    location.state ? (location.state as ProjectType) : null,
  );

  const onClickCreateQuotation = () => {
    console.log('here');
  };

  return (
    <>
      <PageSubheader title="Project Details" />
      <Container className="mt--6" fluid>
        <Row>
          <Col sm="6" xs="12">
            <FormProjectDetails project={project} />
          </Col>
          <Col sm="6" xs="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader className="border-0">
                    <h2 className="mb-0">Quotation</h2>
                  </CardHeader>
                  <CardBody>
                    {project?.quotations.length === 0 && (
                      <Button color="primary" onClick={onClickCreateQuotation}>
                        Add Quotation
                      </Button>
                    )}
                    {/* <div
                      className="timeline timeline-one-side"
                      data-timeline-axis-style="dashed"
                      data-timeline-content="axis"
                    >
                      <div className="timeline-block">
                        <span className="timeline-step badge-info">
                          <i className="ni ni-collection" />
                        </span>
                        <div className="timeline-content">
                          <small className="text-muted font-weight-bold">26 Sep 2021</small>
                          <h5 className="mt-3 mb-0">BCQ-0927-121-AD</h5>
                          <div className="mt-3">
                            <Badge color="success" pill>
                              design
                            </Badge>
                            <Badge color="success" pill>
                              system
                            </Badge>
                            <Badge color="success" pill>
                              creative
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="timeline-block">
                        <span className="timeline-step badge-info">
                          <i className="ni ni-collection" />
                        </span>
                        <div className="timeline-content">
                          <small className="text-muted font-weight-bold">27 Sep 2021</small>
                          <h5 className="mt-3 mb-0">BCQ-0927-122-AD</h5>
                          <div className="mt-3">
                            <Badge color="success" pill>
                              design
                            </Badge>
                            <Badge color="success" pill>
                              system
                            </Badge>
                            <Badge color="success" pill>
                              creative
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </CardBody>
                  {/* <CardHeader>
                    <h2 className="mb-0">Agreement</h2>
                  </CardHeader>
                  <CardBody></CardBody> */}
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProjectDetails;
