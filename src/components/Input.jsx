import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function Input({ type, name, value, onChange, className, placeholder }) {
  return (
      <div className="form-group row">
        <div className="col-10 center-block">
          <input 
              type={type} 
              name={name} 
              value={value}
              onChange={onChange}
              className={className}
              placeholder={placeholder}
          />
        </div>
      </div>
  );
}

export default Input;