/**
 * Configuration for the Chameleon settings viewer/editor.
 *
 * An array of objects with the following attributes.
 *
 * * name - The key path of the cloudmesh.yaml field.
 *          '.' are used to denote deeply nested fields.
 *          e.g.
 *             cloudmesh.profile.firstname
 *             cloudmesh.profile.lastname
 *   label - A user friendly label to display.
 *   type  - The type of input field.  See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 *           for valid types.  Some types ('file') are not be compatible with electron.
 */
const prefix = 'cloudmesh.cloud.chameleon.credentials.auth'

export default [
  {
    name: `${prefix}.username`,
    label: 'Chameleon Username',
    type: 'text',
  },
  {
    name: `${prefix}.password`,
    label: 'Chameleon Password',
    type: 'password',
  },
]
