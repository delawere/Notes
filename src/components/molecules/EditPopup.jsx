import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import EditPopupInput from '../atoms/EditPopupInput';

const Container = styled.div`
  display: ${props => (props.visible ? '' : 'none')};
  padding: 0.4em 0.4em;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
`;

const EditPopup = ({ visible, onChange, currentText, newText }) => {
  return (
    <Container visible={visible}>
      <EditPopupInput
        type="text"
        name="text"
        value={newText}
        onChange={onChange}
        placeholder={currentText}
      />
    </Container>
  );
};

EditPopup.propTypes = {
  onChange: propTypes.func,
  currentText: propTypes.string,
  newText: propTypes.string
};

export default EditPopup;
