import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { Formik, Form } from 'formik'
import { ipcRenderer } from 'electron'

import { CMS_SET_CONFIG } from '../../../main/constants'
import FormGroup from '../../components/FormGroup'

import profileFieldsConfig from './profile-fields'
import mongoFieldsConfig from './mongo-fields'
import chameleonFieldsConfig from './chameleon-fields'

/**
 * Component for displaying Cloudmesh configuration parameters
 * for viewing and editing.
 *
 * Currently only handles simple key/value fields including deeply nested fields.
 *
 * @param config - Cloudmesh config (JSON) read in from the local YAML file.
 * @returns {*}
 */
const Cloudmesh = ({ config = {} }) => {
  return (
    <Formik
      initialValues={config ?? {}}
      onSubmit={(updatedConfig) => {
        if (ipcRenderer) {
          // Save updated config to store and Yaml file.
          ipcRenderer.invoke(CMS_SET_CONFIG, updatedConfig)
        }
      }}>
      <Form>
        <h2>Cloudmesh Configuration</h2>
        <FormGroup groupTitle="Profile" fieldsConfig={profileFieldsConfig} />
        <FormGroup groupTitle="MongoDB" fieldsConfig={mongoFieldsConfig} />
        <FormGroup
          groupTitle="Chameleon Cloud"
          fieldsConfig={chameleonFieldsConfig}
        />
        <Button
          type="submit"
          style={{ width: '20rem', marginTop: '20px' }}
          variant="contained"
          size="large"
          color="primary">
          Save
        </Button>
        <Button
          type="reset"
          style={{ marginTop: '20px', marginLeft: '30px' }}
          variant="outlined"
          size="large"
          color="secondary">
          Reset
        </Button>
      </Form>
    </Formik>
  )
}

Cloudmesh.propTypes = {
  config: PropTypes.object,
}

export default Cloudmesh
