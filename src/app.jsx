// Maandeeq v2 — app shell + tweaks
const { useState: useAS, useEffect: useAE } = React;

const ACCENTS = {
  Gold:       "#9a7322",
  Olive:      "#5f6f3a",
  Terracotta: "#a85a35",
  Ink:        "#16130f",
};
const HEAD_FONTS = {
  "Bodoni (editorial)": '"Bodoni Moda", Didot, Georgia, serif',
  "Playfair":           '"Playfair Display", Georgia, serif',
  "DM Serif":           '"DM Serif Display", Georgia, serif',
  "Grotesk (minimal)":  '"Hanken Grotesk", system-ui, sans-serif',
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "Gold",
  "headFont": "Bodoni (editorial)",
  "warmBands": true,
  "radius": 4
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [navOpen, setNavOpen] = useAS(false);
  const [cartOpen, setCartOpen] = useAS(false);

  useAE(() => {
    const r = document.documentElement.style;
    const a = ACCENTS[t.accent] || ACCENTS.Gold;
    r.setProperty("--accent", a);
    // soft accent from hex
    const hex = a.replace("#", "");
    const rr = parseInt(hex.slice(0,2),16), gg = parseInt(hex.slice(2,4),16), bb = parseInt(hex.slice(4,6),16);
    r.setProperty("--accent-soft", `rgba(${rr},${gg},${bb},0.13)`);
    r.setProperty("--serif", HEAD_FONTS[t.headFont] || HEAD_FONTS["Bodoni (editorial)"]);
    r.setProperty("--bg-2", t.warmBands ? "#faf7f2" : "#f7f7f6");
    r.setProperty("--bg-3", t.warmBands ? "#f4efe7" : "#f0f0ef");
    r.setProperty("--r", (t.radius || 4) + "px");
  }, [t]);

  return (
    <CartProvider>
      <Nav onMenu={() => setNavOpen(true)} onCart={() => setCartOpen(true)} />
      <MobileSheet open={navOpen} onClose={() => setNavOpen(false)} onCart={() => setCartOpen(true)} />

      <main>
        <Hero />
        <Strip />
        <Signatures />
        <Menu />
        <Platters />
        <Catering />
        <Reserve />
        <Reviews />
        <About />
        <Visit />
        <FAQ />
      </main>

      <Footer />
      <Fab onCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <TweaksPanel>
        <TweakSection label="Accent" />
        <TweakColor label="Colour" value={ACCENTS[t.accent]}
          options={Object.values(ACCENTS)}
          onChange={(v) => setTweak("accent", Object.keys(ACCENTS).find((k) => ACCENTS[k] === v) || "Gold")} />
        <TweakSection label="Type" />
        <TweakSelect label="Headline font" value={t.headFont}
          options={Object.keys(HEAD_FONTS)} onChange={(v) => setTweak("headFont", v)} />
        <TweakSection label="Surface" />
        <TweakToggle label="Warm off-white bands" value={t.warmBands} onChange={(v) => setTweak("warmBands", v)} />
        <TweakSlider label="Corner radius" value={t.radius} min={0} max={18} unit="px" onChange={(v) => setTweak("radius", v)} />
      </TweaksPanel>
    </CartProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
