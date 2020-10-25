import db from "../database/connection";

export default async function DeleteContactService(id: number): Promise<void> {
  await db('contacts').where('id', id).del()
}
