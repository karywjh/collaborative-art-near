import { useEffect, useState } from 'react'
import styles from './MakeComponent.module.scss'

const MakeComponent = () => {
  const [tokenAddress, setTokenAddress] = useState('')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [royaltyTRX, setRoyaltyTRX] = useState('')
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

  const publish = async () => {}

  return (
    <div className={styles.page}>
      <h1>Make Component</h1>
      <input
        type="file"
        accept=".png"
        onChange={event => setFile(event.target.files?.[0])}
      />
      {imageSrc && <img src={imageSrc} />}
      <input
        placeholder="tokenAddress"
        value={tokenAddress}
        onChange={event => setTokenAddress(event.target.value)}
      />
      {tokenAddress.length === 0 && (
        <input
          placeholder="name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      )}
      {tokenAddress.length === 0 && (
        <input
          placeholder="symbol"
          value={symbol}
          onChange={event => setSymbol(event.target.value)}
        />
      )}
      <input
        placeholder="royaltyValue (in TRX)"
        value={royaltyTRX}
        onChange={event => setRoyaltyTRX(event.target.value)}
      />
      <button onClick={publish}>Deploy</button>
    </div>
  )
}

export default MakeComponent
