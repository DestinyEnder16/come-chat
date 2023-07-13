export function Contact({ contact, onSelectContact }) {
  // Renders the contacts...
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
