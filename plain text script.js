// ===== Fantasy Game Final JS =====

let coins = 200;
let selectedPlayers = [];
let userName = "";

// Player points data
const playerPoints = {
    Virat: 120,
    Rohit: 95,
    Dhoni: 80,
    Hardik: 70,
    Gill: 100,
    Bumrah: 85,
    Shami: 75
};

// Login
function login() {
    const input = document.getElementById("username");

    if (!input) return;

    userName = input.value.trim();

    if (userName === "") {
        alert("Enter your name");
        return;
    }

    const welcome = document.getElementById("welcome");
    if (welcome) {
        welcome.innerText = "Welcome " + userName + " 👋";
    }
}

// Add coins
function addCoins(amount) {
    coins += amount;
    updateCoinsUI();
}

// Update wallet UI
function updateCoinsUI() {
    const coinEl = document.getElementById("coins");
    if (coinEl) {
        coinEl.innerText = coins;
    }
}

// Join contest
function joinContest() {
    if (coins < 50) {
        alert("Not enough coins");
        return;
    }

    coins -= 50;
    updateCoinsUI();

    const msg = document.getElementById("contestMsg");
    if (msg) {
        msg.innerText = "✅ Contest joined successfully";
    }
}

// Select player
function selectPlayer(el) {
    const name = el.innerText;

    if (el.classList.contains("selected")) {
        el.classList.remove("selected");
        selectedPlayers = selectedPlayers.filter(
            player => player !== name
        );
    } else {
        if (selectedPlayers.length >= 5) {
            alert("Max 5 players allowed");
            return;
        }

        el.classList.add("selected");
        selectedPlayers.push(name);
    }

    const team = document.getElementById("selectedTeam");
    if (team) {
        team.innerText =
            "Selected: " + selectedPlayers.join(", ");
    }

    calculatePoints();
}

// Calculate points
function calculatePoints() {
    let total = 0;

    selectedPlayers.forEach(player => {
        total += playerPoints[player] || 0;
    });

    const pointsEl = document.getElementById("myPoints");
    if (pointsEl) {
        pointsEl.innerText = total;
    }

    let rank = 1;

    if (total < 500) rank = 3;
    if (total < 450) rank = 5;
    if (total < 300) rank = 10;

    const rankEl = document.getElementById("myRank");
    if (rankEl) {
        rankEl.innerText = rank;
    }
}

// Withdraw
function withdraw() {
    const upi = document.getElementById("upi");

    if (!upi || upi.value.trim() === "") {
        alert("Enter UPI ID");
        return;
    }

    if (coins < 100) {
        alert("Not enough coins");
        return;
    }

    coins -= 100;
    updateCoinsUI();

    const msg = document.getElementById("withdrawMsg");
    if (msg) {
        msg.innerText =
            "✅ ₹100 request sent to " + upi.value;
    }
}

// Winner popup
function showWinnerPopup() {
    const rank =
        parseInt(document.getElementById("myRank")?.innerText) || 10;

    const points =
        parseInt(document.getElementById("myPoints")?.innerText) || 0;

    let prize = 500;

    if (rank === 1) prize = 5000;
    else if (rank <= 3) prize = 2000;
    else if (rank <= 10) prize = 500;

    coins += prize;
    updateCoinsUI();

    document.getElementById("winnerRank").innerText = rank;
    document.getElementById("winnerPoints").innerText = points;
    document.getElementById("winnerPrize").innerText = prize;

    document.getElementById("winnerOverlay").style.display = "block";
    document.getElementById("winnerPopup").style.display = "block";
}

// Close popup
function closeWinnerPopup() {
    document.getElementById("winnerOverlay").style.display = "none";
    document.getElementById("winnerPopup").style.display = "none";
}

// Auto live score update
setInterval(() => {
    const scoreEl = document.getElementById("liveScore");

    if (scoreEl) {
        const runs = 180 + Math.floor(Math.random() * 20);
        const wickets = Math.floor(Math.random() * 5);
        const ball = Math.floor(Math.random() * 6);

        scoreEl.innerText =
            "IND " + runs + "/" + wickets + " (19." + ball + ")";
    }

    selectedPlayers.forEach(player => {
        playerPoints[player] += Math.floor(Math.random() * 10);
    });

    calculatePoints();
}, 5000);

// Winner after 30 sec
setTimeout(() => {
    const popup = document.getElementById("winnerPopup");
    if (popup) {
        showWinnerPopup();
    }
}, 30000);

// Init
updateCoinsUI();
