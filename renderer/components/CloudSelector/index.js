import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useCmsCloud } from '../../hooks/cms'

const CloudSelector = () => {
  const [cloud, setCloud] = useCmsCloud()
  const handleCloudChange = (event) => setCloud(event.target.value)

  return (
    <FormControl>
      <InputLabel id="select-cloud-label">Cloud</InputLabel>
      <Select
        labelId="select-cloud-label"
        id="cloud-select"
        value={cloud}
        onChange={handleCloudChange}>
        <MenuItem value="openstack">OpenStack</MenuItem>
        <MenuItem value="chameleon">Chameleon</MenuItem>
        <MenuItem value="aws">AWS</MenuItem>
        <MenuItem value="google">Google</MenuItem>
        <MenuItem value="azure">Azure</MenuItem>
      </Select>
    </FormControl>
  )
}

export default CloudSelector
