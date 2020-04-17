import React from 'react'
import { remote } from 'electron'
import * as Store from 'electron-store'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { ipcRenderer } from 'electron'
import { SET_CMS_PATH, CMS_BIN_STORE_KEY } from '../../../main/constants'

// Init app and store if remote is available.
let app
let store

if (remote) {
  app = remote.app
  store = new Store()
}

/**
 * Provide a file chooser dialog that the user can use to update their
 * CMS script setting.
 */
const handleOnClick = async () => {
  if (remote) {
    const { dialog } = remote
    // Show prompt
    const path = dialog.showOpenDialogSync({ properties: ['openFile'] })
    if (path && path[0]) {
      ipcRenderer.invoke(SET_CMS_PATH, path[0])
    }
  }
}

const Cms = () => {
  const currentPath = store ? store.get(CMS_BIN_STORE_KEY) : null
  return (
    <main>
      <h1>CMS Application Path</h1>
      {currentPath}
      <div>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              The Cloudmesh Dashboard requires the cms script to work.
            </Typography>
            <Typography color="textSecondary">
              Please update or set your CMS binary path here.
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <em>*Application will restart*</em>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={handleOnClick}>
              Set CMS
            </Button>
          </CardActions>
        </Card>
      </div>
    </main>
  )
}

export default Cms
