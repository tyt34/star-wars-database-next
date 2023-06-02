import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/layout'
import { arrCategory } from '../utils/constants'
import { getData } from '../utils/start-wars'
import Link from 'next/link'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { IDataStarWars } from '../utils/types'

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
      <div className="star__grid">
        <section className="list">
          {resultCategory.map((el: { name: string }, i: number) => {
            return (
              <Link
                href={`/${category}/${i}`}
                key={el.name}
                className="link"
              >
                <div
                  key={el.name}
                  className="list__el"
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
  // const paths = arrCategory.map((item) => {
  //   for (let i=0; i<10; i++) {
  //     console.log(' --> ', i )

  //   }
  //   return {
  //     params: { category: item }
  //   }
  // })

  const paths = arrCategory.reduce(
    (
      acc: {
        params: {
          category: string
          id: string
        }
      }[],
      item
    ) => {
      const newpaths = []
      for (let i = 0; i < 10; i++) {
        console.log(' --> ', i)
        const path = {
          params: {
            category: item,
            id: `${i}`
          }
        }
        newpaths.push(path)
      }
      return [...acc, ...newpaths]
    },
    []
  )
  console.log({ paths, a: paths[0], b: paths.length })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context
  console.log({ context })
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
