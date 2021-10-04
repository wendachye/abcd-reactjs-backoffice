import { memo, useRef } from 'react';
import { Card, CardBody, Form, FormGroup, Row, Col, Input } from 'reactstrap';
import Select2 from 'react-select2-wrapper';
import ReactDatetime from 'react-datetime';
import NotificationAlert from 'react-notification-alert';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'components/Custom/Button';
import { useSelector, useDispatch } from 'hooks/useRedux';
import { propertyData } from 'constants/app';
import { ProjectType } from 'types/Project';
import { updateProject, selectProjectLoading } from 'redux/slices/projectSlice';

interface FormInputs {
  name: string;
  property: string;
  nric: string;
  contactNo: string;
  address: string;
  startDate: string;
  email?: string;
  remarks?: string;
}

type FormInputKeys = keyof FormInputs;

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

const UpdateProjectForm = ({ project }: { project: ProjectType | undefined }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { isDirty, dirtyFields },
    reset,
  } = useForm<FormInputs>({ resolver, mode: 'onChange' });
  const loading = useSelector(selectProjectLoading);
  const notificationAlertRef = useRef<NotificationAlert | undefined>(undefined);

  const onSubmitUpdateProject = (data: FormInputs) => {
    const changes: Partial<ProjectType> = {};

    for (const key in dirtyFields) {
      changes[key as FormInputKeys] = data[key as FormInputKeys];
    }

    if (project) {
      dispatch(
        updateProject.trigger({
          uuid: project.uuid,
          changes,
        }),
      );

      reset(data);

      if (notificationAlertRef.current) {
        notificationAlertRef.current.notificationAlert({
          place: 'tc',
          message: 'Update Success',
          type: 'success',
          icon: 'ni ni-check-bold',
          autoDismiss: 1.5,
        });
      }
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmitUpdateProject)}>
            <Row>
              <Col sm="6" xs="12">
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
              <Col sm="6" xs="12">
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
              <Col sm="6" xs="12">
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
              <Col sm="6" xs="12">
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
              <Col sm="6" xs="12">
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
              <Col sm="6" xs="12">
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
              <Col sm="6" xs="12">
                <FormGroup>
                  <label className="form-control-label">Email</label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={project?.email || ''}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input {...field} placeholder="Email" type="email" invalid={!!error} />
                        {error && <div className="invalid-feedback">{error.message}</div>}
                      </>
                    )}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" xs="12">
                <FormGroup>
                  <label className="form-control-label">Remarks</label>
                  <Controller
                    name="remarks"
                    control={control}
                    defaultValue={project?.remarks || ''}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input {...field} placeholder="Remarks" type="textarea" invalid={!!error} />
                        {error && <div className="invalid-feedback">{error.message}</div>}
                      </>
                    )}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" className="text-right">
                <Button
                  color="primary"
                  type="submit"
                  disabled={loading || !isDirty}
                  loading={loading}
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef as React.LegacyRef<NotificationAlert>} />
      </div>
    </>
  );
};

export default memo(UpdateProjectForm);
