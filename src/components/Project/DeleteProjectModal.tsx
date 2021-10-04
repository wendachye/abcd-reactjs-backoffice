import { memo } from 'react';
import { Modal, ModalBody, ModalFooter } from 'components/Custom/Modal';
import Button from 'components/Custom/Button';

interface DeleteProjectModalProps {
  visible: boolean;
  onClickCancel: () => void;
  onClickCofirm: () => void;
  confirmButtonDisabled?: boolean;
  confirmButtonLoading?: boolean;
}

const DeleteProjectModal = ({
  visible,
  onClickCancel,
  onClickCofirm,
  confirmButtonDisabled,
  confirmButtonLoading,
}: DeleteProjectModalProps) => {
  return (
    <Modal visible={visible}>
      <ModalBody>Are you sure you want to delete this project?</ModalBody>
      <ModalFooter>
        <Button color="secondary" type="reset" onClick={onClickCancel}>
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          disabled={confirmButtonDisabled}
          loading={confirmButtonLoading}
          onClick={onClickCofirm}
        >
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default memo(DeleteProjectModal);
