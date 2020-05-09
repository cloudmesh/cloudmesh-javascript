import React from 'react'
import { shell } from 'electron'
import fs from 'fs'
import path from 'path'
import markdownToHtml from '../../helpers/markdownToHtml'
import { getAllFiles } from '../../helpers/fileUtils'

const markdownDir = process.cwd()

const HelpDoc = ({ content }) => {
  return (
    <div
      onClickCapture={(e) => {
        // Capture all external link clicks and redirect it to external browser.
        const href = e?.target?.href
        if (href && /https?:\/\//.test(href)) {
          // Prevent Electron from trying to open this.
          e.preventDefault()
          // Send link to the external browser.
          shell.openExternal(href)
        }
      }}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export async function getStaticPaths() {
  const files = getAllFiles(path.join(markdownDir, 'docs'), (file) =>
    file.endsWith('.md')
  )

  console.log(files)

  const paths = [
    {
      params: { markdown: ['index.html'] },
    },
  ]

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const filePathArray = params?.markdown ?? []
  let content = ''
  if (filePathArray.length === 1 && filePathArray[0] === 'index.html') {
    content = await markdownToHtml(
      fs.readFileSync(path.join(markdownDir, 'README.md'), 'utf8') ?? ''
    )
  }
  return { props: { content } }
}

export default HelpDoc
