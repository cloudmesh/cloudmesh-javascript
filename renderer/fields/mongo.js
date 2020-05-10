import os from 'os'
/**
 * Configuration for the Mongo settings viewer/editor.
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
const prefix = 'cloudmesh.data.mongo'
const platform = os.platform()

// Field definitions.
const config = [
  {
    name: `${prefix}.MONGO_USERNAME`,
    label: 'Mongo Username',
    type: 'text',
  },
  {
    name: `${prefix}.MONGO_PASSWORD`,
    label: 'Mongo Password',
    type: 'password',
  },
  {
    name: `${prefix}.MODE`,
    label: 'Mode',
    type: 'text',
  },
]

// Add OS specific Mongo settings.
if (['darwin', 'linux', 'win32'].some((os) => os === platform)) {
  const osPrefix = `${prefix}.MONGO_DOWNLOAD.${platform}`
  config.push(
    {
      name: `${osPrefix}.url`,
      label: `Download URL (${platform})`,
      type: 'url',
    },
    {
      name: `${osPrefix}.MONGO_PATH`,
      label: `MongoDB Path (${platform})`,
      type: 'text',
    },
    {
      name: `${osPrefix}.MONGO_LOG`,
      label: `MongoDB Log (${platform})`,
      type: 'text',
    },
    {
      name: `${osPrefix}.MONGO_HOME`,
      label: `MongoDB Home (${platform})`,
      type: 'text',
    }
  )
}

export default config
