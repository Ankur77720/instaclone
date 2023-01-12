import React from 'react'

const Input = ({
  name = '',
  id = 'InputId',
  label = '',
  type = 'inputType',
  placeholder = '',
  value = '',
}) => {
  return (
    <>
      <div className="mb-3 p-1 w-100">
        {label !== '' && (
          <label htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        {type == 'submit' ? (
          <input
            type={type}
            className="form-control shadow-none btn bg-dark text-light"
            placeholder={placeholder}
            id={id}
            name={name}
            value={value}
          />
        ) : (
          <input
            type={type}
            className="form-control shadow-none"
            placeholder={placeholder}
            id={id}
            name={name}
            value={value}
          />
        )}
      </div>
    </>
  )
}

export default Input
