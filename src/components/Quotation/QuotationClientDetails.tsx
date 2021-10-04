import { memo } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import { QuotationType } from 'types/Project';

const QuotationClientDetails = ({
  name,
  date,
  property,
  nric,
  contactNo,
  remarks,
}: Partial<QuotationType>) => {
  return (
    <Card>
      <CardHeader className="border-0">
        <h3 className="mb-0">Client Details</h3>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col md="4" sm="6" xs="12">
              <FormGroup>
                <Input disabled value={name} placeholder="Name" type="text" />
              </FormGroup>
            </Col>
            <Col md="4" sm="6" xs="12">
              <FormGroup>
                <Input disabled value={property} placeholder="Property" type="text" />
              </FormGroup>
            </Col>
            <Col md="4" sm="6" xs="12">
              <FormGroup>
                <Input disabled value={nric} placeholder="NRIC" type="text" />
              </FormGroup>
            </Col>
            <Col md="4" sm="6" xs="12">
              <FormGroup>
                <Input disabled value={contactNo} placeholder="Contact No" type="text" />
              </FormGroup>
            </Col>
            <Col md="4" sm="6" xs="12">
              <FormGroup>
                <Input disabled value={date} placeholder="Date" type="text" />
              </FormGroup>
            </Col>
            <Col md="4" sm="6" xs="12">
              <FormGroup>
                <Input disabled value={remarks} placeholder="Remarks" type="text" />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default memo(QuotationClientDetails);
