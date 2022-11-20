import { NearAccount, Worker } from 'near-workspaces'
import anyTest, { TestFn } from 'ava'

const test = anyTest as TestFn<{
  worker: Worker
  accounts: Record<string, NearAccount>
}>

test.beforeEach(async t => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init()

  // Prepare sandbox for tests, create accounts, deploy contracts, etc.
  const root = worker.rootAccount

  // Deploy the counter contract.
  const nft = await root.devDeploy('./build/nft.wasm', {
    args: {
      owner_id: root.accountId,
    },
  })

  // Test users
  const ali = await root.createSubAccount('ali')
  const bob = await root.createSubAccount('bob')

  // Save state for test runs
  t.context.worker = worker
  t.context.accounts = { root, nft, ali, bob }
})

// If the environment is reused, use test.after to replace test.afterEach
test.afterEach(async t => {
  await t.context.worker.tearDown().catch(error => {
    console.log('Failed to tear down the worker:', error)
  })
})

test('Mint first NFT', async t => {
  const { nft, ali } = t.context.accounts
  const result = await ali.call(nft, 'nft_mint', {})

  console.log(result)
  //t.is(result, 0)
})
