import { useNavigate } from 'react-router-dom'
import { useNear } from '../../context/Near'
import Flex from '../Flex'
import styles from './Navbar.module.scss'

const NavBar = () => {
  const navigate = useNavigate()

  const { accountId, signIn, signOut } = useNear()

  return (
    <div className={styles.navbar}>
      <Flex direction="row" justify="right" align="center" spacing={15}>
        {!accountId && (
          <Flex
            direction="row"
            justify="center"
            align="center"
            onClick={() => signIn()}
            className={styles.button}
          >
            Sign In
          </Flex>
        )}
        {accountId && (
          <>
            <Flex
              className={styles.avatar}
              onClick={() => navigate(`/users/${accountId}`)}
            />

            <Flex
              onClick={() => signOut()}
              className={styles.button}
              direction="row"
              justify="center"
              align="center"
            >
              Sign Out
            </Flex>
          </>
        )}
      </Flex>
    </div>
  )
}

export default NavBar
