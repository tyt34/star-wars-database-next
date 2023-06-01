import React, { ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import styles from './layout.module.css'
import { arrCategory } from '../../utils/constants'

const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

type LayoutProps = {
  children?: ReactNode
  home?: boolean
}

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div className={styles.main}>
      <Head>
        <title>Star-Wars-Database</title>
      </Head>
      <Link
        href="/"
        className={styles.link}
      >
        <h2>Star Wars Database</h2>
      </Link>
      <p>Category list: </p>
      <nav className={styles.nav}>
        {arrCategory.map((namePage) => {
          return (
            <Link
              href={`/${namePage}`}
              className={styles.link}
              key={namePage}
            >
              <p>{namePage}</p>
            </Link>
          )
        })}
      </nav>
      {children}
    </div>
  )
}
