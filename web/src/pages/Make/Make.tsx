import classNames from 'classnames'
import * as htmlToImage from 'html-to-image'
import { connect, keyStores } from 'near-api-js'
import { KeyPairEd25519 } from 'near-api-js/lib/utils'
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getIPFSURL } from '../../common/ipfs'
import nftStorage from '../../common/nft-storage'
import { dataURLtoFile } from '../../common/utils'
import Box from '../../components/Box'
import Flex from '../../components/Flex'
import Navbar from '../../components/Navbar/Navbar'
import { useNear } from '../../context/Near'
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
  const { accountId } = useNear()

  const navigate = useNavigate()
  const outputRef = useRef<HTMLDivElement>(null)
  const dragItemRef = useRef<HTMLImageElement>()

  const [minting, setMinting] = useState(false)
  const [perpetualRoyalties, setPerpetualRoyalties] = useState<
    Record<string, number>
  >({})

  const [perpetualDeps, setPerpetualDeps] = useState<[string, number][]>([])

  const addComponent = async (token_id: string) => {
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
      contractId: CONTRACT_ID,
      methodName: 'nft_token',
      args: { token_id },
    })

    setPerpetualDeps(deps => [...deps, [CONTRACT_ID, result.token_id]])
    setPerpetualRoyalties(royalty => {
      for (const [id, val] of Object.entries<number>(result.royalty)) {
        if (id in royalty) {
          royalty[id] += val
        } else {
          royalty[id] = val
        }
      }

      return royalty
    })
  }

  const mint = async () => {
    if (!accountId) return

    setMinting(true)

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

    const dataURL = await htmlToImage.toPng(outputRef.current!)
    const file = dataURLtoFile(dataURL, `crafted.png`)

    const cid = await nftStorage.storeBlob(file)

    console.log('IPFS', cid)

    const token_id = crypto.randomUUID()
    const result = await account.functionCall({
      contractId: CONTRACT_ID,
      methodName: 'nft_mint',
      args: {
        token_id,
        metadata: {
          title: 'Artco Composed NFT',
          description: 'Artco Composed NFT',
          media: `ipfs://${cid}`,
        },
        receiver_id: accountId,
        perpetual_royalties: perpetualRoyalties,
        perpetual_dependencies: perpetualDeps,
      },
      gas: '300000000000000',
      attachedDeposit: '1000000000000000000000000',
    })

    console.log(result)

    navigate(`/view/${CONTRACT_ID}/${token_id}`)
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <Flex>
        <Box grow={1} basis={1} className={styles.build}>
          <h1>Make Your Own NFT</h1>
          <div className={styles.craft}>
            <h3>Head</h3>
            <Flex spacing={15}>
              {PRE_MINTED.HEAD.map(nft => (
                <img
                  key={nft.token_id}
                  className={styles.component}
                  src={getIPFSURL(nft.media)}
                  onClick={() => {
                    const element = document.createElement('img')
                    element.src = getIPFSURL(nft.media)
                    element.id = nft.token_id
                    outputRef.current?.appendChild(element)

                    addComponent(nft.token_id)
                  }}
                />
              ))}
            </Flex>
            <h3>Body</h3>
            <Flex spacing={15}>
              {PRE_MINTED.BODY.map(nft => (
                <img
                  key={nft.token_id}
                  className={styles.component}
                  src={getIPFSURL(nft.media)}
                  onClick={() => {
                    const element = document.createElement('img')
                    element.src = getIPFSURL(nft.media)
                    element.id = nft.token_id
                    outputRef.current?.appendChild(element)

                    addComponent(nft.token_id)
                  }}
                />
              ))}
            </Flex>
            <h3>Pants</h3>
            <Flex spacing={15}>
              {PRE_MINTED.PANTS.map(nft => (
                <img
                  key={nft.token_id}
                  className={styles.component}
                  src={getIPFSURL(nft.media)}
                  onClick={() => {
                    const element = document.createElement('img')
                    element.src = getIPFSURL(nft.media)
                    element.id = nft.token_id
                    outputRef.current?.appendChild(element)

                    addComponent(nft.token_id)
                  }}
                />
              ))}
            </Flex>
            <h3>Shoes</h3>
            <Flex spacing={15}>
              {PRE_MINTED.SHOES.map(nft => (
                <img
                  key={nft.token_id}
                  className={styles.component}
                  src={getIPFSURL(nft.media)}
                  onClick={() => {
                    const element = document.createElement('img')
                    element.src = getIPFSURL(nft.media)
                    element.id = nft.token_id
                    outputRef.current?.appendChild(element)

                    addComponent(nft.token_id)
                  }}
                />
              ))}
            </Flex>
          </div>
        </Box>
        <Box grow={1} basis={1} className={styles.show}>
          <Box className={styles.border}>
            {useMemo(
              () => (
                <Box
                  ref={outputRef}
                  className={styles.output}
                  onMouseDown={event => {
                    event.preventDefault()
                    event.stopPropagation()

                    if (event.target instanceof HTMLImageElement) {
                      dragItemRef.current = event.target

                      const currentZIndex = Number(
                        dragItemRef.current.style.zIndex,
                      )
                      dragItemRef.current.style.zIndex = `${currentZIndex + 1}`
                    }
                  }}
                  onMouseMove={event => {
                    const dragItem = dragItemRef.current

                    if (dragItem) {
                      const currentX = Number(
                        dragItem.style.left.replace('px', ''),
                      )
                      const currentY = Number(
                        dragItem.style.top.replace('px', ''),
                      )

                      dragItem.style.left = `${currentX + event.movementX}px`
                      dragItem.style.top = `${currentY + event.movementY}px`
                    }
                  }}
                  onMouseLeave={() => {
                    dragItemRef.current = undefined
                  }}
                  onMouseUp={() => {
                    dragItemRef.current = undefined
                  }}
                />
              ),
              [],
            )}
          </Box>
          <Box mt={20}>
            {perpetualDeps.map(dep => (
              <div key={dep[1]}>
                {dep[0]}: {dep[1]}
              </div>
            ))}
          </Box>
          <Box mt={20}>{JSON.stringify(perpetualRoyalties, null, 2)}</Box>
          <Flex mt={20}>
            <div
              className={classNames(styles.mint, minting && styles.minting)}
              onClick={mint}
            >
              {minting ? 'Minting ...' : 'Mint now'}
            </div>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}

export default Make
