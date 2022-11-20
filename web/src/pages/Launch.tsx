import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Launch.module.scss'

import glasses1 from '../../assets/glasses1.svg'
import glasses2 from '../../assets/glasses2.svg'
import glasses3 from '../../assets/glasses3.svg'
import body1 from '../../assets/body1.svg'
import body2 from '../../assets/body2.svg'
import body3 from '../../assets/body3.svg'
import pants1 from '../../assets/pants1.svg'
import pants2 from '../../assets/pants2.svg'
import pants3 from '../../assets/pants3.svg'
import shoes1 from '../../assets/shoes1.svg'
import shoes2 from '../../assets/shoes2.svg'
import shoes3 from '../../assets/shoes3.svg'
import person0 from '../../assets/person0.png'
import person1 from '../../assets/person1.png'
import person2 from '../../assets/person2.png'
import person3 from '../../assets/person3.png'
import Block from '../components/Block/Block'

export default () => {
  const navigate = useNavigate()

  const fakeAddrs = [
    '29d...eda',
    '971...e12',
    '7e2...9ea',
    'd9e...3b2',
    '174...437',
    '084...c32',
    'f3b...93b',
    'a34...fa0',
    '4df...cd9',
    'd92...730',
    '61a...99a',
    '74e...a9b',
  ]

  const persons = [person0, person1, person2, person3]
  const [idx, setIdx] = useState(0)
  setTimeout(() => {
    setIdx((idx + 1) % 4)
  }, 1500)

  return (
    <div className={styles.page}>
      <div className={styles.creations}>
        <div className={styles.glasses}>
          <Block img={glasses1} creator={fakeAddrs[0]}></Block>
          <Block img={glasses2} creator={fakeAddrs[1]}></Block>
          <Block img={glasses3} creator={fakeAddrs[2]}></Block>
        </div>
        <div className={styles.body}>
          <Block img={body1} creator={fakeAddrs[3]}></Block>
          <Block img={body2} creator={fakeAddrs[4]}></Block>
          <Block img={body3} creator={fakeAddrs[5]}></Block>
        </div>
        <div className={styles.pants}>
          <Block img={pants1} creator={fakeAddrs[6]}></Block>
          <Block img={pants2} creator={fakeAddrs[7]}></Block>
          <Block img={pants3} creator={fakeAddrs[8]}></Block>
        </div>

        <div className={styles.shoes}>
          <Block img={shoes1} creator={fakeAddrs[9]}></Block>
          <Block img={shoes2} creator={fakeAddrs[10]}></Block>
          <Block img={shoes3} creator={fakeAddrs[11]}></Block>
        </div>
      </div>

      <div className={styles.nft}>
        <div className={styles.heading}>NFT Blocks</div>
        <div className={styles.subheading}>Create, Collaborate, Own</div>
        <img src={persons[idx]} className={styles.person}></img>
        <div className={styles.btn} onClick={() => navigate('/make')}>
          Start Creating
        </div>
      </div>
    </div>
  )
}
