const monsterContainer = document.getElementById("monster-container");
const form = document.getElementById("monster-form");
const loadMoreBtn = document.getElementById("load-more");

let currentPage = 1;

const BASE_URL = "http://localhost:3000/monsters";
const LIMIT = 50;

// Fetch and display monsters
async function fetchMonsters(page) {
  const res = await fetch(`${BASE_URL}?_limit=${LIMIT}&_page=${page}`);
  const monsters = await res.json();
  monsters.forEach(renderMonster);
}

// Display a single monster
function renderMonster(monster) {
  const div = document.createElement("div");
  div.className = "monster";
  div.innerHTML = `
    <h2>${monster.name}</h2>
    <p>Age: ${monster.age}</p>
    <p>${monster.description}</p>
  `;
  monsterContainer.appendChild(div);
}

// Handle new monster creation
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = parseFloat(document.getElementById("age").value);
  const description = document.getElementById("description").value;

  const newMonster = { name, age, description };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newMonster)
  });

  const savedMonster = await res.json();
  renderMonster(savedMonster);
  form.reset();
});

// Load more monsters
loadMoreBtn.addEventListener("click", () => {
  currentPage++;
  fetchMonsters(currentPage);
});

// Initial load
fetchMonsters(currentPage);
