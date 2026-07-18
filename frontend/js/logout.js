function logout() {

    console.log("Logout clicked");

    localStorage.clear();

    window.location.replace("login.html");

}