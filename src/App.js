import { useState } from 'react';
import { Home } from './components/Home';
import { Message } from './components/Message';

// pre-defined contact data
const data = [
  {
    name: 'React',
    pfp: 'logo512.png',
    messages: ['Hello!', 'How is your state now?'],
    replies: ['Bro, I am hooked'],
    id: crypto.randomUUID(),
  },
  {
    name: 'JavaScript',
    pfp: 'js-image.jpg',
    messages: ['Good morning', 'Are you listening to me?'],
    replies: ['Not really, I am at an event'],
    id: crypto.randomUUID(),
  },

  {
    name: 'HTML',
    pfp: 'download.jpg',
    messages: ['I tagged you in the general group, yet you did not reply me'],
    replies: ['I plan on blocking you soon'],
    id: crypto.randomUUID(),
  },
];

export default function App() {
  const [contactsInfo, setContactsInfo] = useState(data);
  const [selectedContact, setSelectedContact] = useState(null);

  function handleContactUpdate(contact) {
    setContactsInfo((current) => {
      return [...current, contact];
    });
  }

  function handleContactMessageEdit(text) {
    // modifying the selected contact's information -- causing a re-render
    setSelectedContact((selected) => {
      return { ...selected, replies: [...selected.replies, text] };
    });

    // updating the contact's messages in the array
    setContactsInfo((contacts) =>
      contacts.map((contact) =>
        selectedContact.id === contact.id
          ? { ...contact, replies: [...contact.replies, text] }
          : contact
      )
    );
  }

  function handleSelectContact(contact) {
    setSelectedContact((selected) =>
      selected?.id === contact.id ? null : contact
    );
    console.log(selectedContact);
  }

  return (
    <div className="app">
      {selectedContact === null ? (
        <Home
          contactsInfo={contactsInfo}
          onSetContactsInfo={handleContactUpdate}
          onSelectContact={handleSelectContact}
        />
      ) : (
        <Message
          contact={selectedContact}
          onSelectContact={setSelectedContact}
          onContactMessageEdit={handleContactMessageEdit}
        />
      )}
    </div>
  );
}
