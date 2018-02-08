// Ui elments 
const calcForm = document.querySelector('#calc-form'),
      totalAmount = document.querySelector('#total-amount'),
      dividedBY = document.querySelector('#divide-by'),
      tipPercent = document.querySelector('#percent'),
      calculateBtn = document.querySelector('#calculate'),
      userInputs = document.querySelectorAll('input:not(:last-child)'),
      errorDiv = document.querySelector('.errors');

// Event listeners
calcForm.addEventListener('submit', calculateBill);
document.body.addEventListener('mousedown', restartTipCalc);

// validate inputs and proceed to generate tip
function calculateBill(e){
     let amount = parseFloat(totalAmount.value);
         divide = parseInt(dividedBY.value);
         percentage = parseInt(tipPercent.value)/100;

      if (isNaN(amount) || amount < 0) {
            errorMesg('Enter a vaild total');  
      } 

       if (isNaN(percentage) || percentage < 0) {
            errorMesg('Enter a vaild percentage'); 
      }

      if (isNaN(divide) || divide < 0) {
            errorMesg('Enter a vaild number of people');    
      }
      
      if (!isNaN(amount) && !isNaN(percentage) && !isNaN(divide) 
      && amount > 0 && percentage > 0 && divide > 0) 
            { 
            generateTip(amount, divide, percentage);
      }

e.preventDefault();
}

// generates tip & displays results
function generateTip(amt, div, per){
      
      //generates tip total
      let tipTotal = amt * per;      

      //generates total bill / party size
      let grandTotal = (tipTotal + amt) / div;
      
      // created element for displaying results
      let resultsDiv = document.querySelector('.results') ;
      let results = document.createElement('span');
      results.className = "card-title";

      // displays results
      results.innerHTML = 
      `Your tip is $${tipTotal.toFixed(2)}<br>
       Your bill is $${grandTotal.toFixed(2)}`;

      resultsDiv.appendChild(results);
      resultsDiv.style.marginTop = '10px';

      // disable user input 
      userInputs.forEach(function(input){
      input.disabled = true;
      });
      restartClass();
}

//display error messages
function errorMesg(msg){
      let error = document.createElement('p');
      error.innerHTML = msg;
      error.className = 'errrr';
      errorDiv.appendChild(error);

      //error style & disable calculate btn
      errorDiv.style.color = '#f44336';
      errorDiv.style.marginLeft = '10px';
      calculateBtn.disabled = true;
      setTimeout(clearError, 3000);
}

// removes error messages
function clearError(){
      document.querySelector('.errrr').remove();  
      calculateBtn.disabled = false;
}

 // appends class name of restart to submit btn
function restartClass(){
      calculateBtn.value = 'Restart';
      calculateBtn.className += ' restart';   
      errorDiv.style.display = 'none';
}

// Restarts tip calculator
function restartTipCalc(e){
      if (e.target.className == 'btn restart') {
          window.location.reload();  
      }
}
