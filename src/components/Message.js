import { InputMessage } from './InputMessage';

export function Message({ contact, onSelectContact, onContactMessageEdit }) {
  // getting the user's locale
  const locale = navigator.language;

  return (
    <>
      <div className="messages-panel">
        {/* Button returns the user to the Home */}
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
                weekday: 'long',
                day: '2-digit',
                month: 'short',
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="message-list">
        {/* rendering both the messages and the replies */}
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

      {/* Input Field which handle the addition of new messages */}
      <InputMessage
        contact={contact}
        onContactMessageEdit={onContactMessageEdit}
        onEditContact={onSelectContact}
      />
    </>
  );
}
