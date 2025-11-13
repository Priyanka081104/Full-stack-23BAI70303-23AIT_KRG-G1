let amount = 0;
const amountEl = document.getElementById('amount');
const depositBtn = document.getElementById('depositBtn');
const withdrawBtn = document.getElementById('withdrawBtn');
depositBtn.addEventListener('click', function() {
  amount += 10; 
  amountEl.textContent = `$${amount}`;
});
withdrawBtn.addEventListener('click', function() {
  if (amount >= 10) {
    amount -= 10; 
  } else {
    amount = 0;
  }
  amountEl.textContent = `$${amount}`;
}); 
