import React from 'react'
import { arrCategory } from '../../utils/constants'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { getData } from '../../utils/api'
import { IDataStarWars } from '../../utils/types'
import Category from '../../components/Category/Category'
import Layout from '../../components/Layout/layout'
import styles from './index.module.scss'

type Props = {
  category: string
  resultCategory: Record<string, string>[]
}

type PathType = {
  params: {
    category: string
  }
}

export default function CategoryPage({
  category,
  resultCategory
}: Props) {
  return (
    <Layout>
      <div className={styles.grid}>
        <Category
          category={category}
          resultCategory={resultCategory}
        />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = arrCategory.reduce((acc: PathType[], item) => {
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
  }, [])

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
}
