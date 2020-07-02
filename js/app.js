var startTotal = 0;
var incomeTotal = 0;
var expenseTotal = 0;
var balanceTotal = 0;
var itemList = [];
var itemNumber = 0;
var tableRow = 1;
function error() {
  document.querySelector('.error').style.display = 'block';
  setTimeout(function(){
    document.querySelector('.error').style.display = 'none';
  }, 3000);
}

function changeColSize(oldSize, newSize) {
  document.getElementById('start-square').classList.remove(oldSize);
  document.getElementById('start-square').classList.add(newSize);

  document.getElementById('income-square').classList.remove(oldSize);
  document.getElementById('income-square').classList.add(newSize);

  document.getElementById('expense-square').classList.remove(oldSize);
  document.getElementById('expense-square').classList.add(newSize);

  document.getElementById('balance-square').classList.remove(oldSize);
  document.getElementById('balance-square').classList.add(newSize);
}
function  reset() {
  startTotal = 0;
  incomeTotal = 0;
  expenseTotal = 0;
  balanceTotal = 0;
  itemList = [];
  itemNumber = 0;
  tableRow = 1;
  document.getElementById('balance-square').style.color = 'black';
  document.getElementById('start-amount').innerHTML = '0';
  document.getElementById('income-amount').innerHTML = '0';
  document.getElementById('expense-amount').innerHTML = '0';
  document.getElementById('balance-amount').innerHTML = '0';
  var table = document.getElementById('data');
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }


}
function  budgetMode() {
  reset();
  document.getElementById('start-h3').innerHTML = 'Budget';
  document.getElementById('start-text').innerHTML = 'Please Enter Starting Budget Amount';
  document.getElementById('income-form').style.display = 'none';
  document.getElementById('income-square').style.display = 'none';
  changeColSize('col-3', 'col-4');
}
function  moneyMode() {
  reset();
  document.getElementById('start-h3').innerHTML = 'Starting Balance';
  document.getElementById('start-text').innerHTML = 'Please Enter Starting Balance Amount';
  document.getElementById('income-form').style.display = 'block'
  document.getElementById('income-square').style.display = 'block';
  changeColSize('col-4', 'col-3');
}
function checkBalance(value) {
  if (value == 0) {
    document.getElementById('balance-square').style.color = 'black';
  }
  else if (value > 0) {
    document.getElementById('balance-square').style.color = 'green';
  }
  else {
    document.getElementById('balance-square').style.color = 'red';
  }
}
function updateBalance(obj) {
  if (obj.mode == 'add') {
    balanceTotal += value;
  }
}
function submitStart() {
  startTotal = parseInt(document.getElementById('start-input').value);
  if (startTotal === '' || startTotal < 0) {
    error();
  }
  else {
    let start = {
      id: itemNumber,
      name: 'Starting Balance',
      value: startTotal,
      mode: 'add'
    }
    itemNumber++;
    document.getElementById('start-amount').innerHTML = startTotal;
    document.getElementById('start-input').value = '';
    //maybe an add and subtract function
    balanceTotal += startTotal;
    document.getElementById('balance-amount').innerHTML = balanceTotal;
    checkBalance(balanceTotal);
    addRow(start);
  }
}
function submitIncome() {
  var incomeName = document.getElementById('income-name-input').value;
  var incomeValue = parseInt(document.getElementById('income-number-input').value);
  if (incomeName === '' || incomeValue < 0 || incomeValue === '') {
    error();
  }
  else {
    let income = {
      id: itemNumber,
      name: incomeName,
      value: incomeValue,
      mode: 'add'
    }
    incomeTotal += incomeValue;
    balanceTotal += incomeValue;
    //function to combine all of these doc element maybe
    document.getElementById('income-amount').innerHTML = incomeTotal;
    document.getElementById('balance-amount').innerHTML = balanceTotal;
    checkBalance(balanceTotal);
    itemNumber++;
    itemList.push(income);
    document.getElementById('income-name-input').value = '';
    document.getElementById('income-number-input').value = '';
    addRow(income);
  }
}
function submitExpense() {
  var expenseName = document.getElementById('expense-name-input').value;
  var expenseValue = parseInt(document.getElementById('expense-number-input').value);
  if (expenseName === '' || expenseValue < 0 || expenseValue === '') {
    error();
  }
  else {
    let expense = {
      id: itemNumber,
      name: expenseName,
      value: expenseValue,
      mode: 'subtract'
    }
    expenseTotal += expenseValue;
    balanceTotal -= expenseValue;
    document.getElementById('expense-amount').innerHTML = expenseTotal;
    document.getElementById('balance-amount').innerHTML = balanceTotal;
    checkBalance(balanceTotal);
    itemNumber++;
    itemList.push(expense);
    document.getElementById('expense-name-input').value = '';
    document.getElementById('expense-number-input').value = '';
    addRow(expense);
  }
}
function addRow(obj) {
  var table = document.getElementById('data');
  var row = table.insertRow(tableRow);
  if (obj.mode == 'add') {
    row.style.color = 'green';
  }
  else {
    row.style.color = 'red';
  }
  //maybe add column numerating
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = obj.name;
  cell2.innerHTML = '$' + obj.value;
  cell3.innerHTML = '$' + balanceTotal;
  tableRow++;
}
function exportToExcel(filename = '') {
  var downloadLink;
  var table = document.getElementById('data');
  var dataType = 'application/vnd.ms-excel';
  var tableHTML = table.outerHTML.replace(/ /g, '%20').replace(/#/g, '%23');

  filename = filename?filename+'.xls':'excel_data.xls';
  // Create download link element
  downloadLink = document.createElement('a');

  document.body.appendChild(downloadLink);

  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
}
function eventListeners() {
  //EVENTS
  const budgetButton = document.getElementById('budget-button');
  const moneyButton = document.getElementById('money-button');
  const resetButton = document.getElementById('reset-button');
  const startForm = document.getElementById('start-form');
  const incomeForm = document.getElementById('income-form');
  const expenseForm = document.getElementById('expense-form');
  const exportTable = document.getElementById('export-button');
  const dataList = document.getElementById('data');



  //Budget Mode
  budgetButton.addEventListener('click', function(event){
    event.preventDefault();
    budgetMode();
  })

  //Money Tracking Mode
  moneyButton.addEventListener('click', function(event){
    event.preventDefault();
    moneyMode();
  })
  resetButton.addEventListener('click', function(event){
    event.preventDefault();
    reset();
  })
  startForm.addEventListener('submit', function(event){
    event.preventDefault();
    submitStart();
  })
  incomeForm.addEventListener('submit', function(event){
    event.preventDefault();
    submitIncome();
  })
  expenseForm.addEventListener('submit', function(event){
    event.preventDefault();
    submitExpense();
})
exportTable.addEventListener('click', function(event){
  event.preventDefault();
  exportToExcel();
})
}

document.addEventListener('DOMContentLoaded', function(){
  eventListeners();
})
