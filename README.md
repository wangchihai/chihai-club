This

editorconfigis




import React, { useState, useEffect, useRef } from 'react'

const activeClassName = 'text-blue-500 dark:text-cyan-500'

const Headings = ({ headings, activeId }) => (
  <ul className="list-none">
    {headings.map((heading) => (
      <li key={heading.id}>
        <a
          className={`no-underline hover:underline ${
            heading.id === activeId ? activeClassName : ''
          }`}
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault()
            document.querySelector(`#${heading.id}`).scrollIntoView({
              behavior: 'smooth',
            })
          }}
        >
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="list-none">
            {heading.items.map((child) => (
              <li key={child.id}>
                <a
                  className={`no-underline hover:underline ${
                    child.id === activeId ? activeClassName : ''
                  }`}
                  href={`#${child.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(`#${child.id}`).scrollIntoView({
                      behavior: 'smooth',
                    })
                  }}
                >
                  {child.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
)

const useHeadingsData = () => {
const [nestedHeadings, setNestedHeadings] = useState([])

useEffect(() => {
const headingElements = Array.from(
document.querySelectorAll('article h2, article h3')
)

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements)
    setNestedHeadings(newNestedHeadings)
}, [])

return { nestedHeadings }
}

const getNestedHeadings = (headingElements) => {
const nestedHeadings = []

headingElements.forEach((heading, index) => {
const { innerText: title, id } = heading

    if (heading.nodeName === 'H2') {
      nestedHeadings.push({ id, title, items: [] })
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      })
    }
})

return nestedHeadings
}

const useIntersectionObserver = (setActiveId) => {
const headingElementsRef = useRef({})
useEffect(() => {
const callback = (headings) => {
headingElementsRef.current = headings.reduce((map, headingElement) => {
map[headingElement.target.id] = headingElement
return map
}, headingElementsRef.current)

      // Get all headings that are currently visible on the page
      const visibleHeadings = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id)

      // If there is only one visible heading, this is our "active" heading
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        )

        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      root: document.querySelector('iframe'),
      rootMargin: '500px',
    })

    const headingElements = Array.from(document.querySelectorAll('h2, h3'))

    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
}, [setActiveId])
}

const TableOfContents = () => {
const [activeId, setActiveId] = useState()
const { nestedHeadings } = useHeadingsData()
useIntersectionObserver(setActiveId)

return (
<nav
className="fixed top-1/4 ml-[768px] mt-8 hidden w-[150px] text-sm lg:flex xl:w-[300px]"
aria-label="Table of contents"
>
<Headings headings={nestedHeadings} activeId={activeId} />
</nav>
)
}

export default TableOfContents


a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/[slug].tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
