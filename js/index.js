const COLOR_RED = 'hsl(0, 87%, 67%)';

// get all elements
const errorMsg = document.getElementById('error-msg-link');
const input = document.getElementById('link-input');
const submitBtn = document.getElementById('btn-shorten');

submitBtn.addEventListener('click', () =>{
    // If input validation returns true continue
    if (validateInput()){
        console.log(true);
    } else {
        console.log(false);
    }
})

// Function to validate input and give error messages
function validateInput(){
    if (input.value.trim() == ""){
        input.style.border = `3px solid ${COLOR_RED}`;
        errorMsg.style.display = 'inline-block';
        return false;
    } else {
        input.style.border = '2px solid #ccc';
        errorMsg.style.display = 'none';
        return true;
    }
}