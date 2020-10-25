import { request, response, Router } from 'express'
import ContactListService from './services/ContactListService';
import CreateContactService from './services/CreateContactService';
import DeleteContactService from './services/DeleteContactService';
import UpdateContactService from './services/UpdateContactService';

const router = Router()

router.get('/', async (request, response) => {
  const contacts = await ContactListService()

  return response.json(contacts)
})

router.post('/', async (request, response) => {
  const { name, email, address, phone } = request.body

  const contact = await CreateContactService({
    name,
    email,
    address,
    phone
  })

  return response.status(201).json(contact)
})

router.put('/:id', async (request, response) => {
  const { name, email, address, phone } = request.body
  const { id } = request.params;

  const contact = await UpdateContactService({
    id: Number(id),
    name,
    email,
    address,
    phone
  })

  return response.json(contact)
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params

  await DeleteContactService(Number(id))

  return response.status(204).send()
})

export default router;