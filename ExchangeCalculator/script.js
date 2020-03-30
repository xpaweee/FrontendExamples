const currenctEl_one = document.getElementById('currenct-one');
const currenctEl_two = document.getElementById('currenct-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


//Fetch exchange rates and up[date the DOM
function calculate(){
    const currenct_one = currenctEl_one.value;
    const currenct_two = currenctEl_two.value;

}

currenctEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currenctEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);


calculate()


