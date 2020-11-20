let submit = document.querySelector('#submit');
const CourseCost: number = 10000;

submit.addEventListener('click', (event) => {
    event.preventDefault()
        let requestedLoanAmount: number = parseInt((<HTMLInputElement>document.getElementById('loanAmount')).value);
        let expectedSalary: number = parseInt((<HTMLInputElement>document.getElementById('expectedSalary')).value);
        let repaymentPercentage: number = parseInt((<HTMLInputElement>document.getElementById('repaymentPercentage')).value);

        //Calculate total loan amount including admin fee
        function totalLoanAmount(requestedLoanAmount: number): number {
            if ((requestedLoanAmount >= (CourseCost * 0.8)) && (requestedLoanAmount < (CourseCost * 0.9))) {
                return requestedLoanAmount + 500;
            } else if (requestedLoanAmount >= (CourseCost * 0.9)) {
                return requestedLoanAmount + 1000;
            } else {
                return requestedLoanAmount;
            }
        }

        //To get total amount borrowed and upfront Admin Fee:
        let totalLoan: number = totalLoanAmount(requestedLoanAmount);
        let adminFee: number = totalLoan * 0.05;

        //Work out monthly repayment:
        let monthlyCalc: number = (expectedSalary / 12) * (repaymentPercentage / 100);
        let monthlyRepayment: number = parseFloat((monthlyCalc).toFixed(2));

        //function to work out length of repayment:
        function repaymentLength(totalLoan: number, monthlyRepayment: number): string {
            let howLong: number = totalLoan / monthlyRepayment;
            let wholeMonths: number = Math.floor(howLong);
            if ((howLong - Math.floor(howLong)) !== 0) {
                let decimals: number = howLong - wholeMonths;
                let lastPaymentMonth: number = parseFloat((monthlyRepayment * decimals).toFixed(2));
                return `Your monthly repayments will be £${monthlyRepayment} for ${wholeMonths} months, then a final payment of £${lastPaymentMonth}`;
            } else {
                return `Your monthly repayments will be £${monthlyRepayment} for ${wholeMonths} months`
            }
        }
        //Display to front-end
        document.getElementById('loanInfoConfirmation').innerHTML = `You have asked to borrow £${requestedLoanAmount}  at ${repaymentPercentage}%, with an expected Salary of £${expectedSalary}.`;
        document.getElementById('loanPlusAdminFee').innerHTML = `£${totalLoan}`;
        document.getElementById('adminFee').innerHTML = `£${adminFee}`;
        document.getElementById('repaymentSchedule').innerHTML = `${repaymentLength(totalLoan, monthlyRepayment)}`;

});



