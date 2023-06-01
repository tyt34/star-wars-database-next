import Link from 'next/link'
import Layout from '../components/Layout/layout'
import styles from './index.module.scss'
import { arrCategory } from '../utils/constants'

export default function Home() {
  return <Layout></Layout>
}

// export async function getStaticPaths() {
//   const arrCategory = ['things', 'planets', 'starships']
//   const paths = arrCategory.reduce((acc, el) => {
//     console.log({ el })
//     const newObj = {
//       params: {
//         id: el
//       }
//     }
//     return [...acc, newObj]
//   }, [])
//   return {
//     paths,
//     fallback: false
//   }
// }

// export async function getStaticProps({ params }) {
//   const postData: PostHtmlType = await getPostData(params.id)
//   console.log({ postData })
//   return {
//     props: {
//       postData
//     }
//   }
// }
