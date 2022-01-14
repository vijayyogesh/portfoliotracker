import React from "react";

function HoldingsList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Qty</th>
          <th>Buy Price</th>
          <th>LTP</th>
          <th>Current Val</th>
          <th>PL</th>
          <th>Net %</th>
        </tr>
      </thead>
      <tbody>
        {props.holdings.Holdings.map((holding) => {
          return (
            <tr>
              <td>{holding.companyid}</td>
              <td>{holding.quantity}</td>
              <td>{holding.buyPrice}</td>
              <td>{holding.ltp}</td>
              <td>{holding.currentValue}</td>
              <td>{holding.pl}</td>
              <td>{holding.netPct}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default HoldingsList;
