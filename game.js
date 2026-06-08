const output = document.getElementById("output");
const input = document.getElementById("input");

let state = "welcome";
let challenges = [];
let currentChallenge = null;
let active = true;

function print(text) {
  output.innerHTML += text + "\n";
  window.scrollTo(0, document.body.scrollHeight);
}

async function loadCSV() {
  const res = await fetch(window.NODE_FILE);
  if (!res.ok) {
    print(`[ERROR] Could not load CSV: ${window.NODE_FILE}`);
    challenges = [];
    return;
  }
  const text = await res.text();
  const rows = text.trim().split("\n").slice(1);
  challenges = rows.map(row => {
    const [title, description] = row.split(",");
    return { title, description };
  });
}

function randomChallenge() {
  return challenges[Math.floor(Math.random() * challenges.length)];
}

function killSession() {
  active = false;
  input.disabled = true;
}

function welcome() {
  print("=== 44 NODES - SECURE TERMINAL ===");
  print("Welcome PLAYER");
  print("Type 'ready' to request assignment.");
}

input.addEventListener("keydown", e => {
  if (e.key !== "Enter" || !active) return;

  const value = input.value.trim().toLowerCase();

  print(">> " + value);

  input.value = "";

  if (state === "welcome") {
    if (value === "ready") {
      currentChallenge = randomChallenge();

      print("");
      print("[CHALLENGE FOUND]");
      print("ASSIGNMENT: " + currentChallenge.title);
      print(currentChallenge.description);
      print("");
      print("Type 'accept' or 'decline'");

      state = "challenge";
    } else {
      print("Unknown command.");
    }
  }

  else if (state === "challenge") {

    if (value === "accept") {

      print("");
      print("[RULES]");
      print("- Do not disclose assignment");
      print("- Maintain terminal secrecy");
      print("- Send proof of mission to HQ");
      print("- Type 'logout' to terminate session");

      state = "accepted";
    }

    else if (value === "decline") {

      print("");
      print("Assignment declined.");
      print("Wait 7 minutes before requesting another challenge.");
      print("Session terminated.");

      killSession();
    }

    else {
      print("Type 'accept' or 'decline'");
    }
  }

  else if (state === "accepted") {

    if (value === "logout") {

      print("");
      print("Session terminated.");

      killSession();
    } else {
      print("Command not recognized.");
    }
  }
});

(async function init() {
  await loadCSV();
  if (challenges.length > 0) {
    welcome();
  } else {
    print("No challenges available for this node.");
    killSession();
  }
})();
