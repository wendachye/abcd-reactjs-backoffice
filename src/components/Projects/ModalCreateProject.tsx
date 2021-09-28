import { memo } from 'react';
import { push } from 'connected-react-router';
import { Modal, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import Select2 from 'react-select2-wrapper';
import ReactDatetime from 'react-datetime';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import uuid from 'uuid';
import moment from 'moment';
import Button from 'components/Custom/Button';
import { propertyData } from 'constants/app';
import { createProject } from 'redux/slices/projectSlice';
import { useAppSelector, useAppDispatch } from 'hooks/app';
import { ProjectType } from 'types/Project';

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

interface ModalCreateProjectProps {
  visible: boolean;
  onClickCancel: () => void;
}

const ModalCreateProject = ({ visible, onClickCancel }: ModalCreateProjectProps) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.project);
  const { control, handleSubmit, formState } = useForm<FormInputs>({ resolver });

  const onSubmitCreateProject = (data: FormInputs) => {
    try {
      const project: ProjectType = {
        uuid: uuid.v4(),
        name: data.name,
        property: data.property,
        nric: data.nric,
        contactNo: data.contactNo,
        address: data.address,
        startDate: data.startDate,
        quotations: [],
      };

      dispatch(createProject.trigger({ project }));
      dispatch(push(`/projects/${project.uuid}`, project));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
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
                  shouldUnregister
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
                  shouldUnregister
                  defaultValue={propertyData?.[0].id || ''}
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
                  shouldUnregister
                  defaultValue=""
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
                  shouldUnregister
                  defaultValue=""
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
                  shouldUnregister
                  defaultValue=""
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
                  shouldUnregister
                  defaultValue={moment().format('DD MMM YYYY')}
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
          <Button color="secondary" type="reset" onClick={handleCancel}>
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

export default memo(ModalCreateProject);
