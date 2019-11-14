const fetchSnippets = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/30-seconds/30-seconds-of-code/master/snippet_data/snippets.json')
    const data = await response.json()
    return data.data.map(snippetData => {
      const title = snippetData.title
      const description = snippetData.attributes.text
      const codeBlock = snippetData.attributes.codeBlocks.es6
      return {
        title,
        description,
        codeBlock
      }
    })
  } catch (err) {
    throw new Error(err)
  }
}

const appendSnippet = (navLinkList, elem, snippetData) => {
  const snippetTitleSpacesReplaced = snippetData.title.replace(' ', '_')

  // Append nav link
  const navLink = document.createElement('a')
  navLink.href = `#${snippetTitleSpacesReplaced}`
  navLink.className = 'link nav-link'
  navLink.textContent = snippetData.title
  const li = document.createElement('li')
  li.className = 'mb2'
  li.appendChild(navLink)
  navLinkList.appendChild(li)

  // Append snippet
  const section = document.createElement('section')
  const header = document.createElement('header')
  const linkToTop = document.createElement('a')
  const title = document.createElement('h2')
  const description = document.createElement('p')
  const pre = document.createElement('pre')
  const code = document.createElement('code')

  section.className = 'main-section'
  section.id = snippetTitleSpacesReplaced

  linkToTop.href = '#'
  title.textContent = snippetData.title
  linkToTop.appendChild(title)
  header.appendChild(linkToTop)
  section.appendChild(header)

  pre.className = 'pre-wrap prettyprint'
  code.textContent = snippetData.codeBlock
  pre.appendChild(code)
  section.appendChild(pre)

  description.textContent = snippetData.description
  section.appendChild(description)

  elem.appendChild(section)
}

window.onload = async () => {
  const navLinkList = document.getElementById('nav-links')
  const mainDoc = document.getElementById('main-doc')
  const snippets = await fetchSnippets()
  snippets.forEach(snippetData => {
    appendSnippet(navLinkList, mainDoc, snippetData)
  })
}
