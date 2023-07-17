// Event listeners for real-time validation
document.getElementById("day").addEventListener("input", validateDay);
document.getElementById("month").addEventListener("input", validateMonth);
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

    document.getElementById('yearsCalc').classList.remove('error');
    document.getElementById('monthsCalc').classList.remove('error');
    document.getElementById('daysCalc').classList.remove('error');
  } else {
    document.getElementById('yearsCalc').innerHTML = '--';
    document.getElementById('monthsCalc').innerHTML = '--';
    document.getElementById('daysCalc').innerHTML = '--';

    document.getElementById('yearsCalc').classList.add('error');
    document.getElementById('monthsCalc').classList.add('error');
    document.getElementById('daysCalc').classList.add('error');
  }
}

// Leap year calculation
function leapYear(year) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

// Day validation based on month and year
function validateDay(day,month) {
  var dayError = document.getElementById('dayError');

  var monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
  var monthsWith30Days = [4, 6, 9, 11];

  var maxDays = 31;

  if ( parseInt(day) < 1 || parseInt(day) > maxDays) {
    dayError.innerHTML = 'Must be a valid day';
    if ( monthsWith30Days.includes(month) && day > 30) {
        dayError.innerHTML = 'This month has 30 days';
        if ( monthsWith31Days.includes(month) && day > 31) {
            dayError.innerHTML = 'This month has 31 days';
            if(month == 2 && leapYear() && day > 28) {
                dayError.innerHTML = 'This a leap year'
            }
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

  return validateDay(parseInt(month), parseInt(document.getElementById('year').value));
}

// Year validation
function validateYear() {
  var year = document.getElementById('year').value;
  var yearError = document.getElementById('yearError');

  if ( parseInt(year) > currentYear) {
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

// Add event listeners to trigger calculateAge function
document.getElementById('day').addEventListener('input', calculateAge);
document.getElementById('month').addEventListener('input', calculateAge);
document.getElementById('year').addEventListener('input', calculateAge);

// Initial calculation when the page loads
calculateAge();
