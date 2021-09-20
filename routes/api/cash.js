function CashGame(user_id, betOn, cashT, status) {
  if (status === "PLAYER LOSE") {
    cashT = cashT - betOn;
  } else if (status === "PLAYER WINS") {
    cashT = cashT + betOn;
  }

  // update the user
}

module.exports = { CashGame };
