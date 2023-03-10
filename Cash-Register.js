/*
A function that takes in three parameters: price of the item purchased, cash given by customer and a set of arrays representing the cash in the register.
It then returns three different results based on the availability of cash and the ability to procure change.
*/

function checkCashRegister(price, cash, cid) {
  let cashToReturn = parseFloat(cash - price.toFixed(2));
  let cur = {
    "PENNY" :	0.01,
    "NICKEL" : 0.05,
    "DIME" : 0.1,
    "QUARTER"	: 0.25,
    'ONE' : 1.0,
    'FIVE' : 5.0,
    'TEN' : 10.0,
    'TWENTY' :	20.0,
    'ONE HUNDRED': 100.0
  }
  let newCash = cid.map(x => [x[0],x[1],parseFloat(cur[x[0]].toFixed(2))]);
  let change = [];
  const insufFunds = {'status':'INSUFFICIENT_FUNDS', 'change':[]};
  const exFunds = {'status': 'CLOSED', 'change':[...cid]};
  const moreFunds = {'status': 'OPEN', 'change':[]};

/* run a loop which starts from the highest number and goes down to the last one while giving back change. */
  for(let i=newCash.length-1; i>=0; i--){
    if(newCash[i][2]<=cashToReturn && newCash[i][1]>0){
      let givenChange = 0.0;
      while(cashToReturn>0 && newCash[i][1]>0 && cashToReturn>=newCash[i][2]){
        givenChange = parseFloat((givenChange + newCash[i][2]).toFixed(2));
        cashToReturn = parseFloat((cashToReturn-newCash[i][2]).toFixed(2));
        newCash[i][1] = parseFloat((newCash[i][1]-newCash[i][2]).toFixed(2));
        console.log(cashToReturn);
      }
      change.push([newCash[i][0],givenChange])
    }
  }
  
  let sum = newCash.reduce((a,b) => a+b[1],0);

  if(cashToReturn>0){
    return insufFunds;
  } else if (cashToReturn == 0 && sum>0){
    moreFunds['change'] = change;
    return moreFunds;
  } else if (cashToReturn == 0 && sum == 0){
    return exFunds;
  }

}


checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
