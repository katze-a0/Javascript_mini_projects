
// const toast = document.getElementById('toast');
// const icon = document.getElementById('icon');
// const manipulate=document.getElementById('manipulate');


// manipulate.innerHTML=`<button id="button_">click </button>`;

// //button click event
// manipulate.addEventListener('click',()=>{
// icon.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>`;
// toast.innerHTML += " hi i am here";
// toast.classList.add('show-toast');
// icon.classList.add('show-icon');
// })

const toast = document.getElementById('toast');
const icon = document.getElementById('icon');
const toastText = document.getElementById('toast-text');
const button = document.getElementById('button_');

button.addEventListener('click', () => {

    toast.classList.remove('show');
    
    icon.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>`;

    toastText.textContent = "Hi, I am here!";
    
    void toast.offsetWidth;
    
    toast.classList.add('show');
});



