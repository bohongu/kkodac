import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

type ModalProps = {
  children: React.ReactNode;
};

const Backdrop = () => {
  return <BackdropStyled />;
};

const ModalOverlay: React.FC<ModalProps> = ({ children }) => {
  return <ModalWrapper>{children}</ModalWrapper>;
};

const portalElement = document.getElementById('modal') as HTMLDivElement;

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;

const BackdropStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 3rem;
  width: 35rem;
  background-color: red;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
`;
