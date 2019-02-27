// Listen for Submit
document.getElementById("loan-form").addEventListener("submit", e => {
  // Hide Results
  document.getElementById("results").style.display = "none";

  // Show Loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

function calculateResults() {
  // UI Variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principle).toFixed(2);

    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

function showError(err) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("results").style.display = "none";

  const errDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errDiv.className = "alert alert-danger";
  errDiv.appendChild(document.createTextNode(err));

  card.insertBefore(errDiv, heading);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}
