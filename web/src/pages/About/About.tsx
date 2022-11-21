import styles from './About.module.scss'

export default () => {
  return (
    <div className={styles.about}>
      <div className={styles.title}>Art Co.</div>
      <div className={styles.author}>-- by Aego, Kary</div>
      <div className={styles.content}>
        We're redefining how people collaborate to create art.
        <br></br>
        <br></br>
        We are building a new form of NFT, that allows creators to mint building
        blocks or components of a work as an NFT, and enables people to build on
        top of each other's NFT to create a collaborative work. We ensure that
        every NFT gets royalties distributed fairly to every contributor of the
        final work.
        <br></br>
        <br></br>
        Our product brings in more forms of collaboration between creators in
        different fields. Artists collaborate to create a piece of artwork.
        Musicians add a song to it that best fit the artwork. Writers build a
        story around it. There's never an end to creativity.
      </div>
    </div>
  )
}
