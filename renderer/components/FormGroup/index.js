import React from 'react'
import PropTypes from 'prop-types'
import ConfigFieldInput from '../ConfigFieldInput'

const FormGroup = ({ fieldsConfig = [], groupTitle, width = '400px' }) => {
  if (fieldsConfig && fieldsConfig.length !== 0) {
    return (
      <div style={{ width: width }}>
        <div>
          <h4>{groupTitle}</h4>
          {fieldsConfig.map((field, i) => (
            <div key={i} style={{ margin: '20px 0 20px 20px' }}>
              <ConfigFieldInput {...field} fullWidth={true} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

FormGroup.propTypes = {
  fieldsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  groupTitle: PropTypes.string,
}

export default FormGroup
