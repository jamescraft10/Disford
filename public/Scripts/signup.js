const submit = async function() {
    try {
        const username = document.getElementById('formUsername').value;
        const password = document.getElementById('formPassword').value;

        console.log(username);
        console.log(password);

        const response = await fetch("/api/user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username": username,"password": password})
        });

        const result = await response.json();

        if(result === username) { window.location.href = "/login.html"; } // use === because its json {"abc"}
        else if(result === "Username is taken!") { alert("Username is taken!"); }
        else { alert("Something bad just happend and i have no idea what happend"); }
    } catch(e) {
        console.error("Error ", e);
        return "err";
    }
}