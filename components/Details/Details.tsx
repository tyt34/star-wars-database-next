import styles from './details.module.scss'

type Props = {
  resultId: Record<string, string>
}

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

export default function Detail({ resultId }: Props) {
  return (
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
  )
}
