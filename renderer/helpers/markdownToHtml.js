import remark from 'remark'
import html from 'remark-html'

// Taken from https://github.com/zeit/next.js/blob/canary/examples/blog-starter/lib/markdownToHtml.js
export default async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
