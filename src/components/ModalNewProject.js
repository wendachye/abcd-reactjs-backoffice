import { Modal, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import Select2 from 'react-select2-wrapper';
import ReactDatetime from 'react-datetime';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
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

const ModalNewProject = ({ visible, onClickCancel, onClickSave, loading }) => {
  const { control, handleSubmit, formState } = useForm({ resolver: yupResolver(formSchema) });

  return (
    <Modal className="modal-dialog-centered" size="lg" isOpen={visible}>
      <Form>
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
                  defaultValue="1"
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select2
                        {...field}
                        className="form-control"
                        defaultValue="1"
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
          <Button color="secondary" type="button" onClick={onClickCancel}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={loading || formState.isSubmitting}
            loading={loading}
            onClick={handleSubmit(onClickSave)}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalNewProject;
