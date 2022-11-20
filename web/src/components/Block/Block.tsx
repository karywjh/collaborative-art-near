import styles from './Block.module.scss'
import { useState } from 'react'

export interface BlockProps {
  img: string
  creator: string
}

const Block = ({ img, creator }: BlockProps) => {
  const [isHovering, setIsHovering] = useState(false)
  return (
    <div className={styles.block}>
      {isHovering && <div className={styles.creator}>created by {creator}</div>}

      <img
        src={img}
        className={styles.img}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      ></img>
    </div>
  )
}

export default Block
