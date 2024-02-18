import { test, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import { app } from '../app'
import request from 'supertest'
import { knex } from '../database'

describe('Transactions routes', () => {
  // executa uma única vez antes que todos os testes executem
  beforeAll(async () => {
    await app.ready()
  })

  // executa uma única vez depois que todos os testes são executados
  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    await knex.raw('DROP TABLE IF EXISTS transactions;')
    await knex.raw(`CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      amount DECIMAL NOT NULL,
      session_id TEXT NOT NULL,
      title TEXT NOT NULL);`)
  })

  test('o usuário consegue criar uma nova transação', async () => {
    // fazer a chamada http para criar uma nova transação
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 4500,
        type: 'credit',
      })
      .expect(201)
  })

  test('o usuário consegue listar todas as suas transações', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 4500,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 4500,
      }),
    ])
  })

  test('o usuário consegue listar uma transação específica', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 4500,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getSpecificTransaction = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getSpecificTransaction.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 4500,
      }),
    )
  })

  test('o usuário consegue listar o seu resumo (saldo atual)', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2500,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body).toEqual({
      ammount: 2500,
    })
  })
})
