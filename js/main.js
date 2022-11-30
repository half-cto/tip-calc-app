const tipResult = document.getElementById('tip-result');
const totalResult = document.getElementById('total-result');
const bill = document.getElementById('bill');
const peopleCount = document.getElementById('people-count');
const tipPercentBtns = document.getElementsByClassName('button-small');
const tipPercentCustom = document.getElementById('custom');
const errorMsg = document.getElementsByClassName('error-msg');
const resetBtn = document.getElementById('reset');


let tip,
    total,
    percent = 0;

function getPercent() {
    if (tipPercentCustom.value !== '') {
        return Number(tipPercentCustom.value);
    } else {
        for (let i = 0; i < tipPercentBtns.length; i++) {
            if (tipPercentBtns[i].classList.contains('selected')) {
                return Number(tipPercentBtns[i].value);
            }
        }
    }
}

const calcTip = () => Number(((bill.value) * (percent / 100) / 2)).toFixed(2) ;

const calcTotal = () => {
    return ((Number(bill.value)) / Number(peopleCount.value)  + Number(tip)).toFixed(2);
} 


function removeSelectedClass() {
    for (let i = 0; i < tipPercentBtns.length; i++) {
        tipPercentBtns[i].classList.remove('selected');    
    }
}

function selectPercentageBtn(event) {
    removeSelectedClass();
    tipPercentCustom.value = '';
    event.target.classList.add('selected');
    updateResults();
}

function peopleNaN() {
    if (peopleCount.value < 1) {
        errorMsg[0].classList.remove('hide');
        peopleCount.classList.add('error');
    } else {
        errorMsg[0].classList.add('hide');
        peopleCount.classList.remove('error');
    }
}

for (let i = 0; i < tipPercentBtns.length; i++) {
    tipPercentBtns[i].addEventListener('click', selectPercentageBtn); 
}

function resetCalc() {
    bill.value = '';
    peopleCount.value = '';
    tipPercentBtns[1].click();
    totalResult.innerHTML = '$0.00';
    tipResult.innerHTML = '$0.00';
    resetBtn.disabled = true;
}

function updateResults(){
    percent = getPercent();
    tip = calcTip();
    total = Number(calcTotal());
    console.log(Number(peopleCount.value));
    Number(peopleCount.value) > 0
        ? totalResult.innerHTML = `$${total}`
        : totalResult.innerHTML = '$0.00';
    tipResult.innerHTML = `$${tip}`;
    resetBtn.disabled = false;
}


tipPercentCustom.addEventListener('input', () => {removeSelectedClass(), updateResults()});
bill.addEventListener('input', updateResults);
peopleCount.addEventListener('input', () => {updateResults(), peopleNaN()});
resetBtn.addEventListener('click', resetCalc);





