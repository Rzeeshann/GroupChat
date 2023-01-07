//Log In
function login(event){
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let details = {
        email:email,
        password:password,
    };
console.log(details)

axios.
post("http://localhost:3000/login", details)
.then((response)=>{
    console.log(response);
    if(response.status == 200){
        alert("Succesfully Logged In");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('user',response.data.user[0].id)
        console.log(response.data.user.id);
        window.location.href = "./group.html";
    }else{
        throw new Error("Failed to Login")
    }
})
.catch((err)=>alert(err.message));
}