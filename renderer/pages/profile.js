import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ipcRenderer } from 'electron'

import styles from './profile.module.css'
import { CMS_SET_CONFIG } from '../../main/constants'

const Profile = ({ config }) => {
  const formRef = useRef(null)
  const { firstname, lastname, email, user, github, publickey } =
    config?.cloudmesh?.profile ?? {}

  const handleSave = (evt) => {
    // TODO Implement formik for form handling here.
    const form = formRef.current
    const newConfig = Object.assign({}, config)

    const fields = [
      'firstname',
      'lastname',
      'email',
      'user',
      'github',
      'publickey',
    ]
    fields.map((name) => {
      const val = form[name].value
      newConfig.cloudmesh.profile[name] = val
    })
    if (ipcRenderer) {
      // Save updated config to store and Yaml file.
      ipcRenderer.invoke(CMS_SET_CONFIG, newConfig)
    }
  }

  return (
    <div>
      <h3>CMS Profile</h3>
      <form noValidate autoComplete="off" ref={formRef}>
        <div className={styles.form_row}>
          <TextField
            id="firstname"
            label="First Name"
            defaultValue={firstname}
          />
          <TextField id="lastname" label="Last name" defaultValue={lastname} />
          <TextField id="email" label="Email" defaultValue={email} />
        </div>
        <div className={styles.form_row}>
          <TextField id="user" label="Username" defaultValue={user} />
          <TextField id="github" label="GitHub" defaultValue={github} />
          <TextField
            id="publickey"
            label="Public Key"
            defaultValue={publickey}
          />
        </div>
        <div className={styles.save}>
          <Button
            onClick={handleSave}
            variant="contained"
            size="large"
            color="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

Profile.propTypes = {
  config: PropTypes.object.isRequired,
}

export default Profile
