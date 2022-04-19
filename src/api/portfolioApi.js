import {
  allCompanies,
  holdings,
  modelPf,
  netWorth,
  syncModelPf,
} from "../tools/mockData";

export function getHoldings(userInput) {
  if (process.env.REACT_APP_DEMO === "Y") {
    return holdings;
  } else {
    return fetch(process.env.REACT_APP_API_URL + "/getuserholdings", {
      method: "POST",
      headers: {
        token: userInput.Token,
      },
      body: JSON.stringify({
        UserId: userInput.UserId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export async function getToken(userInput) {
  return fetch(process.env.REACT_APP_API_URL + "/login", {
    method: "POST",
    body: JSON.stringify({
      UserId: userInput.UserId,
      password: userInput.password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function fetchAllCompanies(userInput) {
  if (process.env.REACT_APP_DEMO === "Y") {
    return allCompanies;
  } else {
    return fetch(process.env.REACT_APP_API_URL + "/fetchallcompanies", {
      method: "POST",
      headers: {
        token: userInput.Token,
      },
      body: JSON.stringify({
        UserId: userInput.UserId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export function addHoldings(userInput, holdings) {
  if (process.env.REACT_APP_DEMO === "Y") {
    return "No changes for dummy data";
  } else {
    return fetch(process.env.REACT_APP_API_URL + "/adduserholdings", {
      method: "POST",
      headers: {
        token: userInput.Token,
      },
      body: JSON.stringify({
        userId: userInput.UserId,
        Holdings: holdings,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export function getNetworth(userInput, holdings) {
  if (process.env.REACT_APP_DEMO === "Y") {
    return netWorth;
  } else {
    return fetch(process.env.REACT_APP_API_URL + "/fetchnetworthoverperiod", {
      method: "POST",
      headers: {
        token: userInput.Token,
      },
      body: JSON.stringify({
        userId: userInput.UserId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

/* Fetch Model Portfolio */
export function getModelPortfolio(userInput) {
  if (process.env.REACT_APP_DEMO === "Y") {
    return modelPf;
  } else {
    return fetch(process.env.REACT_APP_API_URL + "/getmodelportfolio", {
      method: "POST",
      headers: {
        token: userInput.Token,
      },
      body: JSON.stringify({
        UserId: userInput.UserId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

/* Sync Model Portfolio */
export function getSyncModelPortfolio(userInput) {
  if (process.env.REACT_APP_DEMO === "Y") {
    return syncModelPf;
  } else {
    return fetch(process.env.REACT_APP_API_URL + "/syncportfolio", {
      method: "POST",
      headers: {
        token: userInput.Token,
      },
      body: JSON.stringify({
        UserId: userInput.UserId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
