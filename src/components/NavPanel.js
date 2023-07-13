export function NavPanel({ tab, onsetTab }) {
  return (
    <nav>
      <h1>Come Chat</h1>

      <ul className="nav-panel">
        {/* Clicking any elements renders something different on thr Home */}
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
