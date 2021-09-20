// get randon number return
const callRandom = (start, last) => {
  const number = start + Math.floor(Math.random() * last);
  return number;
};

// get
function getCard() {
  const cardNumVal = [2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k", "a"];
  const cardSuVal = ["h", "d", "c", "s"];

  // Get card 1
  const r1 = callRandom(1, cardNumVal.length - 1);
  const r2 = callRandom(1, cardSuVal.length - 1);

  const card = cardSuVal[r2] + cardNumVal[r1];

  return card;
}

function cardnumber1(cardnumber) {
  //new add 2 number
  switch (cardnumber) {
    case "a":
      return 11;
      break;
    case "j":
      return 10;
      break;
    case "q":
      return 10;
      break;
    case "k":
      return 10;
      break;
    case 10:
      return 10;
      break;
    default:
      return cardnumber;
      break;
  }
}

//check if ace
function aceCheck(card_val2) {
  if (card_val2 > 10) {
    return 1;
  } else {
    return 11;
  }
}

function addCards2(Card1_val, Card2_val) {
  return Card1_val + Card2_val;
}

module.exports = { addCards2, aceCheck, getCard, cardnumber1 };
