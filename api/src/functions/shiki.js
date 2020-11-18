import { getHighlighter } from 'shiki'
import { getSVGRenderer } from 'shiki-renderer-svg'

export const handler = async (event, context) => {
  const svgRenderer = await getSVGRenderer({
    bg: '#2E3440',
    fontFamily: '-apple-system',
    fontSize: 14,
  })

  const svg = await getHighlighter({
    theme: 'nord',
  }).then((highlighter) => {
    // return highlighter.codeToHtml(`console.log('shiki');`, 'js')
    const code = `console.log('shiki');`
    const tokens = highlighter.codeToThemedTokens(code, 'js')
    const s = svgRenderer.renderToSVG(tokens)
    console.log(s)
    return s
  })

  return {
    statusCode: 200,

    body: JSON.stringify({
      data: svg,
    }),
  }
}
