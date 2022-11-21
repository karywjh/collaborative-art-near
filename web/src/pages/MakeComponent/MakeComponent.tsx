import { connect, keyStores } from 'near-api-js'
import { KeyPairEd25519 } from 'near-api-js/lib/utils'
import { useEffect, useState } from 'react'
import nftStorage from '../../common/nft-storage'
import { useNear } from '../../context/Near'
import styles from './MakeComponent.module.scss'

const MakeComponent = () => {
  const { accountId } = useNear()

  const [contractId, setContractId] = useState('')
  const [royaltyJSON, setRoyaltyJSON] = useState('{}')
  const [file, setFile] = useState<File>()
  const [imageSrc, setImageSrc] = useState<string>()

  useEffect(() => {
    if (file) {
      const reader = new FileReader()

      reader.addEventListener(
        'load',
        () => {
          if (reader.result) {
            setImageSrc(reader.result.toString())
          }
        },
        false,
      )

      reader.readAsDataURL(file)
    }
  }, [file])

  const publish = async () => {
    if (!accountId || !file) return

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

    let contractId_ = contractId

    if (contractId_.length === 0) {
      const arrayBuffer = await fetch('nft.wasm').then(res => res.arrayBuffer())
      const code = new Uint8Array(arrayBuffer)

      const newAccountId = `artco-${Math.random()
        .toString(36)
        .slice(2, 7)}.testnet`

      const newAccountKeyPair = KeyPairEd25519.fromRandom()
      const newAccount = await nearConnection.createAccount(
        newAccountId,
        newAccountKeyPair.publicKey,
      )

      keyStore.setKey('testnet', newAccountId, newAccountKeyPair)

      console.log(newAccount)

      const result = await newAccount.deployContract(code)

      console.log(result)

      const execResult = await newAccount.functionCall({
        contractId: newAccountId,
        methodName: 'init',
        args: {},
      })

      console.log(execResult)

      contractId_ = newAccountId
    }

    const account = await nearConnection.account('fe-deploy.testnet')
    const token_id = crypto.randomUUID()

    const cid = await nftStorage.storeBlob(file)

    console.log('IPFS', cid)

    const result = await account.functionCall({
      contractId: contractId_,
      methodName: 'nft_mint',
      args: {
        token_id,
        metadata: {
          title: 'Artco Component NFT',
          description: 'Artco Component NFT',
          media: `ipfs://${cid}`,
        },
        receiver_id: accountId,
        perpetual_royalties: JSON.parse(royaltyJSON),
        perpetual_dependencies: [],
      },
      gas: '300000000000000',
      attachedDeposit: '1000000000000000000000000',
    })

    console.log(result)
  }

  return (
    <div className={styles.page}>
      <h1>Make Component</h1>
      <input
        type="file"
        accept=".svg"
        onChange={event => setFile(event.target.files?.[0])}
      />
      {imageSrc && <img src={imageSrc} />}
      <input
        placeholder="Contract ID"
        value={contractId}
        onChange={event => setContractId(event.target.value)}
      />
      <textarea
        placeholder="Perpetual Royalties (JSON)"
        value={royaltyJSON}
        onChange={event => setRoyaltyJSON(event.target.value)}
      />
      <button onClick={publish}>Deploy</button>
    </div>
  )
}

export default MakeComponent
