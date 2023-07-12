import { useState } from 'react';
import { PaperPlaneTilt, UserPlus, MessengerLogo } from '@phosphor-icons/react';

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

function Home({ contactsInfo, onSelectContact, onSetContactsInfo }) {
  const [selectedTab, setSelectedTab] = useState(1);
  const [isDisplayForm, setIsDisplayForm] = useState(false);

  function handleDisplayForm() {
    setIsDisplayForm((cur) => !cur);
  }

  return (
    <>
      {isDisplayForm ? (
        <div className="overlay" onClick={handleDisplayForm}></div>
      ) : (
        ''
      )}

      <NavPanel tab={selectedTab} onsetTab={setSelectedTab} />

      {selectedTab === 1 ? (
        <ul className="contact-panel">
          {contactsInfo.map((contact) => (
            <ContactList
              contact={contact}
              key={crypto.randomUUID()}
              onSelectContact={onSelectContact}
            />
          ))}
        </ul>
      ) : (
        <h2>Calm down, this is not WhatsApp or something...</h2>
      )}

      {selectedTab === 1 ? (
        <Form
          displayForm={isDisplayForm}
          onSetDisplayForm={handleDisplayForm}
          onFormSubmit={onSetContactsInfo}
        />
      ) : (
        ''
      )}

      <button id="contact-add--button">
        {selectedTab === 1 ? (
          <UserPlus
            size={30}
            color="#f5f0f0"
            weight="fill"
            onClick={() => setIsDisplayForm(true)}
          />
        ) : (
          <MessengerLogo size={30} color="#f5f0f0" weight="fill" />
        )}
      </button>
    </>
  );
}

function Form({ displayForm, onSetDisplayForm, onFormSubmit }) {
  const [text, setText] = useState('');
  const [number, setNumber] = useState('');

  return (
    <form
      className={displayForm ? 'contact-add--form active' : 'contact-add--form'}
      onSubmit={(e) => {
        e.preventDefault();
        const uniqueID = crypto.randomUUID();
        const generatedContact = {
          name: text,
          replies: [],
          messages: [],
          pfp: `https://i.pravatar.cc/48?${uniqueID}`,
          id: uniqueID,
        };

        onFormSubmit(generatedContact);
        setText('');
        setNumber('');
        onSetDisplayForm();
      }}
    >
      <div>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter name here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Phone Number</label>
        <input
          type="number"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <button type="submit">Add </button>
    </form>
  );
}

function NavPanel({ tab, onsetTab }) {
  return (
    <nav>
      <h1>Come Chat</h1>

      <ul className="nav-panel">
        <li
          key={crypto.randomUUID()}
          className={tab === 1 ? 'active' : ''}
          onClick={() => onsetTab(1)}
        >
          Chats
        </li>
        <li
          key={crypto.randomUUID()}
          className={tab === 2 ? 'active' : ''}
          onClick={() => onsetTab(2)}
        >
          Status
        </li>
        <li
          key={crypto.randomUUID()}
          className={tab === 3 ? 'active' : ''}
          onClick={() => onsetTab(3)}
        >
          Calls
        </li>
      </ul>
    </nav>
  );
}

function ContactList({ contact, onSelectContact }) {
  return (
    <li
      className="contact"
      onClick={() => {
        onSelectContact(contact);
      }}
    >
      <img
        src={contact.pfp}
        alt={`${contact.name} pfp`}
        className="contact-picture"
      />
      <div className="contact-details">
        <span className="contact-name">{contact.name}</span>
        <span className="contact-last--message">
          {!contact.replies
            ? contact.messages.slice(-1)
            : contact.replies.slice(-1)}
        </span>
      </div>
    </li>
  );
}

function Message({ contact, onSelectContact, onContactMessageEdit }) {
  const locale = navigator.language;
  return (
    <>
      <div className="messages-panel">
        <span onClick={() => onSelectContact(null)} id="back">
          ←
        </span>

        <div>
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
      </div>

      <div className="message-list">
        <ul>
          {contact.messages.map((message) => (
            <li className="message" key={crypto.randomUUID()}>
              {message}
            </li>
          ))}
        </ul>
        <ul className="reply-list">
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
        onEditContact={onSelectContact}
      />
    </>
  );
}

function InputMessage({ contact, onContactMessageEdit }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (text.length < 1) return;

    onContactMessageEdit(text);
    setText('');
  }

  return (
    <div className="input-field">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>
          <PaperPlaneTilt size={23} color="#f5f0f0" weight="fill" />
        </button>
      </form>
    </div>
  );
}
