export function getHoldings(userInput) {
  return fetch("http://localhost:3005/PortfolioApis/getuserholdings", {
    method: "POST",
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJBcGlVc2VycyIsImF1dGhvcml6ZWQiOnRydWUsImNsaWVudCI6IlZpamF5IDEwNiIsImV4cCI6MTY0MTUyNjAyMywiaXNzIjoiUG9ydGZvbGlvQXBpc0FwcCJ9.E6z2lKUzEsRBL8TKaldeHfPBFyIvna49pyLB0nwoygc",
    },
    body: JSON.stringify({
      UserId: "Vijay 106",
    }),
  }).then((response) => console.log(response));
}
