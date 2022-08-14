const target = '.logout-btn';

setButtonListeners();

function setButtonListeners() {
    document.querySelector(target).addEventListener('click', (e)=>{
        localStorage.clear();
    });
}