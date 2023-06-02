import Link from 'next/link'
import styles from './category.module.scss'

type Props = {
  category: string
  resultCategory: Record<string, string>[]
}

export default function Category({ category, resultCategory }: Props) {
  return (
    <div className={styles.grid}>
      <section className={styles.list}>
        {resultCategory.map((el, i: number) => {
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
  )
}
