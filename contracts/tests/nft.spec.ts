import { NearAccount, Worker } from 'near-workspaces'
import { randomUUID } from 'crypto'
import { after, describe, it } from 'mocha'

describe('NFT', () => {
  let context = {} as {
    worker: Worker
    accounts: Record<string, NearAccount>
    token_ids: Record<string, string>
  }

  it('Initilaize and deploy contract', async () => {
    // Init the worker and start a Sandbox server
    const worker = await Worker.init()

    // Prepare sandbox for tests, create accounts, deploy contracts, etc.
    const root = worker.rootAccount

    // Deploy the contract.
    const contract = await root.devDeploy('./build/nft.wasm')

    await contract.call(contract, 'init', {
      owner_id: root.accountId
    })

    // Test users
    const alice = await root.createSubAccount('ali')
    const bob = await root.createSubAccount('bob')

    // Save state for test runs
    context.worker = worker
    context.accounts = { root, contract, alice, bob }
    context.token_ids = {}
  })

  it('Mint Component NFT', async () => {
    const { contract, alice } = context.accounts
    const token_id = randomUUID()

    await alice.call(contract, 'nft_mint', {
      token_id,
      metadata: {
        title: 'Component NFT',
        description: 'This is the Component NFT'
      },
      receiver_id: alice.accountId,
      perpetual_royalties: {},
      perpetual_dependencies: [],
    }, {
      attachedDeposit: '0.1'
    })

    const token = await contract.view('nft_token', { token_id })

    console.log(token)

    const payout = await contract.view('nft_payout', {
      token_id,
      balance: 1,
      max_len_payout: 10
    })

    console.log(payout)

    context.token_ids.head = token['token_id']
  })

  it('Mint Composed NFT', async t => {
    const { contract, bob } = context.accounts
    const { head: head_token_id } = context.token_ids

    const token_id = randomUUID()

    await bob.call(contract, 'nft_mint', {
      token_id,
      metadata: {
        title: 'Composed NFT',
        description: 'This is the Composed NFT'
      },
      receiver_id: bob.accountId,
      perpetual_royalties: {},
      perpetual_dependencies: [
        [contract.accountId, head_token_id]
      ],
    }, {
      attachedDeposit: '0.1'
    })

    const token = await contract.view('nft_token', { token_id })

    console.log(token)

    const payout = await contract.view('nft_payout', {
      token_id,
      balance: 1,
      max_len_payout: 10
    })

    console.log(payout)

    context.token_ids.composed = token['token_id']
  })

  after(async () => {
    await context.worker.tearDown().catch(error => {
      console.log('Failed to tear down the worker:', error)
    })
  })
})
