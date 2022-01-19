export function getHoldings(userInput) {
  //await sleep(2000);
  return fetch("http://localhost:3005/PortfolioApis/getuserholdings", {
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
  return fetch("http://localhost:3005/PortfolioApis/login", {
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
  return fetch("http://localhost:3005/PortfolioApis/fetchallcompanies", {
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
