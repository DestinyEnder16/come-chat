import { useState } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';

export function InputMessage({ onContactMessageEdit }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (text.length < 1) return;

    // calls this function which handle the updating of the user's replies array, thus causing a re-render
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
