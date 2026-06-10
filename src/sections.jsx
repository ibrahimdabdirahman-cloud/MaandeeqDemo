// Homepage sections
const { useState: useSS, useMemo: useSM } = React;

function Hero() {
  const { add } = useCart();
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <Reveal className="hero__copy">
            <span className="kicker">Authentic Somali kitchen · Woolwich</span>
            <h1 className="hero__title">
              A table set
              <span className="it">for everyone.</span>
            </h1>
            <p className="hero__sub">
              Generous platters, slow-cooked lamb, fresh sabayaad and aromatic shaah —
              the flavours of the Horn of Africa, in the heart of South East London.
            </p>
            <div className="hero__cta">
              <a className="btn btn--solid btn--lg" href="#menu" onClick={(e) => scrollToId(e, "#menu")}>View the menu <Icon.Arrow /></a>
              <a className="btn btn--ghost btn--lg" href="#reserve" onClick={(e) => scrollToId(e, "#reserve")}>Book a table</a>
            </div>
            <div className="hero__meta">
              <span><b>Halal</b> · always</span>
              <span><b>Dine in</b> · takeaway · catering</span>
              <span><b>Platters</b> from £29.99</span>
            </div>
          </Reveal>
          <Reveal className="hero__media" delay={120}>
            <img src="assets/food-platter.webp" alt="A generous Somali family platter — lamb, suqaar, sabayaad and salad" />
            <div className="hero__badge"><span className="dot" /> Open now · until 11pm</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Strip() {
  const words = ["Bariis", "Suqaar", "Sambuus", "Sabayaad", "Haniid", "Shaah", "Malawaax", "Maraq"];
  const run = words.concat(words);
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip__track">
        {run.map((w, i) => (
          <span className="strip__item" key={i}>{w}<span className="strip__dot" /></span>
        ))}
      </div>
    </div>
  );
}

function Signatures() {
  const { cart, add } = useCart();
  const cards = [
    { name: "Haniid Lamb", key: "Maandeeq Special — Haniid Lamb", desc: "Slow-cooked shank, rich Somali spice.", price: 12.99, img: "assets/food-platter.webp", crop: "center 35%" },
    { name: "Beef Suqaar", key: "Beef Suqaar", desc: "Beef, peppers, onions, potatoes.", price: 7.99, img: "assets/food-suqaar.webp", crop: "center 55%" },
    { name: "Sabayaad Breakfast", key: "Kimis & Mayai (Malawaax)", desc: "Flaky bread, eggs, honey, sambusa.", price: 1.49, img: "assets/food-breakfast.webp", crop: "center 50%" },
    { name: "Somali Tea", key: "Maandeeq Special Tea (Shaah)", desc: "Aromatic spiced black tea.", price: 1.49, img: "assets/food-drinks.webp", crop: "center 45%" },
  ];
  return (
    <section className="section" id="signatures">
      <div className="wrap">
        <Reveal className="shead">
          <span className="kicker">Signatures</span>
          <h2 className="display">What people come back for.</h2>
        </Reveal>
        <div className="sigs__grid">
          {cards.map((c, i) => {
            const added = (cart[c.key] || 0) > 0;
            return (
              <Reveal as="article" className="sig" key={c.name} delay={i * 80}>
                <div className="sig__media">
                  <img src={c.img} alt={c.name} style={{ objectPosition: c.crop }} />
                  <span className="sig__no">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="sig__row">
                  <span className="sig__name">{c.name}</span>
                  <span className="sig__price">£{c.price.toFixed(2)}</span>
                </div>
                <p className="sig__desc">{c.desc}</p>
                <button className={"sig__add" + (added ? " is-added" : "")} onClick={() => add(c.key)}>
                  {added ? <><Icon.Check /> Added</> : <><Icon.Plus /> Add to basket</>}
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const { cart, add } = useCart();
  const cats = window.MENU_DATA;
  const [active, setActive] = useSS(cats[0].id);
  const [filter, setFilter] = useSS("all");
  const cat = cats.find((c) => c.id === active);
  const items = useSM(() => cat.items.filter((i) =>
    filter === "popular" ? i.popular : filter === "veg" ? i.veg : true
  ), [cat, filter]);

  return (
    <section className="section band" id="menu">
      <div className="wrap">
        <div className="menu__top">
          <Reveal className="shead">
            <span className="kicker">The Menu</span>
            <h2 className="display">Eat well, <span className="gold">eat together.</span></h2>
          </Reveal>
          <Reveal as="p" className="lede" style={{ marginTop: 0, maxWidth: "34ch" }}>
            Tap <b style={{ color: "var(--ink)" }}>Add</b> to build a basket, then order on WhatsApp in one tap.
          </Reveal>
        </div>

        <div className="menu__tabs" role="tablist">
          {cats.map((c) => (
            <button key={c.id} role="tab" aria-selected={active === c.id}
              className={"menu__tab" + (active === c.id ? " is-on" : "")}
              onClick={() => setActive(c.id)}>{c.title}</button>
          ))}
        </div>

        <div className="menu__filters">
          <button className={"pill" + (filter === "all" ? " is-on" : "")} onClick={() => setFilter("all")}>All</button>
          <button className={"pill" + (filter === "popular" ? " is-on" : "")} onClick={() => setFilter("popular")}><Icon.Flame /> Most loved</button>
          <button className={"pill" + (filter === "veg" ? " is-on" : "")} onClick={() => setFilter("veg")}><Icon.Leaf /> Veggie</button>
        </div>

        {cat.note && <p className="menu__note">{cat.note}</p>}

        <ul className="menu__list">
          {items.map((it) => {
            const q = cart[it.name] || 0;
            return (
              <li className="mrow" key={it.name}>
                <div className="mrow__head">
                  <span className="mrow__name">{it.name}</span>
                  {it.popular && <span className="tag tag--gold"><Icon.Flame /> Loved</span>}
                  {it.veg && <span className="tag tag--veg"><Icon.Leaf /> Veggie</span>}
                  <span className="mrow__lead" />
                </div>
                <span className="mrow__price">£{it.price}</span>
                <p className="mrow__desc">{it.desc}</p>
                <div className="mrow__actions">
                  {q === 0 ? (
                    <button className="addbtn" onClick={() => add(it.name)}><Icon.Plus /> Add</button>
                  ) : (
                    <div className="qty">
                      <button onClick={() => add(it.name, -1)} aria-label="Remove one"><Icon.Minus /></button>
                      <span>{q}</span>
                      <button onClick={() => add(it.name, 1)} aria-label="Add one"><Icon.Plus /></button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
          {items.length % 2 === 1 && <li aria-hidden="true" style={{ borderBottom: 0 }} />}
        </ul>
      </div>
    </section>
  );
}

function Platters() {
  const data = window.MENU_DATA.find((c) => c.id === "platters");
  const { add } = useCart();
  return (
    <section className="section" id="platters">
      <div className="wrap">
        <div className="feature__grid">
          <Reveal className="feature__media">
            <img src="assets/food-platter.webp" alt="Maandeeq family platter for sharing" />
          </Reveal>
          <Reveal delay={100}>
            <span className="kicker">Family Platters</span>
            <h2 className="display">Built for sharing.<br /><em>Generous by default.</em></h2>
            <p className="lede" style={{ marginLeft: 0 }}>
              Lamb shank, chicken steak and beef suqaar over fragrant bariis or baasto,
              with fresh salad. Made for weekends, guests and celebrations.
            </p>
            <ul className="feature__list">
              {data.items.map((p, i) => (
                <li key={p.name}>
                  <span className="feature__no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="feature__nm">{p.name}<small>{p.desc}</small></span>
                  <span className="feature__pr">£{p.price}</span>
                </li>
              ))}
            </ul>
            <div className="feature__cta">
              <button className="btn btn--gold btn--lg" onClick={() => add("4–5 People Platter")}>
                <Icon.Plus /> Add the 4–5 platter
              </button>
              <a className="btn btn--ghost btn--lg" href="#reserve" onClick={(e) => scrollToId(e, "#reserve")}>Catering &amp; events</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Catering() {
  const s = window.SITE;
  const occasions = ["Nikkah", "Walimah", "Aqiqah", "Iftar", "Corporate", "Baby shower"];
  const metrics = [["10–300", "Guests"], ["£18", "From / head"], ["7 days", "Notice"]];
  const wa = () => {
    const msg = "Hi Maandeeq! I'd like a catering quote.\n\nOccasion:\nDate:\nHeadcount:\nPostcode:";
    window.open(`https://wa.me/${s.whatsappRaw}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  return (
    <section className="cater" id="catering">
      <div className="wrap">
        <div className="cater__grid">
          <Reveal>
            <span className="kicker">Off-site Catering · Greater London</span>
            <h2 className="display" style={{ color: "#fff" }}>A feast that <span className="gold">travels.</span></h2>
            <p className="lede" style={{ marginLeft: 0, color: "rgba(255,255,255,0.7)" }}>
              Slow-roasted lamb on a sea of fragrant bariis, sambusas folded by hand that morning,
              basbaas in glass jars, shaah by the urn — delivered hot, set down with care.
            </p>
            <div className="cater__metrics">
              {metrics.map(([b, l]) => (
                <div className="cater__metric" key={l}><strong>{b}</strong><span>{l}</span></div>
              ))}
            </div>
            <div className="cater__chips">
              {occasions.map((o) => <span className="cater__chip" key={o}>{o}</span>)}
            </div>
            <div className="cater__cta">
              <a className="btn btn--gold btn--lg" href="#reserve" onClick={(e) => scrollToId(e, "#reserve")}>Request a quote <Icon.Arrow /></a>
              <button className="btn btn--ghost-light btn--lg" onClick={wa}><Icon.WhatsApp /> Ask on WhatsApp</button>
            </div>
          </Reveal>
          <Reveal className="cater__media" delay={100}>
            <img src="assets/food-platter.webp" alt="A Maandeeq catering platter — whole roasted lamb on bariis with sides" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Reserve() {
  const facts = [
    [Icon.Clock, "Open 7 days", "8:30am till late, every day of the week."],
    [Icon.Users, "Tables 2–8", "Larger groups welcome via catering."],
    [Icon.Truck, "Pickup & delivery", "Across Woolwich & South East London."],
    [Icon.Check, "Halal, always", "Verified London suppliers."],
  ];
  return (
    <section className="section band" id="reserve">
      <div className="wrap">
        <div className="reserve__grid">
          <Reveal className="reserve__aside">
            <span className="kicker">Reservations &amp; Catering</span>
            <h2 className="display">Walk in, or<br /><span className="gold">book ahead.</span></h2>
            <p className="lede" style={{ marginLeft: 0 }}>
              Reserve a table in seconds, or tell us about a bigger occasion —
              nikahs, aqiqahs, Friday lunches and community events, scaled from 10 to 200.
            </p>
            <ul className="factlist">
              {facts.map(([I, t, d]) => (
                <li key={t}><I /><div><b>{t}</b><span>{d}</span></div></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <ReservationForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const list = window.REVIEWS;
  return (
    <section className="section" id="reviews">
      <div className="wrap">
        <div className="reviews__head">
          <Reveal className="shead">
            <span className="kicker">Word of mouth</span>
            <h2 className="display">Loved by the neighbourhood.</h2>
          </Reveal>
          <Reveal className="rating" delay={80}>
            <span className="rating__big">4.9</span>
            <div>
              <div className="rating__stars">{[0,1,2,3,4].map((n) => <Icon.Star key={n} />)}</div>
              <small>412 reviews · Google &amp; WhatsApp</small>
            </div>
          </Reveal>
        </div>
        <div className="reviews__grid">
          {list.map((r, i) => (
            <Reveal as="figure" className="review" key={i} delay={i * 70}>
              <div className="review__stars">{[0,1,2,3,4].map((n) => <Icon.Star key={n} />)}</div>
              <blockquote>“{r.q}”</blockquote>
              <figcaption><b>{r.a}</b> · via {r.src}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section band" id="about">
      <div className="wrap">
        <div className="about__grid">
          <Reveal>
            <span className="kicker">Our story</span>
            <p className="about__big">
              <em>Maandeeq</em> — the white she-camel of Somali poetry — is a symbol of
              nourishment and continuity. That's the job of a kitchen: to feed, to gather,
              to carry a culture forward.
            </p>
            <p className="about__p">
              Our cooks are aunties, uncles and friends from across the Somali diaspora.
              Our butchers and spice shops are the ones London families have trusted for years.
              Our table is for you, your kids, your cousin's nikah — here in Woolwich.
            </p>
            <div className="about__stats">
              <div className="about__stat"><b>2024</b><span>Established</span></div>
              <div className="about__stat"><b>Daily</b><span>Fresh sabayaad</span></div>
              <div className="about__stat"><b>7 days</b><span>Open weekly</span></div>
              <div className="about__stat"><b>100%</b><span>Halal</span></div>
            </div>
          </Reveal>
          <Reveal className="about__photo" delay={100}>
            <img src="assets/food-breakfast.webp" alt="A Somali breakfast spread — sabayaad, eggs, honey and sambusa" />
            <span className="about__seal"><img src="assets/brand/logo-transparent.png" alt="Maandeeq" /></span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  const s = window.SITE;
  return (
    <section className="section" id="visit">
      <div className="wrap">
        <Reveal className="shead">
          <span className="kicker">Visit us</span>
          <h2 className="display">Find Maandeeq.</h2>
        </Reveal>
        <div className="visit__grid">
          <Reveal className="visit__map" role="img" aria-label="Map showing Maandeeq on Anglesea Road, Woolwich">
            <span className="visit__road visit__road--h" />
            <span className="visit__road visit__road--v" />
            <span className="visit__road visit__road--d" />
            <span className="visit__pin">
              <span className="visit__pindot"><Icon.Pin /></span>
              <span className="visit__pinlabel">Maandeeq · 13B Anglesea Rd</span>
            </span>
            <a className="visit__maplink" href={s.maps} target="_blank" rel="noopener">Open in Google Maps <Icon.Arrow /></a>
          </Reveal>
          <div className="visit__info">
            <Reveal as="div" className="vblock">
              <h4><Icon.Pin /> Address</h4>
              <p>{s.addressName}<br />{s.addressLine}<br />{s.postcode}</p>
              <a className="linkish" href={s.maps} target="_blank" rel="noopener">Get directions <Icon.Arrow /></a>
            </Reveal>
            <Reveal as="div" className="vblock" delay={60}>
              <h4><Icon.Clock /> Opening hours</h4>
              <table className="hours"><tbody>
                {s.hours.map(([d, t]) => <tr key={d}><td>{d}</td><td>{t}</td></tr>)}
              </tbody></table>
            </Reveal>
            <Reveal as="div" className="vblock" delay={120}>
              <h4><Icon.Phone /> Contact</h4>
              <p>
                <a href={`tel:${s.phoneRaw}`}>{s.phone}</a><br />
                <a href={`https://wa.me/${s.whatsappRaw}`} target="_blank" rel="noopener">WhatsApp · {s.whatsapp}</a><br />
                <a href={`mailto:${s.email}`}>{s.email}</a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = window.FAQS;
  const [open, setOpen] = useSS(0);
  return (
    <section className="section band" id="faq">
      <div className="wrap">
        <div className="faq__grid">
          <Reveal className="shead">
            <span className="kicker">Good to know</span>
            <h2 className="display">Questions, answered.</h2>
          </Reveal>
          <Reveal as="ul" className="faq__list" delay={80}>
            {qs.map(([q, a], i) => (
              <li key={i} className={open === i ? "is-open" : ""}>
                <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
                  {q}<Icon.Plus />
                </button>
                <div className="faq__a"><div><p>{a}</p></div></div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const s = window.SITE;
  return (
    <footer className="foot">
      <div className="wrap">
        <Newsletter />
        <div className="foot__cols">
          <div className="foot__brand">
            <img src="assets/brand/logo-transparent.png" alt="Maandeeq" />
            <p>Authentic Somali food — family platters, takeaway &amp; catering in the heart of Woolwich.</p>
          </div>
          <div className="foot__col">
            <h5>Explore</h5>
            {window.NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={(e) => scrollToId(e, l.href)}>{l.label}</a>
            ))}
          </div>
          <div className="foot__col">
            <h5>Find us</h5>
            <a href={s.maps} target="_blank" rel="noopener">{s.addressLine}, {s.postcode}</a>
            <a href={`tel:${s.phoneRaw}`}>{s.phone}</a>
            <a href={`https://wa.me/${s.whatsappRaw}`} target="_blank" rel="noopener">WhatsApp</a>
            <a href={`mailto:${s.email}`}>{s.email}</a>
          </div>
        </div>
        <div className="foot__bottom">
          <span>© {new Date().getFullYear()} Maandeeq Restaurant · Woolwich</span>
          <span>Halal · Family-run · Made with care</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Hero, Strip, Signatures, Menu, Platters, Catering, Reserve, Reviews, About, Visit, FAQ, Footer });
