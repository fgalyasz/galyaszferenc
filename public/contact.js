const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

async function sendContact(event) {
  event.preventDefault();
  if (!(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) return;
  status.textContent = "Küldés…";
  const payload = Object.fromEntries(new FormData(form).entries());
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  status.textContent = response.ok
    ? "Megkaptam. Hamarosan válaszolok."
    : "Az üzenet nem ment el. Írj közvetlenül e-mailben.";
}

if (form) {
  form.addEventListener("submit", (event) => {
    void sendContact(event);
  });
}
