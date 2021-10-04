import { memo } from 'react';
import { push } from 'connected-react-router';
import { Row, Col, Form, FormGroup, Input } from 'reactstrap';
import Select2 from 'react-select2-wrapper';
import ReactDatetime from 'react-datetime';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import uuid from 'uuid';
import moment from 'moment';
import Button from 'components/Custom/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Custom/Modal';
import { propertyData } from 'constants/app';
import { createProject, selectProjectLoading } from 'redux/slices/projectSlice';
import { useSelector, useDispatch } from 'hooks/useRedux';
import { ProjectType } from 'types/Project';

interface FormInputs {
  name: string;
  property: string;
  address: string;
  startDate: string;
  nric?: string;
  contactNo?: string;
  email?: string;
  remarks?: string;
}

const resolver = yupResolver(
  yup
    .object({
      name: yup.string().required('Name is required'),
      property: yup.string().required('Property is required'),
      address: yup.string().required('Address is required'),
      startDate: yup.string().required('Start Date is required'),
    })
    .required(),
);

interface ModalCreateProjectProps {
  visible: boolean;
  onClickCancel: () => void;
}

const CreateProjectModal = ({ visible, onClickCancel }: ModalCreateProjectProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectProjectLoading);
  const { control, handleSubmit } = useForm<FormInputs>({ resolver, mode: 'onChange' });

  const onSubmitCreateProject = (data: FormInputs) => {
    const project: ProjectType = {
      uuid: uuid.v4(),
      name: data.name,
      property: data.property,
      address: data.address,
      startDate: data.startDate,
      nric: data.nric,
      contactNo: data.contactNo,
      email: data.email,
      remarks: data.remarks,
      quotations: [],
    };

    dispatch(createProject.trigger({ project }));
    dispatch(push(`/projects/${project.uuid}`, project));
  };

  return (
    <Modal size="lg" visible={visible}>
      <Form onSubmit={handleSubmit(onSubmitCreateProject)}>
        <ModalHeader>New Project</ModalHeader>
        <ModalBody>
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
                <label className="form-control-label">Email</label>
                <Controller
                  name="email"
                  control={control}
                  shouldUnregister
                  defaultValue=""
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
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input {...field} placeholder="Remarks" type="textarea" invalid={!!error} />
                      {error && <div className="invalid-feedback">{error.message}</div>}
                    </>
                  )}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" type="reset" onClick={onClickCancel}>
            Cancel
          </Button>
          <Button color="primary" type="submit" disabled={loading} loading={loading}>
            Create
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default memo(CreateProjectModal);
