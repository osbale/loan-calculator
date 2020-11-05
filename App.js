const calculateResults = () => {

    const amount = document.getElementById('loan__amount')
    const annual = document.getElementById('loan__annual')
    const repayment = document.getElementById('loan__repayment')
    const monthlyPayment = document.getElementById('results__monthly')
    const totalPayment = document.getElementById('results__total')
    const totalInterest = document.getElementById('results__interest')

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(annual.value) / 100 / 12
    const calculatedPayments = parseFloat(repayment.value) * 12

    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / ( x - 1)

    if ( isFinite(monthly) ) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2)

        document.getElementById('results').style.display = 'block'
        document.getElementById('loader').style.display = 'none'
    } else {
        showError('Please check your numbers')
    }
}

const showError = (error) => {
    document.getElementById('loader').style.display = 'none'
    const errorDiv = document.createElement('div')
    const card = document.querySelector('.uk-card')
    const form = document.querySelector('.uk-form') 
    errorDiv.className = 'uk-alert-danger uk-text-center uk-padding-small uk-margin-bottom'
    errorDiv.appendChild(document.createTextNode(error))
    card.insertBefore(errorDiv, form)
    setTimeout(clearError, 3000)
}

const clearError = () => {
    document.querySelector('.uk-alert-danger').remove()
}


document.querySelector('.loan').addEventListener('submit', (e) => {
    document.getElementById('results').style.display = 'none'
    document.getElementById('loader').style.display = 'block'

    setTimeout(calculateResults, 2000)

    e.preventDefault()
})