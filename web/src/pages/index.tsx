import React, { useState, useEffect, ChangeEvent } from "react"
import { FiUser } from 'react-icons/fi'
import { PageProps, graphql } from "gatsby"
import axios from 'axios'

import '../styles/index.css'

interface Contact {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  editMode: boolean;
}

const api = axios.create({
  baseURL: 'http://localhost:3333'
})

const IndexPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {

    api.get('contacts').then(response => {
      setContacts(response.data)
    })

  }, [])

  const handleChangeInput = (id: number, field: string, value: string) => {
    setContacts(old => old.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: value,
        }
      }

      return item
    }))
  }

  const setEditMode = (id: number, value: boolean) => {

    setContacts(old => old.map(item => {
      if (item.id === id) {
        return {
          ...item,
          editMode: value,
        }
      }

      return item
    }))
  }

  const handleSaveChanges = async (id: number) => {
    const contact = contacts.find(item => item.id === id);
    if (contact) {
      const { name, email, address, phone } = contact;

      await api.put(`contacts/${id}`, {
        name, email, address, phone
      });

      setContacts(old => old.map(item => {
        if (item.id === id) {
          return {
            ...item,
            editMode: false,
          }
        }

        return item
      }))
    }
  }

  const handleRemoveContact = async (id: number) => {
    if (window.confirm('Do you want to remove this contact?')) {
      await api.delete(`contacts/${id}`);
      setContacts(old => old.filter(item => item.id !== id));
    }
  }

  return (
    <>
      <header className="header"></header>

      <main className="container">

        <div className="table-content">
          {
            contacts.map(({ id, name, email, address, phone, editMode }) => (
              <div key={id} className="row">
                <div className="avatar">
                  <FiUser size={40} />
                </div>

                <div className="control" style={{ flex: 1 }}>
                  <label htmlFor="name">Name</label>
                  {
                    editMode
                      ? (<input
                        className="input"
                        id="name"
                        value={name}
                        onChange={e => handleChangeInput(id, 'name', e.target.value)}
                      />) : <p>{name}</p>
                  }

                </div>

                <div className="control" style={{ flex: 1 }}>
                  <label htmlFor="address">Address</label>
                  {
                    editMode
                      ? (<input
                        className="input"
                        id="address"
                        value={address}
                        onChange={e => handleChangeInput(id, 'address', e.target.value)}
                      />) : (<p>{address}</p>)
                  }
                </div>

                <div className="control" style={{ flex: 2 }}>
                  <label htmlFor="phone">Phone Number</label>
                  {
                    editMode
                      ? (<input
                        className="input"
                        id="phone"
                        value={phone}
                        onChange={e => handleChangeInput(id, 'phone', e.target.value)}
                      />) : (<p>{phone}</p>)
                  }

                </div>

                <div className="control" style={{ flex: 2 }}>
                  <label htmlFor="email">Email</label>
                  {
                    editMode
                      ? (<input
                        className="input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => handleChangeInput(id, 'email', e.target.value)}
                      />) : (<p>{email}</p>)
                  }

                </div>

                <div className="action-column">
                  {
                    editMode
                      ? (
                        <button
                          type="button"
                          className="button is-success is-light"
                          onClick={() => handleSaveChanges(id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="button is-link is-light"
                          onClick={() => setEditMode(id, true)}
                        >
                          Edit
                        </button>
                      )
                  }

                  {
                    editMode
                      ? (
                        <button
                          type="button"
                          className="button is-danger is-light"
                          onClick={() => setEditMode(id, false)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="button is-danger is-light"
                          onClick={() => handleRemoveContact(id)}
                        >
                          Remove
                        </button>
                      )
                  }
                </div>

              </div>
            ))
          }
        </div>

      </main>
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
