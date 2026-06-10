// Nav, mobile sheet, cart drawer, floating action
const { useState: useNS } = React;

function Nav({ onMenu, onCart }) {
  const stuck = useScrolled(30);
  const { count } = useCart();
  const links = window.NAV_LINKS.filter((l) => l.primary);
  const onLink = (e, l) => {
    if (l.action === "order") { e.preventDefault(); onCart(); return; }
    scrollToId(e, l.href);
  };
  return (
    <header className={"nav" + (stuck ? " is-stuck" : "")}>
      <Brand />
      <nav className="nav__links">
        {links.map((l) => (
          <a key={l.label} href={l.href} onClick={(e) => onLink(e, l)}>{l.label}</a>
        ))}
      </nav>
      <div className="nav__actions">
        <a className="btn btn--ghost btn--sm nav__reserve" href="#reserve" onClick={(e) => scrollToId(e, "#reserve")}>Reserve a table</a>
        <button className="nav__cart" onClick={onCart} aria-label="View basket">
          <Icon.Cart />
          {count > 0 && <span className="nav__count">{count}</span>}
        </button>
        <button className="nav__burger" onClick={onMenu} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

function MobileSheet({ open, onClose, onCart }) {
  const links = window.NAV_LINKS;
  const s = window.SITE;
  return (
    <div className={"sheet" + (open ? " is-open" : "")}>
      <div className="sheet__bg" onClick={onClose} />
      <div className="sheet__panel" role="dialog" aria-modal="true">
        <div className="sheet__head">
          <Brand />
          <button className="iconbtn" onClick={onClose} aria-label="Close"><Icon.Close /></button>
        </div>
        <nav className="sheet__nav">
          {links.map((l, i) => (
            <a key={l.label} href={l.href}
              onClick={(e) => {
                if (l.action === "order") { e.preventDefault(); onClose(); onCart(); return; }
                scrollToId(e, l.href); onClose();
              }}>
              <i>{String(i + 1).padStart(2, "0")}</i>{l.label}
            </a>
          ))}
        </nav>
        <div className="sheet__foot">
          <button className="btn btn--solid btn--full btn--lg" onClick={() => { onClose(); onCart(); }}>
            <Icon.Cart /> View basket
          </button>
          <a className="btn btn--ghost btn--full" href={`tel:${s.phoneRaw}`}><Icon.Phone /> Call {s.phone}</a>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose }) {
  const { items, total, add, remove, count, clear } = useCart();
  const s = window.SITE;

  const sendWhatsApp = () => {
    const lines = items.map((it) => `• ${it.qty}× ${it.name} — ${window.gbp(it.price * it.qty)}`).join("\n");
    const msg = `Hi Maandeeq! I'd like to order:\n\n${lines}\n\nTotal: ${window.gbp(total)}\n\nName:\nPickup / Delivery:\nTime:`;
    window.open(`https://wa.me/${s.whatsappRaw}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className={"drawer" + (open ? " is-open" : "")}>
      <div className="drawer__bg" onClick={onClose} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Your basket">
        <div className="drawer__head">
          <h3>Your basket</h3>
          <button className="iconbtn" onClick={onClose} aria-label="Close"><Icon.Close /></button>
        </div>
        <div className="drawer__body">
          {items.length === 0 ? (
            <div className="drawer__empty">
              <Icon.Cart />
              <p>Your basket is empty.<br />Add a dish from the menu to get started.</p>
            </div>
          ) : (
            items.map((it) => (
              <div className="citem" key={it.name}>
                <div>
                  <div className="citem__name">{it.name}</div>
                  <div className="citem__price">{window.gbp(it.price)} each</div>
                </div>
                <div className="citem__line">{window.gbp(it.price * it.qty)}</div>
                <div className="citem__qty">
                  <div className="qty">
                    <button onClick={() => add(it.name, -1)} aria-label="Remove one"><Icon.Minus /></button>
                    <span>{it.qty}</span>
                    <button onClick={() => add(it.name, 1)} aria-label="Add one"><Icon.Plus /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__total">
              <span>{count} item{count !== 1 ? "s" : ""} · Total</span>
              <strong>{window.gbp(total)}</strong>
            </div>
            <button className="btn btn--gold btn--full btn--lg" onClick={sendWhatsApp}>
              <Icon.WhatsApp /> Order on WhatsApp
            </button>
            <p className="drawer__hint">
              Opens WhatsApp with your basket pre-filled — edit before you send.
              <br /><button className="linkish" style={{ fontSize: 12, marginTop: 8 }} onClick={clear}>Clear basket</button>
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}

function Fab({ onCart }) {
  const { count } = useCart();
  return (
    <button className="fab" onClick={onCart}>
      <Icon.Cart /> Basket
      {count > 0 && <span className="fab__count">{count}</span>}
    </button>
  );
}

Object.assign(window, { Nav, MobileSheet, CartDrawer, Fab });
