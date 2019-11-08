//Utilize 'Strict' Mode
'use strict';

//Global Variables

var amount = document.querySelector('#amount');
var interest = document.querySelector('#interest');
var years = document.querySelector('#years');
var monthlyPayment = document.querySelector('#monthly-payment');
var totalPayment = document.querySelector('#total-payment');
var totalInterest = document.querySelector('#total-interest');

//Event Listeners
//Submit Values Entered
document.querySelector('#loan-form').addEventListener('submit', function (e) {
  //Hide Results
  document.querySelector('#results').style.display = 'none';
  //Show Loading Image
  document.querySelector('#loading').style.display = 'block';
  //Show loader for 2secs only (for better UI experience)
  setTimeout(calculateResults, 2000);
  //Prevent default behaviour on submit input
  e.preventDefault();
});
//Clear Results
document.querySelector('#clear-result').addEventListener('click', function () {
  //Hide Results
  document.querySelector('#results').style.display = 'none';
  //Show Loading Image
  document.querySelector('#loading').style.display = 'block';
  //Show loader for 2secs only (for better UI experience)
  setTimeout(function () {
    document.querySelector('#loading').style.display = 'none';
    amount.value = '';
    interest.value = '';
    years.value = '';
    monthlyPayment.value = '';
    totalPayment.value = '';
    totalInterest.value = '';
  }, 2000);
});

//Calculate Results
var calculateResults = function calculateResults() {

  //User Entered Values (Formulas taken from external resource)
  var principal = parseFloat(amount.value); //parse the desired loan amount entered to a float value
  var calculatedInterest = parseFloat(interest.value) / 100 / 12;
  var calculatedPayments = parseFloat(years.value) * 12;

  //Result Calculations
  //calculation for monthly repayment
  var x = Math.pow(1 + calculatedInterest, calculatedPayments);
  var monthly = principal * x * calculatedInterest / (x - 1);

  //check to see if monthly repayment value is finite (if so display results in result fields)
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    //Show results and hide loading icon if result is finite and valid
    document.querySelector('#results').style.display = 'block';
    document.querySelector('#loading').style.display = 'none';
  } else {
    displayError('Oops, something went wrong... Please check the values entered');
  }
};

var displayError = function displayError(error) {
  //Hide Results
  document.querySelector('#results').style.display = 'none';

  //Hide Loading Image
  document.querySelector('#loading').style.display = 'none';

  //Create error Div
  var errorDiv = document.createElement('div');

  //Get elements
  var card = document.querySelector('.card');
  var result = document.querySelector('#results');

  //Add classes alert and alert-danger to the errorDiv (required in Bootstrap)
  errorDiv.className = 'alert alert-danger';

  //Create textNode and append to the errorDiv element:
  errorDiv.appendChild(document.createTextNode(error));

  //Insert Error (above heading)
  card.insertBefore(errorDiv, result);

  //Clear Error
  var autoClearError = function autoClearError() {
    errorDiv.remove();
  };

  //Clear Error after some time (better UI experience)
  setTimeout(autoClearError, 3500);
};
