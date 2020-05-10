import React from 'react'
import { useRouter } from 'next/router'
import { shell } from 'electron'
import fs from 'fs'
import path from 'path'
import markdownToHtml from '../../helpers/markdownToHtml'
import { getAllFiles } from '../../helpers/fileUtils'
import Button from '@material-ui/core/Button'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const markdownDir = process.cwd()

const HelpDoc = ({ content, showBackButton = true }) => {
  const router = useRouter()
  return (
    <div
      onClickCapture={(e) => {
        // Capture all external link clicks and redirect it to external browser.
        const href = e?.target?.href
        if (href && /https?:\/\/(?!localhost)/.test(href)) {
          // Prevent Electron from trying to open this.
          e.preventDefault()
          // Send link to the external browser.
          shell.openExternal(href)
        }
      }}>
      {showBackButton && (
        <Button onClick={() => router.back()}>
          <ArrowBackIosIcon /> Back
        </Button>
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export async function getStaticPaths() {
  // Get all Markdown files.
  const files = getAllFiles('docs').filter((file) => file.endsWith('.md'))

  const paths = files.map((file) => {
    const markdown = file.split(path.sep)
    return {
      params: { markdown },
    }
  })
  // Push the custom mapping of index.html => README.md
  paths.push({
    params: { markdown: ['index.html'] },
  })

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const filePathArray = params?.markdown ?? []
  let showBackButton = true
  let content = ''
  if (filePathArray.length >= 1) {
    if (filePathArray[0] === 'index.html') {
      showBackButton = false
      content = await markdownToHtml(
        fs.readFileSync(path.join(markdownDir, 'README.md'), 'utf8') ?? ''
      )
    } else {
      content = await markdownToHtml(
        fs.readFileSync(path.join(markdownDir, ...filePathArray), 'utf8') ?? ''
      )
    }
  }
  return { props: { content, showBackButton } }
}

export default HelpDoc
