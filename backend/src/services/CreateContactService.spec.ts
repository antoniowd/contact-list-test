import db from '../database/connection'
import { promises as fs } from 'fs'
import path from 'path'
import CreateContactService from './CreateContactService'

describe('CreateUser', () => {

  beforeAll(async () => {
    await db.migrate.latest()
  })
  
  afterAll(async () => {
    await db.destroy()
    await fs.unlink(path.resolve(__dirname, '..', 'database', 'database.test.sqlite'))
  })

  it('Should be able to create a contact', async () => {
    const contact = await CreateContactService({
      name: 'John Doe',
      email: 'john@doe.com',
      address: 'Main street',
      phone: '108377495',
    })

    expect(contact.name).toBe('John Doe')
    expect(contact.email).toBe('john@doe.com')
    expect(contact.address).toBe('Main street')
    expect(contact.phone).toBe('108377495')
  })

  it("Shouldn't be able to create two contacts with the same email", async () => {
    await CreateContactService({
      name: 'John Doe',
      email: 'john@example.com',
      address: 'Main street',
      phone: '108377495',
    })

    await expect(
      CreateContactService({
        name: 'John Doe 2',
        email: 'john@example.com',
        address: 'Main street 2',
        phone: '108377495',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})