const COLOR_RED = 'hsl(0, 87%, 67%)';

// get all elements
const errorMsg = document.getElementById('error-msg-link');
const input = document.getElementById('link-input');
const submitBtn = document.getElementById('btn-shorten');

submitBtn.addEventListener('click', () =>{
    // If input validation returns true continue
    if (validateInput()){
        // API GET request (getting short url)
        getShortUrl();
    } else {
        console.log('Input validation status: ' + false);
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

/* API call */ 
function getShortUrl(){
    const baseUrl = "https://api.shrtco.de/v2/shorten?url=";

    var request = new XMLHttpRequest();

    request.open('GET', `${baseUrl + input.value}`, true);
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            var shortLink = data.result.full_short_link;
        } else {
            console.log('error');
        }

        // Call function to display shortlink to user
        displayShortLink(shortLink);
    }
    request.send();
}


function displayShortLink(shortLink){
    const linkContainer = document.querySelector('#urls-container');
    const clearBtn = document.querySelector('#clear-urls');
    const copiedTxt = 'Copied!';
    const btnActiveClass = 'btn-copy-active';

    linkContainer.innerHTML += `
        <div class="card-url">
            <p style="margin: 0;"><span class="input-url">${input.value}</span><button class="btn-copy">Copy</button><a
                href="shortLink" target="_blank" class="short-url">${shortLink}</a></p>
        </div>
    `;
    clearBtn.style.display = 'inline-block';
    clickListenerClearList(clearBtn, linkContainer);

    const copyBtns = document.querySelectorAll('.btn-copy');

    copyBtns.forEach(element => {
        element.addEventListener('click', () => {
            element.innerHTML = copiedTxt;
            element.classList.add(btnActiveClass);
            copyToClipboard(shortLink);
        })
    });
}

// Copy to clipboard function. Adds dummy textarea to body with link value so it can be copied
function copyToClipboard(link){
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = link;
    dummy.select();
    document.execCommand("copy");

    // Remove dummy textarea after copied
    document.body.removeChild(dummy);
    dummy.style.display = 'none'
}

function clickListenerClearList(button, clearContainer){
    button.addEventListener('click', () => {
        clearContainer.innerHTML = ``;
        button.style.display = 'none';
    })
}

/* Mobile menu */
const CLOSE_ICON_SRC = "/images/icon-close.svg";
const HAMBURGER_ICON_SRC = "/images/icon-hamburger.svg";
const mobileMenu = document.querySelector('#mobile-menu-li');

const mobileBtn = document.querySelector('#mobile-btn');
var btnSrc = document.getElementById('mobile-btn').src;

// Click listener hamburger menu btn
mobileBtn.addEventListener('click', () => {
    if (btnSrc == HAMBURGER_ICON_SRC){
        mobileMenuActive(true);
        mobileMenu.style.transform = 'scaleY(1)';

        // Onclick outside hide again
        event.stopPropagation();
        window.onclick = function(e) {
            if(e.target != mobileMenu) {
                mobileMenuActive(false);
                mobileMenu.style.transform = 'scaleY(0)';
            } else {
                mobileMenu.style.transform = 'scaleY(1)';
            }
        }    
    } else {
        mobileMenuActive(false);
        mobileMenu.style.transform = 'scaleY(0)';
    }
});

// Toggle source of mobile menu image btn
function mobileMenuActive(active){
    if (active){
        btnSrc = CLOSE_ICON_SRC;
        mobileBtn.setAttribute("src", CLOSE_ICON_SRC);
    } else {
        btnSrc = HAMBURGER_ICON_SRC;
        mobileBtn.setAttribute("src", HAMBURGER_ICON_SRC);
    }
}