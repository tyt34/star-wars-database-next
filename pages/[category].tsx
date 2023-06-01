import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/layout'
import { arrCategory } from '../utils/constants'
import { getData } from '../utils/start-wars'
import Link from 'next/link'

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
  const paths = arrCategory.map((item) => {
    return {
      params: { category: item }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context: any) {
  const { params } = context
  const category = params.category

  const resultCategory = await getData(category)

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
