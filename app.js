/* 
ACCOUNTANT INTEREST LOAN CALCULATOR

@AUTHOR: San Raph
@VERSION: 1.0.0
@DATE: Thursday August, 29, 2019
*/

//Listen for submit
//when this submits, it calls calculate result right away
//but we want to delay calculate result now
//since no longer an event handler, we can take e out

document.getElementById('loan-form').addEventListener('submit', function(e) {
    
    //show the loader as soon as this btn is clicked
    document.getElementById('loading').style.display = 'block';
    //show the spinner for 2 sec before calculating
    setTimeout(calculateResults, 2000);


    //prevent default
    e.preventDefault();
});


//calculateResults function
function calculateResults() {

    //console.log('calculating...');

    //grab UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalpayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //now with the interest, lets do the calculations
    //put the formula into code

    //principal is amount as float
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute the monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    //check to see if monthly value isfinite number
    if(isFinite(monthly)) {
        //display results to fields by using value to 
        //insert by setting the form.value to what you want
        //we also want 2 decimals
        monthlyPayment.value = monthly.toFixed(2);
        totalpayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';
        //hide the spinner
        document.getElementById('loading').style.display = 'none';
            
    } else {
        //if problem show error using create element
        //to build the alert from JS
        showError('Please check your inputs');
        //console.log('Please check inputs');
    }

}

 //showError function
 function showError(errorMessage) {
    
    //if there are no input value, hide results and loader
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    
    //create a div
    const errorDiv = document.createElement('div');
    //we want to insert the error msg into the DOM
    //so we need to grab two element, card as the 
    //parent div,becos we want to put it before the heading
    //so we need it too
     const card = document.querySelector('.card');
     const heading = document.querySelector('.heading');
    //in boothstrap, give class of alert and alert-danger
    //add class
    errorDiv.className = 'alert alert-danger';

    //create textNode from what is parsed in and append to div
    errorMsg = document.createTextNode(errorMessage);
    errorDiv.appendChild(errorMsg);

    //Insert error above heading using insertBefore method
    //call it on parent and parse in the element you wanna put in
    //and whatever you wanna insert before
    card.insertBefore(errorDiv, heading);

    //clear error after 3 sec for good UX
    //using setTimeout takes in func and duration in millisec
    setTimeout(clearError, 3000);
}

//clearError function
function clearError() {
    //simply remove the element with the class of alert
    document.querySelector('.alert').remove();
}


//work on this block
//write a function for show results and loadind
/* function isShowResultsAndLoading(isShowResults, isShowLoading) {
    if(isShowResults === true && isShowLoading === true){
        //if true, show both results and loader
       isShowResults = document.getElementById('results').style.display = 'block';
       isShowLoading = document.getElementById('loading').style.display = 'block';
    } else {
       isShowResults = document.getElementById('results').style.display = 'none';
       isShowLoading = document.getElementById('loading').style.display = 'none';
    }
} 
*/

