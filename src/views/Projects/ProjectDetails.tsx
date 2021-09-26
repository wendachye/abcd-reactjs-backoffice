import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, CardBody, Form, FormGroup, Row, Col, Input } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select2 from 'react-select2-wrapper';
import ReactDatetime from 'react-datetime';
import PageSubheader from 'components/Headers/PageSubheader';
import Button from 'components/Custom/Button';
import { propertyData } from 'constants/app';
import { ProjectType } from 'types/Project';
import { useAppSelector } from 'hooks/app';

interface FormInputs {
  name: string;
  property: string;
  nric: string;
  contactNo: string;
  address: string;
  startDate: string;
}

const resolver = yupResolver(
  yup
    .object({
      name: yup.string().required('Name is required'),
      property: yup.string().required('Property is required'),
      nric: yup.string().required('NRIC is required'),
      contactNo: yup.string().required('Contact No is required'),
      address: yup.string().required('Address is required'),
      startDate: yup.string().required('Start Date is required'),
    })
    .required(),
);

const ProjectDetails = () => {
  const history = useLocation();
  const { loading } = useAppSelector((state) => state.project);
  const { control, handleSubmit, formState } = useForm<FormInputs>({ resolver });
  const [project] = useState<ProjectType | null>(
    history.state ? (history.state as ProjectType) : null,
  );

  const onSubmitUpdateProject = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <>
      <PageSubheader title="Project Details" />
      <Container className="mt--6" fluid>
        <Card>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmitUpdateProject)}>
              <Row>
                <Col md="6" xs="12">
                  <FormGroup>
                    <label className="form-control-label">Name</label>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={project?.name || ''}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Input {...field} placeholder="Name" type="text" invalid={!!error} />
                          {error && <div className="invalid-feedback">{error.message}</div>}
                        </>
                      )}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" xs="12">
                  <FormGroup>
                    <label className="form-control-label">Property</label>
                    <Controller
                      name="property"
                      control={control}
                      defaultValue={project?.property || ''}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Select2
                            {...field}
                            className="form-control"
                            options={{
                              placeholder: 'Property',
                            }}
                            data={propertyData}
                          />
                          {error && <div className="invalid-feedback">{error.message}</div>}
                        </>
                      )}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" xs="12">
                  <FormGroup>
                    <label className="form-control-label">NRIC</label>
                    <Controller
                      name="nric"
                      control={control}
                      defaultValue={project?.nric || ''}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Input {...field} placeholder="NRIC" type="text" invalid={!!error} />
                          {error && <div className="invalid-feedback">{error.message}</div>}
                        </>
                      )}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" xs="12">
                  <FormGroup>
                    <label className="form-control-label">Contact No</label>
                    <Controller
                      name="contactNo"
                      control={control}
                      defaultValue={project?.contactNo || ''}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Input {...field} placeholder="Contact No" type="tel" invalid={!!error} />
                          {error && <div className="invalid-feedback">{error.message}</div>}
                        </>
                      )}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" xs="12">
                  <FormGroup>
                    <label className="form-control-label">Address</label>
                    <Controller
                      name="address"
                      control={control}
                      defaultValue={project?.address || ''}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Input {...field} placeholder="Address" type="text" invalid={!!error} />
                          {error && <div className="invalid-feedback">{error.message}</div>}
                        </>
                      )}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" xs="12">
                  <FormGroup>
                    <label className="form-control-label">Start Date</label>
                    <Controller
                      name="startDate"
                      control={control}
                      defaultValue={project?.startDate || ''}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <ReactDatetime
                            {...field}
                            inputProps={{
                              placeholder: 'Start Date',
                            }}
                            timeFormat={false}
                            dateFormat="DD MMM YYYY"
                          />
                          {error && <div className="invalid-feedback">{error.message}</div>}
                        </>
                      )}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <Button
                    color="primary"
                    type="submit"
                    disabled={loading || formState.isSubmitting}
                    loading={loading}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ProjectDetails;
