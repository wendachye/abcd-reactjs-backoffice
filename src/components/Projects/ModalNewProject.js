import { memo } from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import Select2 from 'react-select2-wrapper';
import ReactDatetime from 'react-datetime';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import uuid from 'uuid';
import Button from 'components/Custom/Button';
import { propertyData } from 'constants/app';
import { createProject } from 'redux/slices/projectSlice';

const formSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    nric: yup.string().required('NRIC is required'),
    contactNo: yup.string().required('Contact No is required'),
    address: yup.string().required('Address is required'),
  })
  .required();

const ModalNewProject = ({ visible, onClickCancel }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.project);
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitCreateProject = (data) => {
    try {
      console.log('data', data);
      const project = {
        uuid: uuid.v4(),
        name: data.name,
        property: data.property,
        nric: data.nric,
        contactNo: data.contactNo,
        address: data.address,
        startDate: data.startDate.format('DD MMM YYYY'),
      };

      dispatch(createProject.trigger({ project }));
      dispatch(push(`/projects/${project.uuid}`, project));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    reset({
      name: '',
      nric: '',
      contactNo: '',
      address: '',
    });
    onClickCancel();
  };

  return (
    <Modal className="modal-dialog-centered" size="lg" isOpen={visible}>
      <Form onSubmit={handleSubmit(onSubmitCreateProject)}>
        <div className="modal-header justify-content-center">
          <h5 className="modal-title">New Project</h5>
        </div>
        <div className="modal-body">
          <Row>
            <Col md="6" xs="12">
              <FormGroup>
                <label className="form-control-label">Name</label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
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
                  defaultValue={propertyData?.[0].id || ''}
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
            <Col md="6" xs="12">
              <FormGroup>
                <label className="form-control-label">NRIC</label>
                <Controller
                  name="nric"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
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
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input {...field} placeholder="Contact No" type="text" invalid={!!error} />
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
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
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
                  defaultValue={moment()}
                  rules={{
                    required: true,
                  }}
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
          </Row>
        </div>
        <div className="modal-footer">
          <Button color="secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={loading || formState.isSubmitting}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(ModalNewProject);
