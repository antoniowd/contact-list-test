import db from '../database/connection'
import { promises as fs } from 'fs'
import path from 'path'
import CreateContactService from './CreateContactService'
import UpdateContactService from './UpdateContactService'

describe('CreateUser', () => {

  beforeAll(async () => {
    await db.migrate.latest()
  })
  
  afterAll(async () => {
    await db.destroy()
    await fs.unlink(path.resolve(__dirname, '..', 'database', 'database.test.sqlite'))
  })

  it('Should be able to update a contact', async () => {

    const contact = await CreateContactService({
      name: 'John Doe',
      email: 'john1@doe.com',
      address: 'Main street',
      phone: '108377495',
    })

    const updateContact = await UpdateContactService({
      id: contact.id,
      name: 'John Doe 2',
      email: 'john1@example.com',
      address: '1st Main street',
      phone: '5522556',
    })

    expect(updateContact.name).toBe('John Doe 2')
    expect(updateContact.email).toBe('john1@example.com')
    expect(updateContact.address).toBe('1st Main street')
    expect(updateContact.phone).toBe('5522556')
  })

  it("Shouldn't be able to update a contact with an existing email", async () => {
    await CreateContactService({
      name: 'John Doe',
      email: 'john13@example.com',
      address: 'Main street',
      phone: '108377495',
    })

    const contact = await CreateContactService({
      name: 'John Doe',
      email: 'john12@example.com',
      address: 'Main street',
      phone: '108377495',
    })

    await expect(
      UpdateContactService({
        id: contact.id,
        email: 'john13@example.com',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})