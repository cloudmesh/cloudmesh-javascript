/*
* @param {json} vmJson - json data fetched using `vm list --output=json`
* @return {array} - array of vm names
*/
const getAllVMNames = (vmJson) => {
    return Object.values(vmJson).map((val, index) => {
        return val["cm"]["name"] || val["OS-EXT-SRV-ATTR:hostname"]
    })
}





export {
    getAllVMNames
}