import { useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import { useParams } from 'react-router-dom';
import { Container, Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import PageSubheader from 'components/Headers/PageSubheader';
import ProjectDetailsUpdateForm from 'components/Project/UpdateProjectForm';
import Button from 'components/Custom/Button';
import SectionQuotation from 'components/Project/SectionQuotation';
import { QuotationType } from 'types/Project';
import { useDispatch, useSelector } from 'hooks/useRedux';
import { selectProjectByUUID, createQuotation } from 'redux/slices/projectSlice';
import { generateQuotationReference, genereteQuotationTitle } from 'utils/projectUtils';
import { QuotationSubtitle } from 'constants/app';

const ProjectDetails = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const project = useSelector(selectProjectByUUID(id));
  const dispatch = useDispatch();

  const onClickCreateQuotation = () => {
    if (project) {
      const reference = generateQuotationReference(project.startDate, project.property, 1, 1, 'AD');

      const quotation: QuotationType = {
        reference,
        name: project.name,
        property: project.property,
        date: project.startDate,
        nric: project.nric,
        contactNo: project.contactNo,
        email: project.email,
        remarks: project.remarks,
        title: genereteQuotationTitle(project.address),
        subtitle: QuotationSubtitle,
        sections: [],
      };

      dispatch(createQuotation.trigger({ projectId: project.uuid, quotation }));
      dispatch(push(`${location.pathname}/quotation/${reference}`));
    }
  };

  if (!project) {
    return null;
  }

  return (
    <>
      <PageSubheader title="Project Details" />
      <Container className="mt--6" fluid>
        <Row>
          <Col sm="6" xs="12">
            <ProjectDetailsUpdateForm project={project} />
          </Col>
          <Col sm="6" xs="12">
            <Row>
              <Col>
                <Card>
                  <CardHeader className="border-0">
                    <h2 className="mb-0">Quotation</h2>
                  </CardHeader>
                  <CardBody>
                    {project.quotations.length === 0 ? (
                      <Button color="primary" onClick={onClickCreateQuotation}>
                        Add Quotation
                      </Button>
                    ) : (
                      <div
                        className="timeline timeline-one-side"
                        data-timeline-axis-style="dashed"
                        data-timeline-content="axis"
                      >
                        {project.quotations.map((quotation) => (
                          <SectionQuotation
                            key={quotation.reference}
                            reference={quotation.reference}
                            date={quotation.date}
                          />
                        ))}
                      </div>
                    )}
                  </CardBody>
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
