import styles from './help.module.css'
import Image from 'next/image'

export default function Help(props) {
  return (
    <>
      <div className={styles.helpContainer}>
        <h1 className={styles.titleContainer}>{props.title}</h1>
        <p className={styles.helpContent}>{props.children}</p>
      </div>
    </>
  )
}
