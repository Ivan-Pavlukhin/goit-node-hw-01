const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

// fs.readFile(contactsPath, err, data) => {
//     if (err) {
//         console.error(err.message)
//         return
//     }
// }

// /*
//  * Раскомментируй и запиши значение
//  * const contactsPath = ;
//  */

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    const parseDate = JSON.parse(data)
    return parseDate
  } catch (error) {
    console.log(error.message)
  }
}

async function getContactById(id) {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(item => item.id === id)
    if (!contact) {
      throw newError("contact undefined")
    }
    console.log(contact)
    return contact
  } catch (error) {
    console.log(error.message)
  }

}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts()
    const contact = contacts.find(item => item.id === contactId)
    if (!contact) {
      throw newError("contact undefined")
    }
    const indx = contacts.indexOf(contact)
    const newContacts = contacts.filter(item => item.id !== contactId)
    console.log(contacts[indx])
    
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    return contacts[indx]
  } catch (error) {
    console.log(error.message)
  }
  
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts()
    const additionContact = { name, email, phone, id: uuidv4() }
    const newContacts = [...contacts, additionContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
    console.log(additionContact)
    return additionContact
  } catch (error) {
    console.log(error.message)
  }
}


module.exports = { listContacts, getContactById, removeContact, addContact }