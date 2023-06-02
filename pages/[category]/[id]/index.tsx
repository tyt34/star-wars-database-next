import React from 'react'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { arrCategory } from '../../../utils/constants'
import { getData } from '../../../utils/api'
import { IDataStarWars } from '../../../utils/types'
import styles from './index.module.scss'
import Category from '../../../components/Category/Category'
import Detail from '../../../components/Details/Details'
import Layout from '../../../components/Layout/layout'

type Props = {
  category: string
  resultCategory: Record<string, string>[]
  resultId: any
}

export default function IdPage({
  category,
  resultCategory,
  resultId
}: Props) {
  return (
    <Layout>
      <div className={styles.grid}>
        <Category
          category={category}
          resultCategory={resultCategory}
        />
        <Detail resultId={resultId} />
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
          id: string
        }
      }[],
      item
    ) => {
      const newpaths = []
      for (let i = 1; i < 11; i++) {
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

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context
  const id = params!.id
  const category = params!.category

  const resultCategory = await getData(category as IDataStarWars)

  const resultId = await getData(
    category as IDataStarWars,
    id as string
  )

  return {
    props: {
      category,
      id,
      resultCategory: resultCategory.results,
      resultId: resultId
    }
  }
}
