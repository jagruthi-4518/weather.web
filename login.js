let btn = document.getElementById("btn");

btn.addEventListener("click", login);

function login(){
    let user = document.getElementById("Username").value.trim();
    let pass = document.getElementById("Password").value.trim();
    let msg = document.getElementById("msg");

    if(user === "" || pass === ""){
        msg.style.color = "red";
        msg.innerText = "Please fill all fields!";
        return;
    }

    // Example simple login (you can replace this)
    if(user === "admin" && pass === "1234"){
        msg.style.color = "lightgreen";
        msg.innerText = "Login Successful!";
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } 
    else {
        msg.style.color = "red";
        msg.innerText = "Invalid username or password!";
    }
}
