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
                ranpostsdiv.innerHTML += '<div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div><br>'
                }
                else if (snapshot.val()[lastindex].category == "Knock Knock") {
                ranpostsdiv.innerHTML += '<div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div><br>'
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

        //input fields (displayname, navbar & slide prof pic, popular categories, 'preferred jokes' jokes)
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
        
        db.ref('/users/'+user.uid).once('value', function(snapshot) {
            joke1 = snapshot.val().fav1
            joke2 = snapshot.val().fav2
            joke3 = snapshot.val().fav3

            if (joke1 == '') {
                document.getElementById('profileproblem').innerHTML = 'Please update profile settings to use this feature'
            }
            else {
                console.log(joke1, joke2, joke3)
                jokesdiv1 = document.getElementById('preferredjokes1')
                jokestitle1 = document.getElementById('preferredjokestitle1')
                jokesdiv2 = document.getElementById('preferredjokes2')
                jokestitle2 = document.getElementById('preferredjokestitle2')
                jokesdiv3 = document.getElementById('preferredjokes3')
                jokestitle3 = document.getElementById('preferredjokestitle3')
                
                db.ref('/').once('value', function(snapshot) {
                
                    var id = snapshot.val().id
                    console.log(id)

                    for (i=id-1; i>=0; i--) {
                        db.ref('/jokes/joke'+i).once('value', function(snapshot) {

                            var lastindex =  Object.keys(snapshot.val());
                            
                            if (snapshot.val()[lastindex].category == joke1) {
                                jokesdiv1.value = 'good'

                                if (snapshot.val()[lastindex].type == "single" & snapshot.val()[lastindex].category !="Yo Momma"){
                                    jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                                else if (snapshot.val()[lastindex].category =="Yo Momma"){
                                    jokesdiv1.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Yo momma is so '+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                                else if (snapshot.val()[lastindex].type == "twopart" & snapshot.val()[lastindex].category !="Knock Knock") {
                                    jokesdiv1.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                                else if (snapshot.val()[lastindex].category == "Knock Knock") {
                                    jokesdiv1.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                            }
                            else if (snapshot.val()[lastindex].category == joke2) {
                                jokesdiv2.value = 'good'
                
                                if (snapshot.val()[lastindex].type == "single" & snapshot.val()[lastindex].category !="Yo Momma"){
                                    jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                                else if (snapshot.val()[lastindex].category =="Yo Momma"){
                                    jokesdiv2.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Yo momma is so '+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                                else if (snapshot.val()[lastindex].type == "twopart" & snapshot.val()[lastindex].category !="Knock Knock") {
                                    jokesdiv2.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                                else if (snapshot.val()[lastindex].category == "Knock Knock") {
                                    jokesdiv2.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                            }
                            else if (snapshot.val()[lastindex].category == joke3) {
                                jokesdiv3.value = 'good'

                                if (snapshot.val()[lastindex].type == "single" & snapshot.val()[lastindex].category !="Yo Momma"){
                                    jokesdiv3.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                                else if (snapshot.val()[lastindex].category =="Yo Momma"){
                                    jokesdiv3.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Yo momma is so '+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                                else if (snapshot.val()[lastindex].type == "twopart" & snapshot.val()[lastindex].category !="Knock Knock") {
                                    jokesdiv3.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                                else if (snapshot.val()[lastindex].category == "Knock Knock") {
                                    jokesdiv3.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                                }
                            }
                        }).then(() => {
                            if (jokesdiv1.value == undefined) {
                                jokestitle1.innerHTML = '<h3>No Jokes For '+joke1+' Available Yet!</h3>'
                            }
                            else {
                                jokestitle1.innerHTML = ''
                                jokestitle1.innerHTML = '<h3>Jokes For '+joke1+':</h3>'
                            }
                            if (jokesdiv2.value == undefined) {
                                jokestitle2.innerHTML = '<h3>No Jokes For '+joke2+' Available Yet!</h3>'
                            }
                            else {
                                jokestitle2.innerHTML = ''
                                jokestitle2.innerHTML = '<h3>Jokes For '+joke2+':</h3>'
                            }
                            if (jokesdiv3.value == undefined) {
                                jokestitle3.innerHTML = '<h3>No Jokes For '+joke3+' Available Yet!</h3>'
                            }
                            else {
                                jokestitle3.innerHTML = ''
                                jokestitle3.innerHTML = '<h3>Jokes For '+joke3+':</h3>'
                            }
                        });
                    }
                });
            }
        });    
        
    }
    else {
        window.location.replace("/index.html");;
    }
})
