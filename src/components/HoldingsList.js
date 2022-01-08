import React from "react";

function HoldingsList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tbody>
        {props.holdings.Holdings.map((holding) => {
          return (
            <tr>
              <td>{holding.companyid}</td>
              <td>{holding.quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default HoldingsList;
