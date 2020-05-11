import Markdown from 'markdown-to-jsx'
import React from 'react'
import { render } from 'react-dom'

import contributorsEditable from '../editables/contributors.md'

const Contributors = () => {
  return <Markdown>{contributorsEditable}</Markdown>
}

export default Contributors
