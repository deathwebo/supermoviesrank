import React from 'react';
import PropTypes from 'prop-types';

const ModalCard = (props) => (

  <div className={"modal "+ (props.isActive ? 'is-active' : '')}>

    <div className="modal-background" onClick={() => props.onClose()}></div>

    <div className="modal-card">

      <header className="modal-card-head">
        <p className="modal-card-title">{props.title}</p>
        <button className="delete" onClick={() => props.onClose()}></button>
      </header>

      <section className="modal-card-body">
        {props.children}
      </section>

    </div>

  </div>

)

ModalCard.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalCard;