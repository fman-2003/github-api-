const fullname = document.getElementById("fullname")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")


const loginEmail = document.getElementById("login-email")
const loginPassword = document.getElementById("login-password")



document.addEventListener('click', function (e) {
   if(e.target.id === 'register-button'){
       e.preventDefault()
    const user = {
        fullName: fullname.value,
        userName: username.value,
        email: email.value,
        password: password.value
    }

   localStorage.setItem("user", JSON.stringify(user))
    setTimeout(() => {
       window.alert('successful, login in');
       window.location.assign('login.html')
    }, 1500);
    fullname.value = '';
    username.value = '';
    email.value = '';
    password.value = '';
   }

   if(e.target.id === 'login-button'){
       e.preventDefault();
       const regUser = JSON.parse(localStorage.getItem('user'));
       const { email, password} = regUser;
     if(loginEmail.value === email && loginPassword.value === password){
         alert('login successful');
         window.location.href = 'dashboard.html';
     }else{
         alert("Error! Invalid email or password");
         loginEmail.value = '';
         loginPassword.value = '';
     }
   }

//    getting data from an api
   if(e.target.id === 'profile'){
       const api = 'https://api.github.com/users/fman-2003'
       fetch(api)
        .then(function(response){
            return response.json()
        })
        .then((data)=>{
            const { id, avatar_url, name, public_repos, following, login, location, created_at, updated_at } = data;
            const bio = document.querySelector('.bio');
            bio.innerHTML = `
                <div class="image">
                <img src=${avatar_url} alt="fulfilment">
                <div class="img_caption">
                    <p>id: ${id}</p>
                    <p>Name: ${name}</p>
                    <p>Location: ${location ? location : 'Ilorin'}</p>
                </div>
            </div>
            <div class="details">
                
                <p class="para">Public repos: ${public_repos}</p>
                <p class="para">Following: ${following}</p>
                
                
                <p class="para">Username: ${login}</p>
                <p class="para">Member Since: ${created_at}</p>
                <p class="para">Last Updated: ${updated_at}</p>
            </div>
            
            `
        })
   }
})