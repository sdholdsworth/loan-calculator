//Utilize 'Strict' Mode
'use strict';

//Submit Event Listener
document.querySelector('#loan-form').addEventListener('submit', (e) => {
  
  //Hide Results
  document.querySelector('#results').style.display = 'none';
  //Show Loading Image
  document.querySelector('#loading').style.display = 'block';
  //Show loader for 2secs only (for better UI experience)
  setTimeout(calculateResults, 2000);
  //Prevent default behaviour on submit input
  e.preventDefault();

});

//Calculate Results
const calculateResults = () => {

  //Variables for UI
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  //User Entered Values (Formulas taken from external resource)
  const principal = parseFloat(amount.value); //parse the desired loan amount entered to a float value
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Result Calculations
  //calculation for monthly repayment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  //check to see if monthly repayment value is finite (if so display results in result fields)
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    //Show results and hide loading icon if result is finite and valid
    document.querySelector('#results').style.display = 'block';
    document.querySelector('#loading').style.display = 'none';
  } else {
    displayError(
      'Oops, something went wrong... Please check the values entered'
    );
  }
}

const displayError = (error) => {
  //Hide Results
  document.querySelector('#results').style.display = 'none';

  //Hide Loading Image
  document.querySelector('#loading').style.display = 'none';

  //Create error Div
  const errorDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const result = document.querySelector('#results');

  //Add classes alert and alert-danger to the errorDiv (required in Bootstrap)
  errorDiv.className = 'alert alert-danger';

  //Create textNode and append to the errorDiv element:
  errorDiv.appendChild(document.createTextNode(error));

  //Insert Error (above heading)
  card.insertBefore(errorDiv, result);

  //Clear Error after some time (better UI experience)
  setTimeout(autoClearError, 3500);

  //Clear Error
  const autoClearError = () => {
    errorDiv.remove();
  }
}
