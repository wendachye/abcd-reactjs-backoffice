import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardHeader, CardBody, Row, Col, Collapse, Table } from 'reactstrap';
import PageSubheader from 'components/Headers/PageSubheader';
import Button from 'components/Custom/Button';
import QuotationClientDetails from 'components/Quotation/QuotationClientDetails';
import { selectProjectQuotationByReference } from 'redux/slices/projectSlice';
import { useSelector } from 'hooks/useRedux';
import CreateSectionItemModal from 'components/Quotation/CreateSectionItemModal';

const QuotationDetails = () => {
  const { projectId, quotationId } = useParams<{ projectId: string; quotationId: string }>();
  const quotation = useSelector(selectProjectQuotationByReference(projectId, quotationId));
  const [openedCollapses, setOpenedCollapses] = useState<string[]>([]);
  const [addItemModalVisible, setAddItemModalVisible] = useState<boolean>(false);

  const collapsesToggle = (collapse: string) => {
    if (openedCollapses.includes(collapse)) {
      setOpenedCollapses(openedCollapses.filter((openedCollapse) => openedCollapse !== collapse));
    } else {
      setOpenedCollapses([...openedCollapses, collapse]);
    }
  };

  const onClickAddItem = () => setAddItemModalVisible(true);

  const onClickCancelAddItem = () => setAddItemModalVisible(false);

  return (
    <>
      <PageSubheader title="Quotation Details" />
      <Container className="mt--6" fluid>
        <QuotationClientDetails
          name={quotation?.name}
          date={quotation?.date}
          property={quotation?.property}
          nric={quotation?.nric}
          contactNo={quotation?.contactNo}
          remarks={quotation?.remarks}
        />
        <Card className="accordion">
          <CardHeader
            className="border-0"
            onClick={() => collapsesToggle('SECTION_A')}
            aria-expanded={openedCollapses.includes('SECTION_A')}
          >
            <h3 className="mb-0">(A) PERLIMINARIES</h3>
          </CardHeader>
          <Collapse role="tabpanel" isOpen={openedCollapses.includes('SECTION_A')}>
            <CardBody>
              <Row>
                <Col xs="12">
                  <Table className="align-items-center table-flush" responsive>
                    <tbody className="list">
                      <tr>
                        <td>1.</td>
                        <td>Deposits of any kind to authorities or management (by client)</td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                        <td>-</td>
                        <td>
                          <a className="table-action" href="" onClick={undefined}>
                            <i className="fas fa-edit" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>
                          Electical or PUB testing & commissioning (where necessary, cost subject to
                          site assessment)
                        </td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                        <td>-</td>
                        <td>
                          <a className="table-action" href="" onClick={undefined}>
                            <i className="fas fa-edit" />
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td style={{ whiteSpace: 'normal' }}>
                          Submission fees of any kind of authorities or management pertaining to
                          renovation works approval (where necessary, cost subject to site
                          assessment)
                        </td>
                        <td>$0.00</td>
                        <td>$0.00</td>
                        <td>-</td>
                        <td>
                          <a className="table-action" href="" onClick={undefined}>
                            <i className="fas fa-edit" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col className="pt-4 pr-4 text-right" xs="12">
                  <Button color="primary" onClick={onClickAddItem}>
                    Add
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="accordion">
          <CardHeader
            className="border-0"
            onClick={() => collapsesToggle('SECTION_B')}
            aria-expanded={openedCollapses.includes('SECTION_B')}
          >
            <h3 className="mb-0">(B) PROFESSIONAL SERVICES</h3>
          </CardHeader>
          <Collapse role="tabpanel" isOpen={openedCollapses.includes('SECTION_B')}>
            <CardBody>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
              quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on
              it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan
              excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore
              sustainable VHS.
            </CardBody>
          </Collapse>
        </Card>
        <Card className="accordion">
          <CardHeader
            className="border-0"
            onClick={() => collapsesToggle('SECTION_C')}
            aria-expanded={openedCollapses.includes('SECTION_C')}
          >
            <h3 className="mb-0">(C) DEMOLITION WORKS (SUBJECT TO APPROVAL)</h3>
          </CardHeader>
          <Collapse role="tabpanel" isOpen={openedCollapses.includes('SECTION_C')}>
            <CardBody>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
              quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on
              it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan
              excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore
              sustainable VHS.
            </CardBody>
          </Collapse>
        </Card>
        <Card className="accordion">
          <CardHeader
            className="border-0"
            onClick={() => collapsesToggle('SECTION_D')}
            aria-expanded={openedCollapses.includes('SECTION_D')}
          >
            <h3 className="mb-0">(D) MASONRY WORKS</h3>
          </CardHeader>
          <Collapse role="tabpanel" isOpen={openedCollapses.includes('SECTION_D')}>
            <CardBody>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
              ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
              quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on
              it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan
              excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven't heard of them accusamus labore
              sustainable VHS.
            </CardBody>
          </Collapse>
        </Card>
      </Container>
      <CreateSectionItemModal visible={addItemModalVisible} onClickCancel={onClickCancelAddItem} />
    </>
  );
};

export default QuotationDetails;
