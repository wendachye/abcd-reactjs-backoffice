import { FC, memo } from 'react';
import styled from 'styled-components';
import {
  Modal as ReactstrapModal,
  ModalHeader as ReactstrapModalHeader,
  ModalBody as ReactstrapModalBody,
  ModalFooter as ReactstrapModalFooter,
} from 'reactstrap';

//#region Modal

interface CustomModalProps {
  children?: React.ReactNode;
  className?: string;
  visible: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fade?: boolean;
}

const CustomModal: FC<CustomModalProps> = ({ children, className, visible, size, fade }) => {
  return (
    <ReactstrapModal
      className={`modal-dialog-centered ${className}`}
      size={size}
      isOpen={visible}
      fade={fade}
    >
      {children}
    </ReactstrapModal>
  );
};

CustomModal.defaultProps = {
  size: 'md',
  fade: true,
};

const Modal = memo(CustomModal);

//#endregion

//#region Modal Header

const ButtonClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1.25rem;
  background-color: transparent;
  border: 0;
  > span {
    font-size: 1.15rem;
    font-weight: 600;
    color: darkgrey;
  }
`;

const CustomModalHeader: FC<{
  children?: React.ReactNode;
  className?: string;
  onClickClose?: () => void;
}> = ({ children, className, onClickClose }) => {
  return (
    <ReactstrapModalHeader
      className={`modal-header justify-content-center text-center ${className}`}
    >
      {children}
      {onClickClose && (
        <ButtonClose type="button" onClick={onClickClose}>
          <span>x</span>
        </ButtonClose>
      )}
    </ReactstrapModalHeader>
  );
};

const ModalHeader = memo(CustomModalHeader);

//#endregion

//#region Modal Body

const CustomModalBody: FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <ReactstrapModalBody className={`modal-body ${className}`}>{children}</ReactstrapModalBody>
  );
};

const ModalBody = memo(CustomModalBody);

//#endregion

//#region Modal Footer

const CustomModalFooter: FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <ReactstrapModalFooter className={`modal-footer ${className}`}>
      {children}
    </ReactstrapModalFooter>
  );
};

const ModalFooter = memo(CustomModalFooter);

//#endregion

export { Modal, ModalHeader, ModalBody, ModalFooter };
