import React from 'react'
import { shell } from 'electron'

const ExternalBrowserLink = ({ href, children, ...props }) => {
  const handleOnClick = (e) => {
    e.preventDefault()
    shell.openExternal(href)
  }
  return (
    <a onClick={handleOnClick} {...props}>
      {children}
    </a>
  )
}
export default ExternalBrowserLink
