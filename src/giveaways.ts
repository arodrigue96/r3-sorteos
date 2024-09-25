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

export const listGiveaways = (): void => {
  if (programData.giveaways.length > 0) {
    console.log(
      `Éstos son los ${programData.giveaways.length} sorteos disponibles:`
    );

    for (let counter = 0; counter < programData.giveaways.length; counter++) {
      const giveaway = programData.giveaways[counter];
      console.log(`${counter + 1}. Sorteo de un ${giveaway.name}`);
    }
  } else {
    console.log("No hay sorteos disponibles en este momento");
  }
};

export const deleteGiveaway = (positionToDelete: number): void => {
  if (positionToDelete <= programData.giveaways.length) {
    programData.giveaways.splice(positionToDelete - 1, 1);
    console.log("Has eliminado el sorteo con existo");
  } else {
    console.log("No hay ningún sorteo en la posición indicada");
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
    console.log("¡Te has inscrito al sorteo correctamente!");
  } else {
    console.log(
      "El sorteo no existe, dime otro número de sorteo para inscribirte"
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
    console.log("No estás inscrito en ningún sorteo.");
  } else {
    console.log(
      `Estás inscrito en los siguientes ${userGiveaways.length} sorteos`
    );

    for (let index = 0; index < userGiveaways.length; index++) {
      const giveaway = userGiveaways[index];
      console.log(
        `${index + 1}. Sorteo de un ${giveaway.name} en ${
          giveaway.socialNetwork
        }`
      );
    }
  }
};
