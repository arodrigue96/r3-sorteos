import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const userLoginData = programData.users.find(
    (user) => user.email === email && user.password === password
  );

  if (!userLoginData) {
    console.log("\nError: Usuario o contraseña incorrectos");
    process.exit(1);
  }

  programData.userEmail = userLoginData.email;
  programData.isAdmin = userLoginData.isAdmin;

  saveData();

  console.log(`\nHola, ${userLoginData.name}!`);
};

export const createGiveaway = (): void => {
  const askAdminGiveawayInfo = askUserNewGiveawayData();

  const giveawayData: Giveaway = {
    name: askAdminGiveawayInfo.giveawayName,
    socialNetwork: askAdminGiveawayInfo.giveawaySocialNetwork,
    participants: [],
  };

  programData.giveaways.push(giveawayData);

  saveData();

  console.log("\nEl sorteo se ha creado correctamente");
};

export const listGiveaways = (): void => {
  if (programData.giveaways.length > 0) {
    console.log(
      `\nÉstos son los ${programData.giveaways.length} sorteos disponibles:\n`
    );

    for (let counter = 0; counter < programData.giveaways.length; counter++) {
      const giveaway = programData.giveaways[counter];
      console.log(`${counter + 1}. Sorteo de un ${giveaway.name}`);
    }
  } else {
    console.log("\nNo hay sorteos disponibles en este momento");
  }
};

export const deleteGiveaway = (positionToDelete: number): void => {
  if (positionToDelete <= programData.giveaways.length) {
    programData.giveaways.splice(positionToDelete - 1, 1);
    console.log("\n¡Has eliminado el sorteo con existo!");
  } else {
    console.log("\nNo hay ningún sorteo en la posición indicada.");
  }
  saveData();
};

export const enterGiveaway = (giveawayNumberToSign: number): void => {
  const userData = {
    name: "",
    email: programData.userEmail,
    password: "",
    isAdmin: programData.isAdmin,
  };

  if (giveawayNumberToSign <= programData.giveaways.length) {
    programData.giveaways[giveawayNumberToSign - 1].participants.push(userData);
    console.log("\n¡Te has inscrito al sorteo correctamente!");
  } else {
    console.log(
      "\nEl sorteo no existe, dime otro número de sorteo para inscribirte"
    );
  }
  saveData();
};

export const listUserGiveaways = (): void => {
  const userEmail = programData.userEmail;
  const userGiveaways: Giveaway[] = [];

  programData.giveaways.forEach((giveaway) => {
    const isUserInGiveaway = giveaway.participants.some(
      (participant) => participant.email === userEmail
    );

    if (isUserInGiveaway) {
      userGiveaways.push(giveaway);
    }
  });

  if (userGiveaways.length === 0) {
    console.log("\nNo estás inscrito en ningún sorteo.");
  } else {
    console.log(
      `\nEstás inscrito en los siguientes ${userGiveaways.length} sorteos:\n`
    );

    for (
      let userGiveawayPosition = 0;
      userGiveawayPosition < userGiveaways.length;
      userGiveawayPosition++
    ) {
      const giveaway = userGiveaways[userGiveawayPosition];
      console.log(
        `${userGiveawayPosition + 1}. Sorteo de un ${giveaway.name} en ${
          giveaway.socialNetwork
        }`
      );
    }
  }
};
