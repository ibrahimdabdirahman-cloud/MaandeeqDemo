// Shared store + small hooks
const { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } = React;

// ---- price helpers ----
const PRICE = {};
(window.MENU_DATA || []).forEach((cat) => cat.items.forEach((it) => { PRICE[it.name] = parseFloat(it.price); }));
window.priceOf = (name) => PRICE[name] || 0;
window.gbp = (n) => "£" + n.toFixed(2);

// ---- cart context ----
const CartCtx = createContext(null);

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mq_cart") || "{}"); } catch (e) { return {}; }
  });
  useEffect(() => {
    try { localStorage.setItem("mq_cart", JSON.stringify(cart)); } catch (e) {}
  }, [cart]);

  const add = useCallback((name, n = 1) => setCart((c) => {
    const q = (c[name] || 0) + n;
    const next = { ...c };
    if (q <= 0) delete next[name]; else next[name] = q;
    return next;
  }), []);
  const remove = useCallback((name) => setCart((c) => { const n = { ...c }; delete n[name]; return n; }), []);
  const clear = useCallback(() => setCart({}), []);

  const count = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const total = useMemo(() => Object.entries(cart).reduce((a, [k, v]) => a + window.priceOf(k) * v, 0), [cart]);
  const items = useMemo(() => Object.entries(cart).map(([name, qty]) => ({ name, qty, price: window.priceOf(name) })), [cart]);

  const value = { cart, add, remove, clear, count, total, items };
  return React.createElement(CartCtx.Provider, { value }, children);
}
function useCart() { return useContext(CartCtx); }

// ---- scroll state ----
function useScrolled(threshold = 30) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return s;
}

// ---- reveal on scroll ----
function Reveal({ as = "div", className = "", style, children, delay = 0, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    // Fail-open: anything already in (or near) the viewport at mount shows immediately.
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) + 80 && r.bottom > -80;
    };
    if (inView() || !("IntersectionObserver" in window)) {
      setTimeout(() => setShown(true), Math.min(delay, 80));
      return;
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    // Safety net: if the observer never fires (some embeds), reveal anyway.
    const t = setTimeout(() => setShown(true), 1200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [delay, shown]);
  const cls = ("reveal " + className + (shown ? " is-in" : "")).trim();
  return React.createElement(as, { ref, className: cls, style, ...rest }, children);
}

// ---- brand mark ----
function Brand({ stacked }) {
  return (
    <a className="nav__brand" href="#top" aria-label="Maandeeq — home">
      <img className="nav__mark" src="assets/brand/logo-transparent.png" alt="" />
      <span className="nav__word">
        <span className="nav__name">MAANDEEQ</span>
        <span className="nav__tag">Restaurant · Somal</span>
      </span>
    </a>
  );
}

// smooth scroll helper for hash links
function scrollToId(e, href) {
  if (!href || !href.startsWith("#")) return;
  const el = document.querySelector(href);
  if (el) {
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", href);
  }
}

Object.assign(window, { CartProvider, useCart, useScrolled, Reveal, Brand, scrollToId });
