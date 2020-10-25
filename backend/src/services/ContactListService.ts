import db from "../database/connection";

interface Contact {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export default async function ContactListService(): Promise<Contact[]> {
  return db('contacts')
}
