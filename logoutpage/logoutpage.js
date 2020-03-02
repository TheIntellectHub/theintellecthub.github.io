//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        auth.signOut()
    }
    else {
        window.location.replace("/landingpage/landingpage.html");
    }
})