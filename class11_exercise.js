const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let users = [];
let banned = [];
let settings = {
  addRegistry: true,
  checkRegistry: true,
  banPerson: true,
  checkBans: true,
};

function AddUserToRegistry() {
  readline.question("enter the name of the user to register: ", (userName) => {
    let checkBan = false;

    // Check if user is in the banned list
    for (let i = 0; i < banned.length; i++) {
      if (banned[i] === userName) {
        checkBan = true;
        break;
      }
    }

    // Add user if not banned and setting allows it
    if (!checkBan && settings.addRegistry) {
      users.push(userName);
      console.log(`${userName} has been added to the registry.`);
    } else if (checkBan) {
      console.log(`Cannot add ${userName}. This user is banned.`);
    } else {
      console.log(`adding users is currently disabled in the settings.`);
    }
  });
}

function CheckRegistry() {
  if (settings.checkRegistry) {
    console.log("Registered Users:");
    for (let i = 0; i < users.length; i++) {
      console.log(users[i]);
    }
  } else {
    console.log("checking the registry is currently disabled in the settings.");
  }
}

function BanUser() {
  readline.question("enter the name of the user to ban: ", (userName) => {
    if (settings.banPerson) {
      banned.push(userName);
      console.log(`${userName} has been banned.`);
    } else {
      console.log("banning users is currently disabled in the settings");
    }
  });
}

function CheckBanned() {
  if (settings.checkBans) {
    console.log("banned Users:");
    for (let i = 0; i < banned.length; i++) {
      console.log(banned[i]);
    }
  } else {
    console.log("checking banned users is currently disabled in the settings");
  }
}

function StartApp() {
  readline.question(
    "what would you like to do? (add/check/ban/checkbans/quit): ",
    (_command) => {
      switch (_command) {
        case "add":
          AddUserToRegistry();
          break;
        case "check":
          CheckRegistry();
          break;
        case "ban":
          BanUser();
          break;
        case "checkbans":
          CheckBanned();
          break;
        case "quit":
          readline.close();
          return;
        default:
          console.log("Invalid command. Please try again.");
      }

     
      StartApp();
    }
  );
}

StartApp();

/*
Saahil
This program is well-organized, with separate functions for each task, making it easy to follow. To make it better, you could check for duplicates before adding users or bans and use a faster way to check if a user is banned.*/
