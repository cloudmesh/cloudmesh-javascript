const prefix = 'cloudmesh.data.mongo'

export default [
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
