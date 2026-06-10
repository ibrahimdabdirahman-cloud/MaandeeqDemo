// Maandeeq — menu + site data (shared)
window.MENU_DATA = [
  {
    id: "main-course",
    title: "Main Course",
    note: "Served with Somali rice (Bariice), pasta (Baasto), Ugali (Soor) & salad.",
    items: [
      { name: "Maandeeq Special — Haniid Lamb", desc: "Slow-cooked lamb shank or shoulder, rich Somali spices.", price: "12.99", popular: true },
      { name: "Chicken Steak", desc: "Marinated chicken grilled with East African spices.", price: "8.99" },
      { name: "Salmon Fish", desc: "Salmon fillet seasoned the Somali way.", price: "10.49" },
      { name: "Beef Suqaar", desc: "Tender beef with peppers, onions and potatoes.", price: "7.99", popular: true },
      { name: "Maraghe (Bean Stew)", desc: "Red kidney beans, spinach and spices with vegetables.", price: "5.99", veg: true },
    ],
  },
  {
    id: "platters",
    title: "Family Platters",
    note: "Served with Bariice, Baasto or Ugali & salad. Made for the table.",
    items: [
      { name: "1–2 People Platter", desc: "Lamb shank or shoulder, chicken steak, beef suqaar.", price: "29.99" },
      { name: "2–3 People Platter", desc: "Lamb ×2, chicken steak, beef suqaar.", price: "38.99" },
      { name: "4–5 People Platter", desc: "Lamb ×3, chicken steak, beef suqaar.", price: "49.99", popular: true },
      { name: "Mega Fusion Platter", desc: "Lamb ×5, chicken steak ×3, beef suqaar. For everyone.", price: "79.99" },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    note: "Perfect to share, with honey or savoury dishes.",
    items: [
      { name: "Sambusa", desc: "Crispy pastry with spiced meat and onions.", price: "0.99", popular: true },
      { name: "Sabayaad (Chapati)", desc: "Flaky, golden flatbread — portion of three.", price: "0.99" },
      { name: "Kimis & Mayai (Malawaax)", desc: "Soft kimis flatbread with eggs — portion of three.", price: "1.49" },
      { name: "Chipsi Mayai", desc: "Traditional fries folded into seasoned eggs.", price: "3.99" },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      { name: "Milk Cake", desc: "Oreo, Lotus Biscoff, Ferrero Rocher & Kinder Bueno.", price: "5.49", popular: true },
      { name: "Somali Cake", desc: "Soft golden slice with a hint of sweetness.", price: "1.49" },
      { name: "Milk Shake", desc: "Homemade — Oreo or strawberry.", price: "3.49" },
    ],
  },
  {
    id: "drinks",
    title: "Drinks & Tea",
    items: [
      { name: "Maandeeq Special Tea (Shaah)", desc: "Aromatic spiced black tea, steeped slow.", price: "1.49", popular: true },
      { name: "Somali Coffee (Qaxwo)", desc: "Cardamom, cinnamon, ginger and cloves.", price: "1.99" },
      { name: "Mango Lassi", desc: "Creamy yogurt blended with ripe mango.", price: "2.99" },
      { name: "Mojito", desc: "Classic, Blue Fusion, Strawberry or Piña Colada.", price: "4.49" },
      { name: "Fresh Juices", desc: "Mango, guava or pineapple, on the rocks.", price: "1.99" },
      { name: "Soft Drinks", desc: "7Up, Fanta Pineapple, Diet Coke, Shanni & Miranda.", price: "0.99" },
    ],
  },
];

window.SITE = {
  phone: "+44 7958 139 312",
  phoneRaw: "+447958139312",
  whatsapp: "+44 7958 139 312",
  whatsappRaw: "447958139312",
  email: "restaurantmaandeeq@gmail.com",
  addressName: "Maandeeq Restaurant",
  addressLine: "13B Anglesea Rd",
  postcode: "London SE18 6EG",
  address: "13B Anglesea Rd, Woolwich, London SE18 6EG",
  area: "Woolwich · South East London",
  maps: "https://maps.google.com/?q=Maandeeq+Restaurant+13B+Anglesea+Rd+London+SE18+6EG",
  transit: "4-min walk from Woolwich Arsenal (Rail & DLR) and Woolwich (Elizabeth line).",
  hours: [
    ["Mon – Thu", "8:30am – 11:00pm"],
    ["Fri", "8:30am – 11:30pm"],
    ["Sat", "9:00am – 11:30pm"],
    ["Sun", "9:00am – 10:30pm"],
  ],
  instagram: "@maandeeqrestaurant",
};

// Mirrors the live Maandeeq site's page structure, mapped to on-page sections.
// `primary` items show in the desktop inline nav; the mobile sheet shows all.
// `action: "order"` opens the basket/order drawer instead of scrolling.
window.NAV_LINKS = [
  { label: "Reservations", href: "#reserve", primary: true },
  { label: "Order Online", href: "#menu", action: "order" },
  { label: "Menu", href: "#menu", primary: true },
  { label: "Catering", href: "#catering", primary: true },
  { label: "About Us", href: "#about", primary: true },
  { label: "Reviews", href: "#reviews", primary: true },
  { label: "Contact", href: "#visit", primary: true },
  { label: "FAQs", href: "#faq" },
];

window.REVIEWS = [
  { q: "The lamb shank fell off the bone and the shaah was just like my hooyo makes it. New family spot.", a: "Fatima H.", src: "Google" },
  { q: "Ordered the 4–5 platter for my brother's birthday — fed eight people and we still had leftovers.", a: "Yusuf A.", src: "WhatsApp" },
  { q: "Best sambusa in SE London. Crispy, properly spiced. And the tea is something else.", a: "Idris M.", src: "Instagram" },
  { q: "Catered our nikah for 90 guests. On time, beautiful, everyone went back for seconds.", a: "Hodan & Mohamed", src: "Catering" },
];

window.FAQS = [
  ["Is everything halal?", "Yes — every dish is 100% halal, sourced from verified London suppliers."],
  ["Do you deliver?", "We offer pickup and short-distance delivery across Woolwich. Larger catering orders can travel further — just ask on WhatsApp."],
  ["Can I book a large table?", "Tables up to 8 are bookable here. For 10+ please use catering so we can pre-prep portions."],
  ["How does ordering work?", "Add dishes to your basket, then tap Order on WhatsApp — it pre-fills a message you can edit before sending."],
  ["Is there parking?", "Street parking is nearby. We're a short walk from Woolwich Arsenal station and the Elizabeth Line."],
];
