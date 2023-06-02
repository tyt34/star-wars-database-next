import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/layout'
import { arrCategory } from '../../utils/constants'
import { getData } from '../../utils/start-wars'
import Link from 'next/link'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { IDataStarWars } from '../../utils/types'
import styles from './index.module.scss'

type Props = {
  category: string
  resultCategory: any
}

export default function DynamicPage({
  category,
  resultCategory
}: Props) {
  return (
    <Layout>
      <div className={styles.grid}>
        <section className={styles.list}>
          {resultCategory?.map((el: { name: string }, i: number) => {
            return (
              <Link
                href={`/${category}/${i + 1}`}
                key={el.name}
                className={styles.link}
              >
                <div
                  key={el.name}
                  className={styles.element}
                >
                  {el.name}
                </div>
              </Link>
            )
          })}
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = arrCategory.reduce(
    (
      acc: {
        params: {
          category: string
        }
      }[],
      item
    ) => {
      const newpaths = []
      for (let i = 1; i < 11; i++) {
        const path = {
          params: {
            category: item
          }
        }
        newpaths.push(path)
      }
      return [...acc, ...newpaths]
    },
    []
  )

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context
  const category = params!.category
  const resultCategory = await getData(category as IDataStarWars)

  return {
    props: {
      category,
      resultCategory: resultCategory.results
    }
  }

  /**
   * если вернуть не то, то будет 404 страница
   */
  // return {
  //   asdasd: true
  // }
}
