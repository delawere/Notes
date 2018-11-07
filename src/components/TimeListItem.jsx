import React from 'react';

const buttonStyle = {
  'fontSize': '18px',
  'color': '#fafafa',
  'width': '80px',
  'height': '35px',
  'border': '1px solid rgb(108, 117, 125)',
  'borderRadius': '4px',
  'backgroundColor': 'rgb(108, 117, 125)'
}

function TimeListItem({ value }) {
  return (
        <button style={buttonStyle}>
            {`${value}:00`}
        </button>
  );
}

export default TimeListItem;