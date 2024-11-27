// Select the input field and button
const nameInput = document.getElementById("input_username");
const button = document.querySelector('#search_btn');
const api_url="https://api.github.com/users/";

//  event listener to the button for the 'click' event
button.addEventListener('click', async() => {
    
    // Retrieve the value from the input field and trim it
    const username = nameInput.value.trim();

    // Log the trimmed username
    console.log('Submitted Username:', username);
     const isFound= await getData(username);
     check_result(username, isFound);

});

async function getData(username){
    try{
        const response=await fetch(`${api_url}${username}`);
        if(response.ok){
        const data=await response.json();
        console.log("username found");
        return data;}
        else{
            console.error("Username not found. HTTP status:", response.status);
            return null;
        }
    }
    catch(e){
        console.error("error fetching data: ",e.message);
        return null;
    }
    }
const check_result =(username, isFound)=>{
    if(isFound){

        avatar.style.backgroundImage = `url(${isFound.avatar_url})`;
        avatar.style.backgroundSize = 'cover';
        avatar.style.backgroundPosition = 'center';

       const re=document.getElementById("result_section");
       re.innerHTML=`<p>Username  <strong>  ${username}  </strong>  found </p> 
                    <br>
                     <p> Repositories : ${isFound.public_repos}</p>
                     <br>
                     <p>Followers: ${isFound.followers}</p>
                     <br>
                     <p>Following:${isFound.following}</p>
                     <br>
                      
       `; 


    }
    else{
        re.innerHTML=`Username <strong> ${username} </strong> not found`;
    }};
    

   