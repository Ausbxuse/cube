import styles from './info.module.css'
import Image from 'next/image'

export default function Info(props) {

  return (
    <>
      <div className={styles.infoContainer}>
        <h1>{props.title}</h1>
        <p>{props.children}</p>
      </div>
    </>
  )
}
