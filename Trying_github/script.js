async function getData(){
const api_url="https://api.github.com/users/";
try{
    const response=await fetch(api_url);
    const data=await response.json();
    console.log(data);
}
catch(e){
    console.error("error fetching data");
}
}
getData()



const button = document.querySelector('#search_btn');

// Method 1: Arrow function with parameters
const handleClick = (namee) => {
    return () => {
        
        console.log('hello ' + namee);
    }
}
button.addEventListener('click', handleClick('abc'));