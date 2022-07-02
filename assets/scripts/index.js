function UiHandler() {

    return Object.freeze({
        handelFormSubmit,
        handleEmailInput,
        handlePasswordInput,
        togglePassword,
    })
        
    function handelFormSubmit(e) {
        e.preventDefault(); 

        const emailValidation = handleEmailInput();
        const passwordsValidation = handlePasswordInput();

        if(passwordsValidation || emailValidation)
            return false;

        alert('Form is valid, Thanks')
        return true;
    }

    function handleEmailInput() {
        const email = document.getElementById('email');
        let errorMsg = validateEmail(email.value);

        renderInvalidState(email, errorMsg, 'Email')
        return errorMsg;
    }

    function handlePasswordInput() {
        const password1 = document.getElementById('password1');
        const password2 = document.getElementById('password2');

        const errorMsg = validatePassword(password1.value, password2.value);
        renderInvalidState(password1, errorMsg, 'Create your password')

        const errorMsg2 = validatePassword(password2.value, password1.value);
        renderInvalidState(password2, errorMsg2, 'Re-enter password')

        return errorMsg || errorMsg2;
    }

    function togglePassword(e) {
        const password = e.parentElement.querySelector('input')
        const isHidden = password.getAttribute('type') === 'password';

        password.setAttribute('type', isHidden ? 'text' : 'password')
        
        e.innerHTML = isHidden ? 'visibility_off' : 'visibility';
    }

    function renderInvalidState(e, errorMsg, validMsg) {
        if(errorMsg){
            e.parentElement.classList.add('invalid-input')
            e.parentElement.querySelector('label').innerHTML = errorMsg
        } else {
            e.parentElement.classList.remove('invalid-input')
            e.parentElement.querySelector('label').innerHTML = validMsg
        }
    }

    function validateEmail(value) {
        let errorMsg = '';
        if(!value){
            errorMsg = 'Email is required'
        }
        else if(!isValidEmail(value)){
            errorMsg = 'Wrong email format'
        }
        return errorMsg;
    }

    function validatePassword(value, value2) {
        let errorMsg = '';
        if(!value){
            errorMsg = 'Password is required'
        } else if(value.length < 6) {
            errorMsg = 'Must be at least 6 letters'
        } else if(value !== value2){
            errorMsg = 'Password not matching'
        }
        return errorMsg;
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
}

const $ = UiHandler();