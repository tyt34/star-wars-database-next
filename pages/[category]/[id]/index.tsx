import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import Layout from '../../../components/Layout/layout'
import { arrCategory } from '../../../utils/constants'
import { getData } from '../../../utils/start-wars'
import { IDataStarWars } from '../../../utils/types'
import styles from './index.module.scss'

const fieldsMap: Record<string, string> = {
  name: 'Name:',
  mass: 'Mass:',
  gender: 'Gender:',
  eye_color: 'Eye color:',
  gravity: 'Gravity:',
  orbital_period: 'Orbital period:',
  terrain: 'Terrain:',
  passengers: 'Passengers:',
  starship_class: 'Starship class:',
  max_atmosphering_speed: 'Max atmosphering speed:'
}

type Props = {
  category: string
  resultCategory: any
  resultId: any
}

export default function DynamicPage({
  category,
  resultCategory,
  resultId
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
        <section className={styles.details}>
          {resultId.detail === 'Not found' ? (
            <p className={styles.detail}>Информация отсутствует</p>
          ) : (
            Object.keys(resultId).map((key: string) => {
              return (
                <p
                  key={key}
                  className={styles.detail}
                >
                  {fieldsMap[key] ? (
                    <>
                      {fieldsMap[key]} {resultId[key]}
                    </>
                  ) : null}
                </p>
              )
            })
          )}
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
  console.log({ category, id })
  console.log({ resultId })

  return {
    props: {
      category,
      id,
      resultCategory: resultCategory.results,
      resultId: resultId
    }
  }
}
