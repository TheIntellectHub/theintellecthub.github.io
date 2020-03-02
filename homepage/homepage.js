//update user profile qith onclick popular joke enter
function findcategory1() {
    auth.onAuthStateChanged(user => {
        val = document.getElementById('pop1').value
        
        db.ref('/users/'+user.uid).update({
            catval: val
        })
        window.location.replace('/jokepage/jokepage.html')
    });
}

function findcategory2() {
    auth.onAuthStateChanged(user => {
        val = document.getElementById('pop2').value
        
        db.ref('/users/'+user.uid).update({
            catval: val
        })
        window.location.replace('/jokepage/jokepage.html')
    });
}

function findcategory3() {
    auth.onAuthStateChanged(user => {
        val = document.getElementById('pop3').value
        
        db.ref('/users/'+user.uid).update({
            catval: val
        })
        window.location.replace('/jokepage/jokepage.html')
    });
}

//Random joke generator -
function ranJoke() {
    db.ref('/').once('value', function(snapshot) {
      var id = snapshot.val().id
      var ranid = Math.floor(Math.random() * id);
      console.log(ranid);
      var ranpostsdiv = document.getElementById("ranjoke");
      ranpostsdiv.innerHTML = ""
      db.ref('/jokes/joke'+ranid).once('value', function(snapshot) {
            
            for (i=snapshot.numChildren()-1; i >= 0; i--){
                var lastindex =  Object.keys(snapshot.val())[i];

                if (snapshot.val()[lastindex].type == "single" & snapshot.val()[lastindex].category !="Yo Momma"){
                ranpostsdiv.innerHTML += '<div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div><br>'
                }
                else if (snapshot.val()[lastindex].category =="Yo Momma"){
                ranpostsdiv.innerHTML += '<div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Yo momma is so '+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div><br>'
                }
                else if (snapshot.val()[lastindex].type == "twopart" & snapshot.val()[lastindex].category !="Knock Knock") {
                ranpostsdiv.innerHTML += '<div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div><br>'
                }
                else if (snapshot.val()[lastindex].category == "Knock Knock") {
                ranpostsdiv.innerHTML += '<div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div><br>'
                }
            }
        });
    });
}

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user)

        //update profile to reset
        db.ref('/users/'+user.uid).update({
            catval: "Select Category of Joke (Select This Option For All Jokes)"
        })

        //input fields (displayname, navbar & slide prof pic, popular categories)
        document.getElementById("uname").innerHTML = user.displayName;

        var picdiv = document.getElementById('upic');
        var navdiv = document.getElementById('navprof');

        db.ref('/users/'+user.uid).once('value', function(snapshot) {  

            picdiv.innerHTML += '<img src="'+ snapshot.val().profilepic +'" height="50px" width="50px" style="margin-left:3px; margin-bottom:10px;">'
            navdiv.innerHTML += '<img src="'+ snapshot.val().profilepic +'" height="25px" width="25px" style="margin-left:2px; margin-right:3px; margin-bottom: 5px;">'
        });

        db.ref('/Cats/').once('value', function(snapshot) {

            index = Object.values(snapshot.val());
            indexkey = Object.keys(snapshot.val());
            length = indexkey.length;
            console.log(index, indexkey);

            var pop1 = -1;
            var pop2 = -1;
            var pop3 = -1;
            var pop1name = '';
            var pop2name = '';
            var pop3name = '';

            for (i=0; i<=length; i++) {
                var val = index[i]
                var cat = indexkey[i]

                if (val>pop1) {
                    pop3name = pop2name;
                    pop3 = pop2;
                    pop2name = pop1name;
                    pop2 = pop1;
                    pop1name = cat;
                    pop1 = val;
                }
                else if (val>pop2) {
                    pop3name = pop2name;
                    pop3 = pop2;
                    pop2name = cat;
                    pop2 = val;
                }
                else if (val>pop3) {
                    pop3name = cat;
                    pop3 = val;
                }
            }
            document.getElementById('pop1').innerHTML = pop1name;
            document.getElementById('pop1').value = pop1name;
            document.getElementById('pop2').innerHTML = pop2name;
            document.getElementById('pop2').value = pop2name;
            document.getElementById('pop3').innerHTML = pop3name;
            document.getElementById('pop3').value = pop3name;
        })        
    }
    else {
        window.location.replace("/loginpage/loginpage.html");
    }
})
