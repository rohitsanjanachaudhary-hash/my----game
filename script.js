let selectedPlayers = [];

function selectPlayer(name) {
    if (selectedPlayers.includes(name)) {
        selectedPlayers = selectedPlayers.filter(p => p !== name);
    } else {
        if (selectedPlayers.length < 11) {
            selectedPlayers.push(name);
        } else {
            alert("Sirf 11 players select kar sakte ho");
            return;
        }
    }

    updateTeam();
}

function updateTeam() {
    const teamBox = document.getElementById("selected-team");
    teamBox.innerHTML = selectedPlayers.join(", ");
}

function submitTeam() {
    if (selectedPlayers.length !== 11) {
        alert("Please select exactly 11 players");
        return;
    }

    alert("Team Submitted Successfully!");
    console.log(selectedPlayers);
}
