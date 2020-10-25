import db from '../database/connection';

interface Contact {
  id: number;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
}

export default async function UpdateContactService(contact: Contact): Promise<Contact> {

  const contactExists = await db('contacts')
    .where('email', contact.email)
    .where('id', '!=', contact.id)
    .first()

  if (contactExists) {
    throw new Error('The contact exists already')
  }

  await db('contacts')
    .where('id', contact.id)
    .update(contact)

  return db('contacts').where('id', contact.id).first()
}
