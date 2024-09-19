import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

// Task 1. Inicio de sesión
export const loginUser = (email: string, password: string): void => {
  const user = programData.users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    console.log("Error: Usuario o contraseña incorrectos");
    process.exit(1);
  }

  programData.userEmail = user.email;
  programData.isAdmin = user.isAdmin;

  saveData();

  console.log(`Hola, ${user.name}!`);
};
