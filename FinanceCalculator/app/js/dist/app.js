var submit = document.querySelector('#submit');
var CourseCost = 10000;
submit.addEventListener('click', function (event) {
    event.preventDefault();
    var requestedLoanAmount = parseInt(document.getElementById('loanAmount').value);
    var expectedSalary = parseInt(document.getElementById('expectedSalary').value);
    var repaymentPercentage = parseInt(document.getElementById('repaymentPercentage').value);
    function totalLoanAmount(requestedLoanAmount) {
        if ((requestedLoanAmount >= (CourseCost * 0.8)) && (requestedLoanAmount < (CourseCost * 0.9))) {
            return requestedLoanAmount + 500;
        }
        else if (requestedLoanAmount >= (CourseCost * 0.9)) {
            return requestedLoanAmount + 1000;
        }
        else {
            return requestedLoanAmount;
        }
    }
    var totalLoan = totalLoanAmount(requestedLoanAmount);
    var adminFee = totalLoan * 0.05;
    var monthlyCalc = (expectedSalary / 12) * (repaymentPercentage / 100);
    var monthlyRepayment = parseFloat((monthlyCalc).toFixed(2));
    function repaymentLength(totalLoan, monthlyRepayment) {
        var howLong = totalLoan / monthlyRepayment;
        var wholeMonths = Math.floor(howLong);
        if ((howLong - Math.floor(howLong)) !== 0) {
            var decimals = howLong - wholeMonths;
            var lastPaymentMonth = parseFloat((monthlyRepayment * decimals).toFixed(2));
            return "Your monthly repayments will be \u00A3" + monthlyRepayment + " for " + wholeMonths + " months, then a final payment of \u00A3" + lastPaymentMonth;
        }
        else {
            return "Your monthly repayments will be \u00A3" + monthlyRepayment + " for " + wholeMonths + " months";
        }
    }
    document.getElementById('loanInfoConfirmation').innerHTML = "You have asked to borrow \u00A3" + requestedLoanAmount + "  at " + repaymentPercentage + "%, with an expected Salary of \u00A3" + expectedSalary + ".";
    document.getElementById('loanPlusAdminFee').innerHTML = "\u00A3" + totalLoan;
    document.getElementById('adminFee').innerHTML = "\u00A3" + adminFee;
    document.getElementById('repaymentSchedule').innerHTML = "" + repaymentLength(totalLoan, monthlyRepayment);
});
