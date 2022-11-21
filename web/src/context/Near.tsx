import React, { PropsWithChildren } from 'react'
import { useContext, useEffect, useState } from 'react'
import {
  setupWalletSelector,
  WalletSelector,
  AccountState,
} from '@near-wallet-selector/core'
import { map, distinctUntilChanged } from 'rxjs'
import { setupNearWallet } from '@near-wallet-selector/near-wallet'
import { setupHereWallet } from '@near-wallet-selector/here-wallet'
import { setupSender } from '@near-wallet-selector/sender'
import { setupMathWallet } from '@near-wallet-selector/math-wallet'
import { setupNightly } from '@near-wallet-selector/nightly'
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet'
import { setupNightlyConnect } from '@near-wallet-selector/nightly-connect'
import { setupNearFi } from '@near-wallet-selector/nearfi'
import { setupWalletConnect } from '@near-wallet-selector/wallet-connect'
import { setupCoin98Wallet } from '@near-wallet-selector/coin98-wallet'
import { setupModal, WalletSelectorModal } from '@near-wallet-selector/modal-ui'

export interface LoginContext {
  modal?: WalletSelectorModal
  accountId?: string
  signIn: () => void
  signOut: () => void
}

const context = React.createContext({} as LoginContext)
export const useNear = () => useContext(context)

export const NearProvider = ({ children }: PropsWithChildren) => {
  const [selector, setSelector] = useState<WalletSelector>()
  const [modal, setModal] = useState<WalletSelectorModal>()
  const [wallet, setWallet] = useState()
  const [account, setAccount] = useState<AccountState>()
  const [accounts, setAccounts] = useState<Array<AccountState>>()

  useEffect(() => {
    setupWalletSelector({
      network: 'testnet',
      modules: [
        setupNearWallet(),
        setupSender(),
        setupMathWallet(),
        setupNightly(),
        setupMeteorWallet(),
        setupHereWallet(),
        setupCoin98Wallet(),
        setupNearFi(),
        setupWalletConnect({
          projectId: 'c4f79cc...',
          metadata: {
            name: 'NEAR Wallet Selector',
            description: 'Example dApp used by NEAR Wallet Selector',
            url: 'https://github.com/near/wallet-selector',
            icons: ['https://avatars.githubusercontent.com/u/37784886'],
          },
        }),
        setupNightlyConnect({
          url: 'wss://relay.nightly.app/app',
          appMetadata: {
            additionalInfo: '',
            application: 'NEAR Wallet Selector',
            description: 'Example dApp used by NEAR Wallet Selector',
            icon: 'https://near.org/wp-content/uploads/2020/09/cropped-favicon-192x192.png',
          },
        }),
      ],
    }).then(setSelector)
  }, [])

  useEffect(() => {
    selector &&
      setModal(
        setupModal(selector, {
          contractId: 'test.testnet',
        }),
      )
  }, [selector])

  useEffect(() => {
    if (!selector) {
      return
    }

    const subscription = selector.store.observable
      .pipe(
        map(state => state.accounts),
        distinctUntilChanged(),
      )
      .subscribe(nextAccounts => {
        console.log('Accounts Update', nextAccounts)

        setAccounts(nextAccounts)
      })

    return () => subscription.unsubscribe()
  }, [selector])

  const accountId = accounts?.find(account => account.active)?.accountId
  console.log('accountId', accountId)

  const signIn = () => {
    modal && modal.show()
  }

  const signOut = async () => {
    if (!selector) {
      return
    }
    const wallet = await selector.wallet()

    wallet.signOut().catch(err => {
      console.log('Failed to sign out: ', err)
    })
  }

  return (
    <context.Provider
      value={{
        modal,
        accountId,
        signIn,
        signOut,
      }}
    >
      {children}
    </context.Provider>
  )
}
