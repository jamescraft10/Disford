const submit = async function() {
    try {
        const username = document.getElementById('formUsername').value;
        const password = document.getElementById('formPassword').value;

        console.log(username);
        console.log(password);

        const response = await fetch("/api/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username": username,"password": password})
        });

        const result = await response.json();

        if(result === "Logged in!") { // use === because its json {"abc"}
            document.cookie = ""; // JSON.parse(document.cookie.slice(5)); for json
            document.cookie = `info=${JSON.stringify({"username": username,"password": password})}; Secure; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
            window.location.href = "/app";
        } else if(result === "User doesn't exist!") {
            alert("User doesn't exist!");
        } else {
            alert("Wrong password");
        }

    } catch(e) {
        console.error("Error ", e);
        return "err";
    }
}