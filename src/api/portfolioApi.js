export function getHoldings(userInput) {
  //await sleep(2000);
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

export function addHoldings(userInput, holdings) {
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

export function getNetworth(userInput, holdings) {
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

/* Fetch Model Portfolio */
export function getModelPortfolio(userInput) {
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
