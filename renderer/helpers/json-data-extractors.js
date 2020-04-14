/*
 * @param {json} vmJson - json data fetched using `vm list --output=json`
 * @return {array} - array of object with keys of important vm params
 */
const getAllVMs = (vmJson) => {
  return Object.values(vmJson).map((val, index) => {
    return {
      name: val['cm']['name'] || val['OS-EXT-SRV-ATTR:hostname'],
      status: val['cm']['status'],
      state: val['OS-EXT-STS:vm_state'],
    }
  })
}

export { getAllVMs }
