// script.js = the BEHAVIOUR.
// It does three things: (1) loads psychologists.json, (2) builds the "what's on your mind"
// lines, (3) shows only the psychologists that match the line you tapped.

// ---- EDIT ME: the lines people can tap. -------------------------------------------
// "label" is what visitors read. "concern" must match a word in the "concerns" list
// of each psychologist in psychologists.json (spelling matters, capitals don't).
const MIND_LINES = [
  { label: "a mind that won't slow down", concern: "overthinking" },
  { label: "feeling low, not sure why",   concern: "low mood" },
  { label: "carrying too much",           concern: "burnout" },
  { label: "worry before exams",          concern: "exam stress" },
  { label: "people and relationships",    concern: "relationships" },
];
// ------------------------------------------------------------------------------------

let everyone = [];          // all psychologists (loaded from the JSON file)
let selected = null;        // the concern currently tapped, or null for "show everyone"

const mindList  = document.getElementById("mind-list");
const peopleList = document.getElementById("people-list");
const peopleCount = document.getElementById("people-count");

// Safety: turn text into harmless text before putting it on the page
function esc(text) {
  const d = document.createElement("div");
  d.textContent = text ?? "";
  return d.innerHTML;
}

// (1) Load the data. NOTE: fetch() needs a local server, see README.md.
fetch("psychologists.json")
  .then(r => r.json())
  .then(data => { everyone = data; buildMindLines(); render(); })
  .catch(() => {
    peopleList.innerHTML = '<p class="empty">couldn\'t load the list. see README (local server).</p>';
  });

// (2) Build the tappable lines
function buildMindLines() {
  const all = [...MIND_LINES, { label: "show everyone", concern: null }];
  all.forEach(item => {
    const b = document.createElement("button");
    b.className = "mind-item";
    b.textContent = item.label;
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => {
      // tapping the same line again clears it
      selected = (selected === item.concern) ? null : item.concern;
      [...mindList.children].forEach(x => x.setAttribute("aria-pressed", "false"));
      if (selected) b.setAttribute("aria-pressed", "true");
      render();
      document.getElementById("people").scrollIntoView({ behavior: "smooth" });
    });
    mindList.appendChild(b);
  });
}

// (3) Show the matching psychologists
function render() {
  const shown = everyone.filter(p =>
    !selected || p.concerns.some(c => c.toLowerCase() === selected.toLowerCase())
  );

  peopleCount.textContent = shown.length === 1 ? "one psychologist" : shown.length + " psychologists";

  if (shown.length === 0) {
    peopleList.innerHTML = '<p class="empty">no one listed for this yet. try another line.</p>';
    return;
  }

  peopleList.innerHTML = shown.map(p => `
    <article class="person reveal">
      <div class="portrait">
        ${p.photo ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}">` : esc(p.name.trim()[0])}
      </div>
      <div>
        <h2>${esc(p.name)}</h2>
        <p class="title">${esc(p.title)}</p>
        <p class="line">${esc(p.line)}</p>
        <p class="facts">${esc(p.languages.join(" · "))} &nbsp;/&nbsp; ${esc(p.mode.join(" · "))} &nbsp;/&nbsp; ${esc(p.city)} &nbsp;/&nbsp; ${esc(p.price)}</p>
        <p class="concerns">${esc(p.concerns.join(" · "))}</p>
        ${p.licence_checked ? '<p class="checked">licence checked</p>' : ""}
        <a class="hello" href="${esc(p.contact)}" target="_blank" rel="noopener">say hello</a>
      </div>
    </article>`).join("");

  observeReveals();
}

// Gentle fade-in as things scroll into view
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
}, { threshold: 0.15 });

function observeReveals() {
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}
observeReveals();
