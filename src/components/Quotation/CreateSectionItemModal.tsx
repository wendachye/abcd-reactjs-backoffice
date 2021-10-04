import { memo, useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Select2 from 'react-select2-wrapper';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Custom/Modal';
import Button from 'components/Custom/Button';
import { DESCRIPTION, SINGLE_LINE_ITEM, GROUP_ITEM } from 'constants/app';

interface CreateSectionItemModalProps {
  visible: boolean;
  onClickCancel: () => void;
}

const CreateSectionItemModal = ({ visible, onClickCancel }: CreateSectionItemModalProps) => {
  const [itemType, setItemType] = useState<string | null>(null);
  //   const [state, setstate] = useState(initialState)

  useEffect(() => {
    if (itemType) {
      switch (itemType) {
        case DESCRIPTION:
          break;
        case SINGLE_LINE_ITEM:
          break;
        case GROUP_ITEM:
          break;
        default:
          break;
      }
    }
  }, [itemType]);

  return (
    <Modal size="lg" visible={visible}>
      <ModalHeader>New Item</ModalHeader>
      <ModalBody>
        <div style={{ maxWidth: 280 }}>
          <Select2
            value={itemType}
            className="form-control"
            options={{
              placeholder: 'Select a type',
            }}
            data={[DESCRIPTION, SINGLE_LINE_ITEM, GROUP_ITEM]}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setItemType(e.target.value)}
          />
        </div>
        <Row>
          <Col></Col>
        </Row>
        <hr className="mb-0" />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" type="reset" onClick={onClickCancel}>
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          // disabled={loading}
          // loading={loading}
        >
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default memo(CreateSectionItemModal);
