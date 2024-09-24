import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const userLoginData = programData.users.find(
    (user) => user.email === email && user.password === password
  );

  if (!userLoginData) {
    console.log("Error: Usuario o contraseña incorrectos");
    process.exit(1);
  }

  programData.userEmail = userLoginData.email;
  programData.isAdmin = userLoginData.isAdmin;

  saveData();

  console.log(`Hola, ${userLoginData.name}!`);
};

export const createGiveaway = (): void => {
  const giveawayInfo = askUserNewGiveawayData();

  const giveawayData: Giveaway = {
    name: giveawayInfo.giveawayName,
    socialNetwork: giveawayInfo.giveawaySocialNetwork,
    participants: [],
  };

  programData.giveaways.push(giveawayData);
  saveData();

  console.log("El sorteo se ha creado correctamente");
};
