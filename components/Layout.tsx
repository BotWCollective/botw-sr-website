import React, { ReactNode } from 'react'
import Head from 'next/head'
import Footer from './Footer'
import Navigation from "./Navigation"

type Props = {
  children?: ReactNode
    title?: string,
    user: string
}

const Layout = ({ children, title = 'This is the default title', user }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Navigation user={user}></Navigation>
    </header>
    {children}
    <Footer></Footer>
  </div>
)

export default Layout
