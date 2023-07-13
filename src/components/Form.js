import { useState } from 'react';

export function Form({ displayForm, onSetDisplayForm, onFormSubmit }) {
  const [text, setText] = useState('');
  const [number, setNumber] = useState('');

  return (
    <form
      className={displayForm ? 'contact-add--form active' : 'contact-add--form'}
      onSubmit={(e) => {
        e.preventDefault();

        // generating a new object for the added Contact
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
