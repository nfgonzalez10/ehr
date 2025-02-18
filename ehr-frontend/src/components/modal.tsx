import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ModalProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onHide?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const CustomModal: React.FC<ModalProps> = ({
  show,
  title,
  children,
  onConfirm,
  onHide = () => {},
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelText}
        </Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
