export default function RootSignal({ activeIndex = 0 }) {
  const items = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="v2-root-signal" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item}
          className={item === activeIndex ? 'v2-root-signal-bar is-active' : 'v2-root-signal-bar'}
          style={{ '--signal-index': item }}
        />
      ))}
    </div>
  );
}
