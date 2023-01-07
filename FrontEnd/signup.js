
function createUser(event){
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userDetails = {
        name: name,
        email: email,
        password: password  
    };
    console.log(userDetails);

    axios
    .post("http://localhost:3000/signup", userDetails)
    .then((result)=> {
        console.log(result);
        if(result.status == 201) {
            alert("Successfully Signed up")
            window.location.href="./login.html"
        }else{
            throw new Error("Failed to Signup")
        }
    })
    .catch((err) => {
        alert(err)
    })
}