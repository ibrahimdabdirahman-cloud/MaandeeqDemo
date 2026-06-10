// Minimal line icons — stroke-based, 24x24
const Icon = {};
const mk = (paths, fill) => (p) => React.createElement(
  "svg",
  { viewBox: "0 0 24 24", fill: fill ? "currentColor" : "none",
    stroke: fill ? "none" : "currentColor", strokeWidth: 1.6,
    strokeLinecap: "round", strokeLinejoin: "round", ...p },
  paths
);

Icon.Arrow = mk([
  React.createElement("path", { key: 1, d: "M5 12h14" }),
  React.createElement("path", { key: 2, d: "M13 6l6 6-6 6" }),
]);
Icon.Plus = mk([
  React.createElement("path", { key: 1, d: "M12 5v14M5 12h14" }),
]);
Icon.Minus = mk([
  React.createElement("path", { key: 1, d: "M5 12h14" }),
]);
Icon.Close = mk([
  React.createElement("path", { key: 1, d: "M6 6l12 12M18 6L6 18" }),
]);
Icon.Cart = mk([
  React.createElement("path", { key: 1, d: "M3 4h2l2.4 12.5a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.2L22 8H6" }),
  React.createElement("circle", { key: 2, cx: 9, cy: 21, r: 1 }),
  React.createElement("circle", { key: 3, cx: 18, cy: 21, r: 1 }),
]);
Icon.WhatsApp = (p) => React.createElement("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...p },
  React.createElement("path", { d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.73c0 4.46-3.63 8.09-8.1 8.09-1.52 0-3-.41-4.3-1.19l-.31-.18-3.12.82.83-3.04-.2-.31a8.04 8.04 0 0 1-1.23-4.29c0-4.46 3.63-8.09 8.1-8.09Zm-2.78 4.4c-.13 0-.34.05-.52.24-.18.2-.69.68-.69 1.65 0 .97.71 1.91.81 2.04.1.13 1.39 2.12 3.37 2.98 1.65.71 1.98.57 2.34.54.36-.03 1.16-.47 1.32-.93.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23-.2-.1-1.16-.57-1.34-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.11-1.38-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.44-1.08-.62-1.48-.16-.38-.32-.33-.44-.34-.11 0-.24-.01-.37-.01Z" })
);
Icon.Phone = mk([
  React.createElement("path", { key: 1, d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" }),
]);
Icon.Pin = mk([
  React.createElement("path", { key: 1, d: "M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z" }),
  React.createElement("circle", { key: 2, cx: 12, cy: 10, r: 2.6 }),
]);
Icon.Clock = mk([
  React.createElement("circle", { key: 1, cx: 12, cy: 12, r: 9 }),
  React.createElement("path", { key: 2, d: "M12 7v5l3 2" }),
]);
Icon.Star = (p) => React.createElement("svg", { viewBox: "0 0 24 24", fill: "currentColor", ...p },
  React.createElement("path", { d: "M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" })
);
Icon.Flame = mk([
  React.createElement("path", { key: 1, d: "M12 2c1 3-1 4.5-2 6-1.2 1.8-1 3.5 0 4.5 0-1 .8-2 1.6-2.4-.3 1.4.4 2.3 1 3 .8.9 1 2.2.5 3.3A4 4 0 0 1 8 19c-2 0-4-1.6-4-4.4 0-3.6 3-5.6 4.5-8.6C9.4 4.2 11 3 12 2Z" }),
]);
Icon.Leaf = mk([
  React.createElement("path", { key: 1, d: "M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 9-4 14-9 14Z" }),
  React.createElement("path", { key: 2, d: "M8 17c2-4 5-6 9-7" }),
]);
Icon.Check = mk([
  React.createElement("path", { key: 1, d: "M4 12.5l5 5 11-11" }),
]);
Icon.Users = mk([
  React.createElement("path", { key: 1, d: "M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" }),
  React.createElement("circle", { key: 2, cx: 9, cy: 7.5, r: 3.2 }),
  React.createElement("path", { key: 3, d: "M22 20v-1.5a4 4 0 0 0-3-3.8M16 4.2a3.2 3.2 0 0 1 0 6.2" }),
]);
Icon.Calendar = mk([
  React.createElement("rect", { key: 1, x: 3.5, y: 5, width: 17, height: 16, rx: 2 }),
  React.createElement("path", { key: 2, d: "M3.5 9.5h17M8 3v3M16 3v3" }),
]);
Icon.Instagram = mk([
  React.createElement("rect", { key: 1, x: 3.5, y: 3.5, width: 17, height: 17, rx: 4.5 }),
  React.createElement("circle", { key: 2, cx: 12, cy: 12, r: 3.6 }),
  React.createElement("circle", { key: 3, cx: 17, cy: 7, r: 0.7, fill: "currentColor", stroke: "none" }),
]);
Icon.Truck = mk([
  React.createElement("path", { key: 1, d: "M2 6.5h11v9H2zM13 9.5h4l3 3v3h-7z" }),
  React.createElement("circle", { key: 2, cx: 6, cy: 18, r: 1.6 }),
  React.createElement("circle", { key: 3, cx: 17, cy: 18, r: 1.6 }),
]);

window.Icon = Icon;
