import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, CardBody, Form, FormGroup, Col, Input } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select2 from 'react-select2-wrapper';
import ReactDatetime from 'react-datetime';
import PageSubheader from 'components/Headers/PageSubheader';
import Button from 'components/Custom/Button';
import { propertyData } from 'constants/app';

const formSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    nric: yup.string().required('NRIC is required'),
    contactNo: yup.string().required('Contact No is required'),
    address: yup.string().required('Address is required'),
  })
  .required();

const ProjectDetails = (props) => {
  const {
    location: { state },
  } = props;
  const dispatch = useDispatch();
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(formSchema),
  });
  const [project, setProject] = useState(state);

  useEffect(() => {}, []);

  console.log('state', state);
  console.log('project', project);

  return (
    <>
      <PageSubheader title="Project Details" />
      <Container className="mt--6" fluid>
        <Card>
          <CardBody>
            <Form>
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
                    rules={{
                      required: true,
                    }}
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
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ProjectDetails;
