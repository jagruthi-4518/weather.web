let btn = document.getElementById("btn");

btn.addEventListener("click", login);

function login(){
    let user = document.getElementById("Username").value.trim();
    let pass = document.getElementById("Password").value.trim();
    let cpass = document.getElementById("CPassword").value.trim();
    let msg = document.getElementById("msg");

    if(user === "" || pass === ""|| cpass === ""){
        msg.style.color = "red";
        msg.innerText = "Please fill all fields!";
        return;
    }
    if(pass!=cpass){
        msg.style.color = "red";
        msg.innerText = "Password not matching!";
        return;
    }
    else {
        msg.style.color = "lightgreen";
        msg.innerText = "Account created successfully!";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }
}
