import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });
  const closeModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      close();
    }
  };
  return createPortal(
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
};

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};