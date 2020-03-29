const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//Show inpput error message
function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;

}

//Show succes outline
function showSuccess(input)
{
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


function getFieldNmae(input)
{
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);    
}

function checkPasswordsMatch(input1,input2){
    if(input1.value !== input2.value)
    {
        showError(input2,"Passwords do not match");
    }
}


function checkLength(input, min, max)
{
    if(input.value.length < min)
    {
        showError(input, `${getFieldNmae(input)} must be at least ${min} characters`);
    }
    else if(input.value.length > max)
    {
        showError(input, `${getFieldNmae(input)} must be less than ${max} characters`);
    }
    else
    {
        showSuccess(input);
    }
}


function checkRequired(inputArr){
    inputArr.forEach(function(input) {
        if(input.value.trim() === '')
        {

            showError(input, `${getFieldNmae(input)} is required`);
        }
        else
        {
            showSuccess(input);
        }
    });

}

//Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username,email,password,password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkPasswordsMatch(password,password2);

    // if(username.value === '')
    // {
    //     showError(username,'Username is required');
    // }
    // else{
    //     showSuccess(username);
    // }

    // if(email.value === '')
    // {
    //     showError(email,'Email is required');
    // }
    // else{
    //     showSuccess(email);
    // }

    // if(password.value === '')
    // {
    //     showError(password,'Password is required');
    // }
    // else{
    //     showSuccess(password);
    // }

    // if(password2.value === '')
    // {
    //     showError(password2,'Password2 is required');
    // }
    // else{
    //     showSuccess(password2);
    // }

   
})