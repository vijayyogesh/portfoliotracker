export async function getHoldings(userInput) {
  await sleep(2000);
  return fetch("http://localhost:3005/PortfolioApis/getuserholdings", {
    method: "POST",
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJBcGlVc2VycyIsImF1dGhvcml6ZWQiOnRydWUsImNsaWVudCI6IlZpamF5IDExMyIsImV4cCI6MTY0MjA0MDM1OSwiaXNzIjoiUG9ydGZvbGlvQXBpc0FwcCJ9.GZKPfscDo6TkJoIxSplNRTSekSfeEPIJ_3DOT60UaiQ",
    },
    body: JSON.stringify({
      UserId: "Vijay 113",
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
