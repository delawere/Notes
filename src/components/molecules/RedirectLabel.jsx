import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from '../atoms/Link';

const RedirectLabelWrapper = styled.p`
  margin-top: 4em;
`;

const RedirectLabel = ({ labelTitle, linkTitle }) => (
  <RedirectLabelWrapper>
    {labelTitle} <Link title={linkTitle} />
  </RedirectLabelWrapper>
);

RedirectLabel.propTypes = {
  labelTitle: PropTypes.string,
  linkTitle: PropTypes.string
};

export default RedirectLabel;
