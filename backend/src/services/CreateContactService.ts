import db from '../database/connection';

interface Contact {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export default async function CreateContactService(contact: Omit<Contact, 'id'>): Promise<Contact> {

  const contactExists = await db('contacts').where('email', contact.email).first()

  if (contactExists) {
    throw new Error('The contact exists already')
  }

  const insertedContactsId = await db('contacts').insert(contact)
  const [contactId] = insertedContactsId

  return {
    id: contactId,
    ...contact,
  }
}
