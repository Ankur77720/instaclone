import React from 'react'

const Input = ({
  name = '',
  id = 'InputId',
  label = '',
  type = 'text',
  placeholder = '',
  value = '',
  onChange = () => {},
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
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            className="form-control shadow-none"
            placeholder={placeholder}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </>
  )
}

export default Input
