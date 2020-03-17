//signup
var signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    document.getElementById('error').innerHTML = '';
    document.getElementById('success').innerHTML = '';

    //get user info
    var password = signupForm['register-password'].value;
    var email = signupForm['register-email'].value;
    var username = signupForm['register-username'].value;

    //signup user
    auth.createUserWithEmailAndPassword(email, password).catch(err => {
        //setting up error message + error message
        document.getElementById('error').innerHTML = err.message;
        }).then(cred => {
            //Add DisplayName
            console.log(cred.user);
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: username
            }).then(() => {
                console.log('successful profile update')
            })

            //Add user into the database with pre-set requisites
            db.ref('users/'+user.uid+'/').set({
                fav1: '',
                fav2: '',
                fav3: '',
                profilepic: '/profilepics/black.png', 
                catval: 'Select Category of Joke (Select This Option For All Jokes)',
            }).then(() => {
                console.log('successful creation of user profile in db')
            })

            //email verification
            user.sendEmailVerification().then(() => {
                console.log('email verification sent')
                //entering a success message when successful
                document.getElementById('success').innerHTML = '<p class="text-success text-center"><br>Successful registration!<br>An email has been sent to '+ email +' for account verification. Be sure to check spam!</p>';
            })
            signupForm.reset();
            })
})

//signin 
var loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    var email = loginForm['login-email'].value;
    var password = loginForm['login-password'].value;

    //setting up error message if needed
    document.getElementById('error1').innerHTML = '';
    
    auth.signInWithEmailAndPassword(email, password).then(cred => {
    }).catch(err => {
        //error message
        document.getElementById('error1').innerHTML = err.message;
    })
})

//forgotpassword
var forgotpassform = document.getElementById('forgotpass-form');
forgotpass.addEventListener('submit', (e) => {
    e.preventDefault();

    //get inputted info
    var email = forgotpassform['forgot-email'].value;
    var email2 = forgotpassform['forgot-email2'].value;

    //setting up error message if needed
    document.getElementById('error2').innerHTML = '';

    if (email == email2) {
        auth.sendPasswordResetEmail(email).then(() => {
            window.alert('Email has been sent, please check to reset account')
            location.reload()
        }).catch(err => {
            document.getElementById('error2').innerHTML = err.message;
        })
    }
    else {
        document.getElementById('error2').innerHTML = 'Emails do not match';
    }
})

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        //email verification check
        if (user.emailVerified == false) {
            document.getElementById('error1').innerHTML = '';
            document.getElementById('error1').innerHTML = 'Email must be verified';
            auth.signOut()            
        }
        else {
            window.location.replace("/homepage/homepage.html");
        }
    }
    else {
        console.log('user is no longer logged in');
    }
})
