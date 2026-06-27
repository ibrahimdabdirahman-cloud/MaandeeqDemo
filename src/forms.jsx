// Reservation form + newsletter
const { useState: useFS } = React;

function ReservationForm() {
  const [f, setF] = useFS({ name: "", phone: "", date: "", time: "", party: "2", notes: "" });
  const [err, setErr] = useFS({});
  const [done, setDone] = useFS(false);
  const times = ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"];
  const set = (k) => (e) => { setF((s) => ({ ...s, [k]: e.target.value })); setErr((s) => ({ ...s, [k]: "" })); };

  const today = new Date().toISOString().split("T")[0];

  const [sending, setSending] = useFS(false);
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!f.name.trim()) next.name = "Please add your name";
    if (!/[0-9]{6,}/.test(f.phone.replace(/\s/g, ""))) next.phone = "Add a valid phone number";
    if (!f.date) next.date = "Pick a date";
    if (!f.time) next.time = "Pick a time";
    setErr(next);
    if (Object.keys(next).length) return;
    const payload = { party: f.party, date: f.date, time: f.time, name: f.name.trim(), phone: f.phone.trim(), notes: f.notes };
    if (window.MasulForms && window.MasulForms.submit) {
      setSending(true);
      window.MasulForms.submit("booking", payload).then((r) => {
        setSending(false);
        if (r && r.ok) setDone(true);
        else setErr({ phone: (r && r.errors && r.errors.join(". ")) || "Sorry — we couldn't send that. Please call us." });
      }).catch(() => { setSending(false); setErr({ phone: "Network error — please try again." }); });
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="success">
        <span className="success__mark"><Icon.Check /></span>
        <h4>Table requested</h4>
        <p>Thanks, {f.name.split(" ")[0]}. We'll confirm your table for {f.party} on {f.date} at {f.time} by text shortly. Soo dhowow.</p>
        <button className="btn btn--ghost" style={{ marginTop: 18 }} onClick={() => { setDone(false); setF({ name: "", phone: "", date: "", time: "", party: "2", notes: "" }); }}>
          Book another
        </button>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h3 className="card__title">Reserve a table</h3>
      <p className="card__sub">Tables for 2–8. For 10+ guests, please use catering.</p>
      <div className="fgrid">
        <div className="field field--full">
          <label>Party size</label>
          <div className="chips">
            {["1", "2", "3", "4", "5", "6", "8"].map((n) => (
              <button type="button" key={n} className={"chip" + (f.party === n ? " is-on" : "")} onClick={() => setF((s) => ({ ...s, party: n }))}>
                {n}{n === "8" ? "+" : ""}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label>Date</label>
          <input type="date" min={today} value={f.date} onChange={set("date")} className={err.date ? "is-err" : ""} />
          {err.date && <span className="field__err">{err.date}</span>}
        </div>
        <div className="field">
          <label>Time</label>
          <select value={f.time} onChange={set("time")} className={err.time ? "is-err" : ""}>
            <option value="">Select…</option>
            {times.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {err.time && <span className="field__err">{err.time}</span>}
        </div>
        <div className="field">
          <label>Name</label>
          <input type="text" placeholder="Your name" value={f.name} onChange={set("name")} className={err.name ? "is-err" : ""} />
          {err.name && <span className="field__err">{err.name}</span>}
        </div>
        <div className="field">
          <label>Phone</label>
          <input type="tel" placeholder="07…" value={f.phone} onChange={set("phone")} className={err.phone ? "is-err" : ""} />
          {err.phone && <span className="field__err">{err.phone}</span>}
        </div>
        <div className="field field--full">
          <label>Notes <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--muted-2)" }}>(optional)</span></label>
          <textarea rows="2" placeholder="High chair, allergies, celebration…" value={f.notes} onChange={set("notes")} />
        </div>
      </div>
      <button className="btn btn--solid btn--full btn--lg" type="submit" disabled={sending} style={{ marginTop: 18 }}>
        {sending ? "Sending…" : <>Request table <Icon.Arrow /></>}
      </button>
      <p className="card__sub" style={{ margin: "12px 0 0", textAlign: "center" }}>We'll confirm by text — usually within the hour.</p>
    </form>
  );
}

function Newsletter() {
  const [email, setEmail] = useFS("");
  const [ok, setOk] = useFS(false);
  const submit = (e) => { e.preventDefault(); if (/.+@.+\..+/.test(email)) setOk(true); };
  return (
    <div className="foot__news">
      <div>
        <span className="kicker kicker--plain">Maandeeq VIP</span>
        <h3>Weekend specials, Ramadan menus &amp; platter offers.</h3>
      </div>
      {ok ? (
        <span className="ok"><Icon.Check /> You're on the list. Mahadsanid!</span>
      ) : (
        <form className="newsform" onSubmit={submit}>
          <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
          <button className="btn btn--solid" type="submit">Join <Icon.Arrow /></button>
        </form>
      )}
    </div>
  );
}

Object.assign(window, { ReservationForm, Newsletter });
