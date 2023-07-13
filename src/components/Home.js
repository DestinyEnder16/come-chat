import { useState } from 'react';
import { UserPlus, MessengerLogo } from '@phosphor-icons/react';
import { Contact } from './Contact';
import { NavPanel } from './NavPanel';
import { Form } from './Form';

export function Home({ contactsInfo, onSelectContact, onSetContactsInfo }) {
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
            <Contact
              contact={contact}
              key={crypto.randomUUID()}
              onSelectContact={onSelectContact}
            />
          ))}
        </ul>
      ) : (
        <div
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h2>Calm down, this is not WhatsApp or something...</h2>
        </div>
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
