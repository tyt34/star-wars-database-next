import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import { arrCategory } from '../../utils/constants'

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
      <p className={styles.text}> Category list: </p>
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
