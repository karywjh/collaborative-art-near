import classNames from 'classnames'
import { connect, keyStores } from 'near-api-js'
import { KeyPairEd25519 } from 'near-api-js/lib/utils'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getIPFSURL } from '../../common/ipfs'
import Flex from '../../components/Flex'
import styles from './View.module.scss'

export default () => {
  const { contractId, tokenId } = useParams()

  const [data, setData] = useState<any>()
  const [listModal, setListModal] = useState(false)

  useEffect(() => {
    const load = async () => {
      const keyStore = new keyStores.BrowserLocalStorageKeyStore()
      const keyPair = new KeyPairEd25519(
        '2RFm73EcZoZMLrxd6RBR6mqYopLZNEiRXpYFLji6WxcSf8VP3QqsFVnJmzmYbxLq9ePgWoDHF1Xqw5xEkQuvNMDB',
      )

      keyStore.setKey('testnet', 'fe-deploy.testnet', keyPair)

      const connectionConfig = {
        networkId: 'testnet',
        keyStore,
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
      }

      const nearConnection = await connect(connectionConfig)
      const account = await nearConnection.account('fe-deploy.testnet')
      const result = await account.viewFunctionV2({
        contractId: contractId!,
        methodName: 'nft_token',
        args: { token_id: tokenId! },
      })

      setData(result)
    }

    load()
  }, [contractId, tokenId])

  return (
    <div className={styles.page}>
      {listModal && (
        <div className={styles.listModal}>
          <div className={styles.dialog}>
            <h3>List on Market</h3>
            <input placeholder="Price" />
            <Flex spacing={15}>
              <div className={styles.btn} onClick={() => setListModal(false)}>
                Cancel
              </div>
              <div className={classNames(styles.btn, styles.confirm)}>
                Confirm
              </div>
            </Flex>
          </div>
        </div>
      )}
      <h1>Minted Craft</h1>
      {data && (
        <>
          <img className={styles.image} src={getIPFSURL(data.metadata.media)} />
          <div>
            <h3>Dependencies</h3>
            <ul>
              {data.dependency.map((dep: [string, string], index: number) => (
                <li key={index}>
                  <Link to={`/view/${dep[0]}/${dep[1]}`}>
                    {dep[0]}: {dep[1]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Royalties</h3>
            {Object.entries<number>(data.royalty).map(([id, val]) => (
              <div key={id}>
                {id}: {val / 100}%
              </div>
            ))}
          </div>
          <Flex mt={50}>
            <div className={styles.list} onClick={() => setListModal(true)}>
              List on Market
            </div>
          </Flex>
        </>
      )}
    </div>
  )
}
