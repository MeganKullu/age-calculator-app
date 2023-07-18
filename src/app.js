// Event listeners for real-time validation
document.getElementById("day").addEventListener("input", validateDay);
document.getElementById("month").addEventListener("input", calculateAge);
document.getElementById("year").addEventListener("input", calculateAge);

// Getting the current date, year, and month
var todaysDate = new Date();
var currentYear = todaysDate.getFullYear();
var currentMonth = todaysDate.getMonth() + 1;
var currentDay = todaysDate.getDate();

// Function to calculate age
function calculateAge() {
  var dayCalc = document.getElementById('day').value;
  var monthCalc = document.getElementById('month').value;
  var yearCalc = document.getElementById('year').value;

  var dayValid = validateDay(parseInt(dayCalc), parseInt(monthCalc), parseInt(yearCalc));
  var monthValid = validateMonth(parseInt(monthCalc));
  var yearValid = validateYear();

  if (dayValid && monthValid && yearValid) {
    var dayAge = Math.abs(currentDay - parseInt(dayCalc));
    var monthAge = Math.abs(currentMonth - parseInt(monthCalc));
    var yearAge = currentYear - parseInt(yearCalc);

    document.getElementById('yearsCalc').innerHTML = isNaN(yearAge) ? '--' : yearAge;
    document.getElementById('monthsCalc').innerHTML = isNaN(monthAge) ? '--' : monthAge;
    document.getElementById('daysCalc').innerHTML = isNaN(dayAge) ? '--' : dayAge;

    resetBorderAndTextColor('day');
    resetBorderAndTextColor('month');
    resetBorderAndTextColor('year');
  } else {
    document.getElementById('yearsCalc').innerHTML = '--';
    document.getElementById('monthsCalc').innerHTML = '--';
    document.getElementById('daysCalc').innerHTML = '--';

    setBorderAndTextColor('day', !dayValid);
    setBorderAndTextColor('month', !monthValid);
    setBorderAndTextColor('year', !yearValid);
  }
}

// Leap year calculation
function leapYear(year) {
  if (year === undefined) {
    return false;
  } else {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  }
}

// Day validation based on month and year
function validateDay(day, month, year) {
  var dayError = document.getElementById('dayError');
  var maxDays = 31;

  if (parseInt(day) < 1 || parseInt(day) > maxDays) {
    dayError.innerHTML = 'Must be a valid day';
    return false;
  }

  if (month === 2) {
    if (leapYear(parseInt(year))) {
      if (day > 29) {
        dayError.innerHTML = 'Feb has 29 days in this year';
        return false;
      }
    } else {
      if (day > 28) {
        dayError.innerHTML = 'Feb has 28 days in this year';
        return false;
      }
    }
  }

  dayError.innerHTML = '';
  return true;
}

// Month validation
function validateMonth(month) {
  var monthError = document.getElementById('monthError');

  if (parseInt(month) < 1 || parseInt(month) > 12) {
    monthError.innerHTML = 'Must be a valid month';
    return false;
  }

  monthError.innerHTML = '';
  return true;
}

// Year validation
function validateYear() {
  var year = document.getElementById('year').value;
  var yearError = document.getElementById('yearError');

  if (parseInt(year) > currentYear) {
    yearError.innerHTML = 'Must be in the past';
    return false;
  }

  if (parseInt(year) < 1900) {
    yearError.innerHTML = 'Are you alive?';
    return false;
  }

  yearError.innerHTML = '';
  return true;
}


// Set border color and label text color for input element
function setBorderAndTextColor(elementId, isInvalid) {
  var inputElement = document.getElementById(elementId);
  var labelElement = document.querySelector('label[for="' + elementId + '"]');

  inputElement.style.borderColor = isInvalid ? '#FF5757' : '#DBDBDB';
  labelElement.style.color = isInvalid ? '#FF5757' : '#716F6F';
}

// Reset border color and label text color for input element
function resetBorderAndTextColor(elementId) {
  var inputElement = document.getElementById(elementId);
  var labelElement = document.querySelector('label[for="' + elementId + '"]');

  inputElement.style.borderColor = '#DBDBDB';
  labelElement.style.color = '#716F6F';
}

// Add event listeners to trigger calculateAge function
document.getElementById('day').addEventListener('input', calculateAge);
document.getElementById('month').addEventListener('input', calculateAge);
document.getElementById('year').addEventListener('input', calculateAge);

// Initial calculation when the page loads
calculateAge();
