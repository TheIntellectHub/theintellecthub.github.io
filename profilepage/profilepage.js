function autherror() {
    document.getElementById('errmessagejumbo').innerHTML = '<b>You must verify email in order to continue with any other profile changes!<br>Also, if you logout, then you must verify your email in order to log back in!</b>'
}
function reset() {
    location.reload()
}

//Select Profile Pic... On Change Show Exemplar Profile Picture
var selectprofile = document.getElementById('selectProfile');
selectprofile.addEventListener('change', e => {
    e.preventDefault();

    var picchoice = selectprofile['pics'].value;
    console.log(picchoice)
    document.getElementById('example').innerHTML = ''
    document.getElementById('errmessage4').innerHTML = ''

    if (picchoice == 'null') {
    }
    else {
        document.getElementById('example').innerHTML = '<img src="/profilepics/'+ picchoice +'" style="height: 300px; width: 300px;">'
    }

})

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user)

        //update profile to reset
        db.ref('/users/'+user.uid).update({
            catval: "Select Category of Joke (Select This Option For All Jokes)"
        })

        //getting firebase user info
        var username = user.displayName;
        var email = user.email;

        //Input fields (username, email, fav categories, prof pic in two jumbotrons + prof pic in Navbar)
        document.getElementById('username').innerHTML = username;
        document.getElementById('email').innerHTML = email;

        var navdiv = document.getElementById('navprof');
        var profpicdiv = document.getElementById('profilepic');
        var preferences = document.getElementById('preferences');
    
        db.ref('/users/'+user.uid).once('value', function(snapshot) {  
    
            navdiv.innerHTML += '<img src="'+ snapshot.val().profilepic +'" height="25px" width="25px" style="margin-left:2px; margin-right:3px; margin-bottom: 5px;">'
            profpicdiv.innerHTML += '<img src="'+ snapshot.val().profilepic +'" height="60px" width="60px" style="margin-bottom: 10px;">'
            if (snapshot.val().fav1 == "") {
                preferences.innerHTML += "Select preferences for jokes to show on homepage!"
            }
            else {
                preferences.innerHTML += snapshot.val().fav1+', '+snapshot.val().fav2+',<br>'+snapshot.val().fav3
            }
        });

        //username update
        var changeusername = document.getElementById('change-username-modal');
        changeusername.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('errmessage').innerHTML = '';
            
            var username1 = changeusername['usernamechange1'].value;
            var username2 = changeusername['usernamechange2'].value;

            if (username1 == username2 & username1 != '') {
                user.updateProfile({
                    displayName: username1
                }).then(() => {
                    message = 'Success';
                    document.getElementById('successmessage').innerHTML = message;
                    location.reload();
                })
            }
            else {
                message = 'The usernames inputed do not match...<br>Or the usernames were left blank';
                document.getElementById('errmessage').innerHTML = message;
            }
        })

        //email update
        var changeemail = document.getElementById('change-email-modal');
        changeemail.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('errmessage2').innerHTML = '';

            console.log('clicked')

            var email = changeemail['email1'].value;
            var email2 = changeemail['email2'].value;
            var password = changeemail['password'].value;

            if (email == email2) {
                auth.currentUser.updateEmail(email).then(() => {
                    user.sendEmailVerification().then(()=> {
                        document.getElementById('successmessage2').innerHTML = 'Success';
                        console.log('success change & email verification')
                        location.reload();
                    })
                }).catch(function(error) {
                    document.getElementById('errmessage2').innerHTML = 'Permission denied: '+error
                }).catch(err => {
                    var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
                    console.log(credential);

                    user.reauthenticateWithCredential(credential).catch(err => {
                        document.getElementById('errmessage2').innerHTML = 'Please Input Password/The password inputted is incorrect'
                    })
                })
            }
            else {
                document.getElementById('errmessage2').innerHTML = 'Emails do not match';
            }     
        })

        //Update Profile Picture
        var selectprofile = document.getElementById('selectProfile');
        selectprofile.addEventListener('submit', e => {
            e.preventDefault();

            var picchoice = selectprofile['pics'].value;
            console.log(picchoice);
            document.getElementById('errmessage4').innerHTML = '';

            if (picchoice == 'null') {
                document.getElementById('errmessage4').innerHTML = 'Please select a profile picture';
            }
            else {
                db.ref('/users/'+user.uid).update({
                    profilepic: '/profilepics/'+picchoice
                }).then (() => {
                    document.getElementById('successmessage4').innerHTML = 'Success';
                    location.reload()
                }).catch(function(error) {
                    document.getElementById('errmessage4').innerHTML = 'No Permission<br>Error Message:'+error;
                })
            }

        })

        //Select Joke Preferences
        var selectpref = document.getElementById('selectPref');
        selectpref.addEventListener('submit', e => {
            e.preventDefault();

            var fav1 = selectpref['pref1'].value;
            var fav2 = selectpref['pref2'].value;
            var fav3 = selectpref['pref3'].value;
            document.getElementById('errmessage3').innerHTML = ''

            if (fav1 == "Select Category of Joke (Select This Option For All Jokes)" || fav2 == "Select Category of Joke (Select This Option For All Jokes)" || fav3 == "Select Category of Joke (Select This Option For All Jokes)") {
                document.getElementById('errmessage3').innerHTML = "Please fill in all values before submitting"
            }
            else {
                db.ref('/users/'+user.uid).update({
                    fav1: fav1,
                    fav2: fav2,
                    fav3: fav3
                }).then (() => {
                    document.getElementById('successmessage3').innerHTML = 'Success';
                    location.reload()
                }).catch(function(error) {
                    document.getElementById('errmessage4').innerHTML = 'No Permission<br>Error Message:'+error;
                })
            }
        })

    }
    else {
        window.location.replace("/index.html");
    }
})
