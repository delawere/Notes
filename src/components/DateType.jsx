import React from 'react';
import styled from 'styled-components';

const DateTypeContainer = styled.div `
  width: 15%;
  padding-left: 2.5%;
  color: #fff;
`


function DateType() {
  return (
     <DateTypeContainer>  
        <div>Today</div>
        <div>Calendar</div>
     </DateTypeContainer>  
  );
}

export default DateType;