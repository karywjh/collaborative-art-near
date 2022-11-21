import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getIPFSURL } from '../../common/ipfs'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Make.module.scss'

const CONTRACT_ID = 'artco-08vin.testnet'
const PRE_MINTED = {
  HEAD: [
    {
      token_id: '3366488d-0045-4434-b2de-50fe0ec410ad',
      media:
        'ipfs://bafkreifxtukhigvnvlnen76kchcwymk2yijsk427fwovzjmnlhqlpwvhky',
    },
  ],
  BODY: [
    {
      token_id: '51b7cd3f-9313-4298-a73e-b3b3ef97c01d',
      media:
        'ipfs://bafkreiesxbp2vsxacxz23wfkncd5vaxzt3vdntb4m225gpqnt4se4htqji',
    },
    {
      token_id: 'accc4225-0bf0-4b64-b688-e334669f740b',
      media:
        'ipfs://bafkreicl7arhts5sfqoun6wfms2mb2jkungmw2zgzbpxm2rcdx75kjdxoa',
    },
    {
      token_id: 'c4c26424-514b-4f52-85de-d84c89de0f33',
      media:
        'ipfs://bafkreihenezlmmgfyh654y432dsl6bnor3o3jolnxvlymf2k75v6c2fm6y',
    },
  ],
  PANTS: [
    {
      token_id: '745b52b0-1d99-446d-9ecb-b1dec137c741',
      media:
        'ipfs://bafkreiegonyr2yyryw46wqs6wpflwfw363answ2zloz4ngrvlz74cxn5l4',
    },
    {
      token_id: '5b7d4d31-b684-468b-9320-87b27e56dd54',
      media:
        'ipfs://bafkreicoyuozqbhepiwuolzuaixdygtz2optdcdviiog5vqq7xa54rszze',
    },
    {
      token_id: 'b3f43eb8-f6fc-43e9-9351-f627ffade4cf',
      media:
        'ipfs://bafkreih5o5f5j4txrp53he5rkjmmplnaq6pzq2uf5aibe2veprg44yxgfq',
    },
  ],
  SHOES: [
    {
      token_id: '55f8746f-586b-46a2-a67a-c956a493e21e',
      media:
        'ipfs://bafkreie4qw24uuakgmlfvygvlleeuxp5xviw3u6bgocs257qa567wby3mi',
    },
    {
      token_id: '048cdb2a-5ecc-4de4-95e6-4328996c07e5',
      media:
        'ipfs://bafkreidok2bvhz4luenltink5vglhvxpmfmj7mzc6rkryjyegq5wf32fyq',
    },
    {
      token_id: '922696f2-8193-47ee-bbc2-f1d0a571eebb',
      media:
        'ipfs://bafkreihnlhwdcsqgqyn3aa3ayxboyue5xcapiz3ihjzztcpcw6twnpzdiq',
    },
  ],
}

const Make = () => {
  const navigate = useNavigate()
  const outputRef = useRef(null)

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.build}>
        <h1>Make Your Own NFT</h1>
        <div className={styles.craft}>
          <h3>Head</h3>
          <div className={styles.row}>
            {PRE_MINTED.HEAD.map(nft => (
              <img
                key={nft.token_id}
                className={styles.component}
                src={getIPFSURL(nft.media)}
              />
            ))}
          </div>
          <h3>Body</h3>
          <div className={styles.row}>
            {PRE_MINTED.BODY.map(nft => (
              <img
                key={nft.token_id}
                className={styles.component}
                src={getIPFSURL(nft.media)}
              />
            ))}
          </div>
          <h3>Pants</h3>
          <div className={styles.row}>
            {PRE_MINTED.PANTS.map(nft => (
              <img
                key={nft.token_id}
                className={styles.component}
                src={getIPFSURL(nft.media)}
              />
            ))}
          </div>
          <h3>Shoes</h3>
          <div className={styles.row}>
            {PRE_MINTED.SHOES.map(nft => (
              <img
                key={nft.token_id}
                className={styles.component}
                src={getIPFSURL(nft.media)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.show}>
        <div ref={outputRef} className={styles.output}></div>
      </div>
    </div>
  )
}

export default Make
