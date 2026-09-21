// ===== EDIT THESE SETTINGS =====
const CONFIG = {
  brand: "Toufik's Organic Collection",
  price: 10,                       // price per tube
  currency: "$",                   // e.g. "$", "Rs ", "PKR "
  whatsappNumber: "0000000000000", // country code + number, digits only (no + or spaces)
  youtubeId: ""                    // e.g. "dQw4w9WgXcQ" (the part after v= in the YouTube link)
};
// ===============================

const fmt = (n) => CONFIG.currency + n.toFixed(2);

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Prices
const qty = document.getElementById("qty");
const total = document.getElementById("total");
document.getElementById("hero-price").textContent = fmt(CONFIG.price);
const updateTotal = () => (total.textContent = fmt(CONFIG.price * Number(qty.value)));
qty.addEventListener("change", updateTotal);
updateTotal();

// YouTube video
if (CONFIG.youtubeId) {
  const frame = document.getElementById("yt");
  frame.src = "https://www.youtube.com/embed/" + CONFIG.youtubeId;
  frame.closest(".video-wrap").classList.add("has-video");
}

// Footer
document.getElementById("year").textContent = new Date().getFullYear();
const phoneLink = document.getElementById("footer-phone");
phoneLink.href = "https://wa.me/" + CONFIG.whatsappNumber;
phoneLink.textContent = "+" + CONFIG.whatsappNumber;

// Order form -> WhatsApp message
document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const err = document.getElementById("form-error");
  const name = f.name.value.trim();
  const phone = f.phone.value.trim();
  const address = f.address.value.trim();

  if (!name || !phone || !address) {
    err.textContent = "Please fill in your name, phone number, and address.";
    return;
  }
  err.textContent = "";

  const n = Number(f.qty.value);
  const message =
    `New order - ${CONFIG.brand}\n` +
    `Product: Organic Toothpaste\n` +
    `Quantity: ${n}\n` +
    `Total: ${fmt(CONFIG.price * n)}\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Address: ${address}`;

  window.open(
    "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message),
    "_blank",
    "noopener"
  );
});
