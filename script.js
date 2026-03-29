// ===== Fantasy Game Final JS + Firebase =====

let coins = 200;
let selectedPlayers = [];
let userName = "";

const playerPoints = {
  Virat: 120,
  Rohit: 95,
  Dhoni: 80,
  Hardik: 70,
  Gill: 100,
  Bumrah: 85,
  Shami: 75
};

// Login + save user in Firebase
async function login() {
  const input = document.getElementById("username");

  if (!input) return;

  userName = input.value.trim();

  if (userName === "") {
    alert("Enter your name");
    return;
  }

  document.getElementById("welcome").innerText =
    "Welcome " + userName + " 👋";

  // Save user in Firebase
  if (window.db) {
    const { doc, setDoc } = await import(
      "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
    );

    await setDoc(doc(window.db, "users", userName), {
      username: userName,
      coins: coins,
      createdAt: new Date()
    });
  }
}

// Add coins + update Firebase
async function addCoins(amount) {
  coins += amount;
  updateCoinsUI();
  await updateCoinsFirebase();
}

function updateCoinsUI() {
  document.getElementById("coins").innerText = coins;
}

async function updateCoinsFirebase() {
  if (!window.db || !userName) return;

  const { doc, updateDoc } = await import(
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
  );

  await updateDoc(doc(window.db, "users", userName), {
    coins: coins
  });
}

// Join contest
async function joinContest() {
  if (coins < 50) {
    alert("Not enough coins");
    return;
  }

  coins -= 50;
  updateCoinsUI();
  await updateCoinsFirebase();

  document.getElementById("contestMsg").innerText =
    "✅ Contest joined successfully";
}

// Select players + save team
async function selectPlayer(el) {
  const name = el.innerText;

  if (el.classList.contains("selected")) {
    el.classList.remove("selected");
    selectedPlayers = selectedPlayers.filter(
      p => p !== name
    );
  } else {
    if (selectedPlayers.length >= 5) {
      alert("Max 5 players allowed");
      return;
    }

    el.classList.add("selected");
    selectedPlayers.push(name);
  }

  document.getElementById("selectedTeam").innerText =
    "Selected: " + selectedPlayers.join(", ");

  calculatePoints();
  await saveTeamFirebase();
}

// Save team in Firebase
async function saveTeamFirebase() {
  if (!window.db || !userName) return;

  const { doc, setDoc } = await import(
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
  );

  await setDoc(doc(window.db, "teams", userName), {
    username: userName,
    team: selectedPlayers,
    updatedAt: new Date()
  });
}

// Calculate points
function calculatePoints() {
  let total = 0;

  selectedPlayers.forEach(player => {
    total += playerPoints[player] || 0;
  });

  document.getElementById("myPoints").innerText = total;

  let rank = 1;

  if (total < 500) rank = 3;
  if (total < 450) rank = 5;
  if (total < 300) rank = 10;

  document.getElementById("myRank").innerText = rank;
}

// Withdraw
async function withdraw() {
  const upi = document.getElementById("upi").value;

  if (!upi) {
    alert("Enter UPI ID");
    return;
  }

  if (coins < 100) {
    alert("Not enough coins");
    return;
  }

  coins -= 100;
  updateCoinsUI();
  await updateCoinsFirebase();

  document.getElementById("withdrawMsg").innerText =
    "✅ ₹100 request sent to " + upi;
}

// Winner popup
function closeWinnerPopup() {
  document.getElementById("winnerOverlay").style.display = "none";
  document.getElementById("winnerPopup").style.display = "none";
}

updateCoinsUI();
