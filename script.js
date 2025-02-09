document.getElementById('expenseForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var expenseName = document.getElementById('expenseName').value;
  var expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
  var expensePrice = parseFloat(document.getElementById('expensePrice').value);
  var expenseDate = document.getElementById('expenseDate').value;

  var expense = {
      name: expenseName,
      amount: expenseAmount,
      price: expensePrice,
      date: expenseDate
  };

  fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(expense)
  }).then(response => {
      if (response.ok) {
          alert('Expense saved successfully!');
          document.getElementById('expenseForm').reset();
          addExpenseToList(expense);
      } else {
          alert('Failed to save expense');
      }
  }).catch(error => {
      console.error('Error:', error);
  });
});

function addExpenseToList(expense) {
  var expenseList = document.getElementById('expenseList');
  var listItem = document.createElement('li');
  listItem.textContent = `Name: ${expense.name}, Amount: ${expense.amount}, Price: $${expense.price}, Date: ${expense.date}`;
  expenseList.appendChild(listItem);
}

window.onload = function() {
  fetch('http://localhost:5000/api/expenses')
  .then(response => response.json())
  .then(expenses => {
      expenses.forEach(expense => addExpenseToList({
          name: expense[1], // Assuming expense format is [(id, name, amount, date)...]
          amount: expense[2],
          price: expense[3],
          date: expense[4]
      }));
  })
  .catch(error => console.error('Error fetching expenses:', error));
};
