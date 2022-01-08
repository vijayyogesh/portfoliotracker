export async function getHoldings(userInput) {
  return fetch("http://localhost:3005/PortfolioApis/getuserholdings", {
    method: "POST",
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJBcGlVc2VycyIsImF1dGhvcml6ZWQiOnRydWUsImNsaWVudCI6IlZpamF5IDEwNiIsImV4cCI6MTY0MTc4NTM5OSwiaXNzIjoiUG9ydGZvbGlvQXBpc0FwcCJ9.ou6ArZJprOOlKTdrwgkZW8vsky048zKR14gZM8JEaM4",
    },
    body: JSON.stringify({
      UserId: "Vijay 106",
    }),
  });
  /* .then((data) => {
      console.log("RESPONSE 1 -- " + data);
    });*/
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
