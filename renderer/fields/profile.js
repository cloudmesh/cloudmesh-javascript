/**
 * Configuration for the Profile settings viewer/editor.
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
const prefix = 'cloudmesh.profile'
export default [
  {
    name: `${prefix}.firstname`,
    label: 'First Name',
    type: 'text',
  },
  {
    name: `${prefix}.lastname`,
    label: 'Last Name',
    type: 'text',
  },
  {
    name: `${prefix}.email`,
    label: 'Email',
    type: 'email',
  },
  {
    name: `${prefix}.user`,
    label: 'Username',
    type: 'text',
  },
  {
    name: `${prefix}.github`,
    label: 'GitHub',
    type: 'text',
  },
  {
    name: `${prefix}.publickey`,
    label: 'Public Key',
    type: 'text',
  },
]
