import { useState } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';

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
    pfp: 'css-3.png',
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

  function handleContactMessageEdit(text) {
    console.log('TRYING TO EDIT!');
    console.log(selectedContact);
    setContactsInfo((contacts) =>
      contacts.map((contact) =>
        selectedContact.id === contact.id
          ? { ...contact, replies: [...contact.replies, text] }
          : contact
      )
    );
    console.log(contactsInfo);
  }

  function handleSelectContact(contact) {
    setSelectedContact((selected) =>
      selected?.id === contact.id ? null : contact
    );
  }

  return (
    <div className="app">
      <h1>Come Chat</h1>

      {selectedContact === null ? (
        <ContactPanel
          contactsInfo={contactsInfo}
          onSelectContact={handleSelectContact}
        />
      ) : (
        <Message
          contact={selectedContact}
          onSelectContact={handleSelectContact}
          onContactMessageEdit={handleContactMessageEdit}
        />
      )}

      <main></main>
    </div>
  );
}

function ContactPanel({ contactsInfo, onSelectContact }) {
  return (
    <div className="sidebar">
      <ul className="messages">
        {contactsInfo.map((contact) => (
          <Contact
            contact={contact}
            key={crypto.randomUUID()}
            onSelectContact={onSelectContact}
          />
        ))}
      </ul>
    </div>
  );
}

function Contact({ contact, onSelectContact }) {
  return (
    <li className="contact" onClick={() => onSelectContact(contact)}>
      <img
        src={contact.pfp}
        alt={`${contact.name} pfp`}
        className="contact-picture"
      />
      <div className="contact-details">
        <span className="contact-name">{contact.name}</span>
        <span className="contact-last--message">
          {contact.messages.slice(-1)}
        </span>
      </div>
    </li>
  );
}

function Message({ contact, onSelectContact, onContactMessageEdit }) {
  const locale = navigator.language;
  return (
    <>
      <span onClick={() => onSelectContact(null)} id="back">
        ←
      </span>
      <div className="messages-panel">
        <img
          src={contact.pfp}
          alt={`${contact.name} pfp`}
          className="contact-picture"
        />

        <div className="messages-panel--details">
          <span id="messenger">{contact.name}</span>
          <span id="messenger-details">
            Last seen{' '}
            {new Date().toLocaleString(locale, {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
            })}
          </span>
        </div>
      </div>

      <div className="message-list">
        <ul>
          {contact.messages.map((message) => (
            <li className="message" key={crypto.randomUUID()}>
              {message}
            </li>
          ))}
        </ul>
        <ul>
          {contact.replies.map((reply) => (
            <li className="reply" key={crypto.randomUUID()}>
              {reply}
            </li>
          ))}
        </ul>
      </div>

      <InputMessage
        contact={contact}
        onContactMessageEdit={onContactMessageEdit}
      />
    </>
  );
}

function InputMessage({ contact, onContactMessageEdit }) {
  const [text, setText] = useState('');

  function handleSubmit() {
    if (text.length < 1) return;

    onContactMessageEdit(text);
    setText('');
  }

  return (
    <div className="input-field">
      <input
        type="text"
        placeholder="Type your message here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>
        <PaperPlaneTilt size={32} color="#0dc40dde" onClick={handleSubmit} />
      </span>
    </div>
  );
}
