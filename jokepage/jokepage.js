//Onload method
function start() {
    setval()
    myData()
  }

//Reset Database
function setdata() {
    db.ref('/Cats/').set({
    Business: 0,
    College: 0,
    Computer: 0,
    'Dad Jokes': 0,
    Dark: 0,
    Dumbass: 0,
    Doctor: 0,
    Entertainment: 0,
    Law: 0,
    'Knock Knock': 0,
    Love: 0,
    Marriage: 0,
    National: 0,
   'Pick-Up Line': 12,
    Police: 0,
    Political: 0,
    Pun: 0,
    Racist: 1,
    Relationship: 3,
    Religious: 0,
    School: 0,
    Sports: 0,
    'Word-Play': 0,
    Work: 0,
    'Yo Momma': 0,
    })
}

//set value to dropdown then filter
function setval() {
    auth.onAuthStateChanged(user => {
        db.ref('/users/'+user.uid).once('value', function(snapshot){

            var index = Object.values(snapshot.val())
            var val = index[0]
            
            document.getElementById('categoryfilter').value = val
            filter()
        });
    });
}

//Filter jokes
function filter() {
    if (document.getElementById("categoryfilter").value == "Select Category of Joke (Select This Option For All Jokes)") {
    }
    else {
        var category = document.getElementById("categoryfilter").value;
        db.ref('/Cats/'+category).once('value', function(snapshot) {
            
            var val = snapshot.val()
            console.log(val)

            var updatecat = {}
            updatecat['/Cats/'+category] = val+1 

            db.ref().update(updatecat)  
        })
    }

    if (document.getElementById("categoryfilter").value == "Select Category of Joke (Select This Option For All Jokes)" && document.getElementById("typefilter").value == "Most Recent Jokes") {
        getData()
    }
    else if (document.getElementById("categoryfilter").value == "Select Category of Joke (Select This Option For All Jokes)" && document.getElementById("typefilter").value == "Older Jokes") {
        getOlderData()
    }
    else if (document.getElementById("categoryfilter").value != "Select Category of Joke (Select This Option For All Jokes)" && document.getElementById("typefilter").value == "Most Recent Jokes") {
        getCategoryData()
    }
    else if (document.getElementById("categoryfilter").value != "Select Category of Joke (Select This Option For All Jokes)" && document.getElementById("typefilter").value == "Older Jokes") {
        getCategoryandOlderData()
    }
}
  
//Get all jokes (recent)
function getData() {
    auth.onAuthStateChanged(user => {
        if (user) { 
            var jokesdiv = document.getElementById("jokes");
            jokesdiv.innerHTML = "";

            db.ref('/').once('value', function(snapshot) {
                
                var id = snapshot.val().id

                for (i=id-1; i >= 0; i--) {
                    db.ref('/jokes/joke'+i).once('value', function(snapshot) {
                            
                        var lastindex =  Object.keys(snapshot.val());

                        if (snapshot.val()[lastindex].type == "single" & snapshot.val()[lastindex].category !="Yo Momma"){
                        jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                        }
                        else if (snapshot.val()[lastindex].category =="Yo Momma"){
                        jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Yo momma is so '+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                        }
                        else if (snapshot.val()[lastindex].type == "twopart" & snapshot.val()[lastindex].category !="Knock Knock") {
                        jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                        }
                        else if (snapshot.val()[lastindex].category == "Knock Knock") {
                        jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                        }
                    });
                }
            });
        }
    });
}

//Get all jokes (old)
function getOlderData() {  
    auth.onAuthStateChanged(user => {
        if (user) { 
            var jokesdiv = document.getElementById("jokes");
            jokesdiv.innerHTML = "";

            db.ref('/').once('value', function(snapshot) {
                
                var id = snapshot.val().id
                    
                for (i=0; i <= id-1; i++) {
                    db.ref('/jokes/joke'+i).once('value', function(snapshot) {
                    
                        var lastindex =  Object.keys(snapshot.val());

                        if (snapshot.val()[lastindex].type == "single" & snapshot.val()[lastindex].category !="Yo Momma"){
                        jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                        }
                        else if (snapshot.val()[lastindex].category =="Yo Momma"){
                        jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Yo momma is so '+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                        }
                        else if (snapshot.val()[lastindex].type == "twopart" & snapshot.val()[lastindex].category !="Knock Knock") {
                        jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                        }
                        else if (snapshot.val()[lastindex].category == "Knock Knock") {
                        jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                        }
                    });
                }
            });
        }
    });
}

//Get joke by category (recent)
function getCategoryData() { 
    auth.onAuthStateChanged(user => {
        if (user) { 
            var jokesdiv = document.getElementById("jokes");
            jokesdiv.innerHTML = "";

            db.ref('/').once('value', function(snapshot) {
                
                var id = snapshot.val().id

                for (i=id-1; i >= 0; i--) {
                    db.ref('/jokes/joke'+i).once('value', function(snapshot) {   
                        
                        var lastindex =  Object.keys(snapshot.val());
                        var category = document.getElementById("categoryfilter").value;

                        if (snapshot.val()[lastindex].category == category){
                            if (snapshot.val()[lastindex].type == "single" & snapshot.val()[lastindex].category !="Yo Momma"){
                            jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                            }
                            else if (snapshot.val()[lastindex].category =="Yo Momma"){
                            jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Yo momma is so '+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                            }
                            else if (snapshot.val()[lastindex].type == "twopart" & snapshot.val()[lastindex].category !="Knock Knock") {
                            jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                            }
                            else if (snapshot.val()[lastindex].category == "Knock Knock") {
                            jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                            }
                        }
                    });
                }
            });
        }
    });
}

//Get joke by category (old)
function getCategoryandOlderData() { 
    auth.onAuthStateChanged(user => {
        if (user) { 
            var jokesdiv = document.getElementById("jokes");
            jokesdiv.innerHTML = "";

            db.ref('/').once('value', function(snapshot) {
                
                var id = snapshot.val().id
                
                for (i=0; i <= id-1; i++) {
                    db.ref('/jokes/joke'+i).once('value', function(snapshot) {   
                        
                        var lastindex =  Object.keys(snapshot.val());
                        var category = document.getElementById("categoryfilter").value;
                        
                        if (snapshot.val()[lastindex].category == category){
                            if (snapshot.val()[lastindex].type == "single" & snapshot.val()[lastindex].category !="Yo Momma"){
                            jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                            }
                            else if (snapshot.val()[lastindex].category =="Yo Momma"){
                            jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Yo momma is so '+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                            }
                            else if (snapshot.val()[lastindex].type == "twopart" & snapshot.val()[lastindex].category !="Knock Knock") {
                            jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                            }
                            else if (snapshot.val()[lastindex].category == "Knock Knock") {
                            jokesdiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer">Created By: <cite title="Source Title">'+ snapshot.val()[lastindex].author +'</cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'</div></div></div><br>'
                            }
                        }
                    });
                }
            });
        }
    });
}

//Get only user jokes for the My Jokes tab
function myData() {
    auth.onAuthStateChanged(user => {
        if (user) {
            var mydiv = document.getElementById("myjokes");
            var authorid = user.uid;
            
            db.ref('/').once('value', function(snapshot) {
                
                var id = snapshot.val().id

                for (i=id-1; i >= 0; i--) {
                    db.ref('/jokes/joke'+i).once('value', function(snapshot) {   
                        
                        var lastindex =  Object.keys(snapshot.val());
                        
                        if (snapshot.val()[lastindex].authorid == authorid){
                            if (snapshot.val()[lastindex].type == "single" & snapshot.val()[lastindex].category !="Yo Momma"){
                            mydiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer"><cite title="Source Title">id: <div style="margin-left: 40px; margin-top: -24px;">'+ snapshot.val()[lastindex].id +'</div></cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'<button type="button" style="float:right;" class="btn btn-danger" onclick="deletejoke('+snapshot.val()[lastindex].id+')">Delete</button></div></div></div><br>'
                            }
                            else if (snapshot.val()[lastindex].category =="Yo Momma"){
                            mydiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Yo momma is so '+ snapshot.val()[lastindex].joke +'</p><footer class="blockquote-footer"<cite title="Source Title">id: <div style="margin-left: 40px; margin-top: -24px;">'+ snapshot.val()[lastindex].id +'</div></cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'<button type="button" style="float:right;" class="btn btn-danger" onclick="deletejoke('+snapshot.val()[lastindex].id+')">Delete</button></div></div></div><br>'
                            }
                            else if (snapshot.val()[lastindex].type == "twopart" & snapshot.val()[lastindex].category !="Knock Knock") {
                            mydiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer"><cite title="Source Title">id: <div style="margin-left: 40px; margin-top: -24px;">'+ snapshot.val()[lastindex].id +'</div></cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'<button type="button" style="float:right;" class="btn btn-danger" onclick="deletejoke('+snapshot.val()[lastindex].id+')">Delete</button></div></div></div><br>'
                            }
                            else if (snapshot.val()[lastindex].category == "Knock Knock") {
                            mydiv.innerHTML += '<div style="padding-left:15rem; padding-right:15rem"><div class="card"><div class="card-header">#'+snapshot.val()[lastindex].category+'</div><div class="card-body"><blockquote class="blockquote mb-0"><p>Knock Knock!</p><p>Who\'s there?<p>'+ snapshot.val()[lastindex].setup +'</p><p>'+ snapshot.val()[lastindex].setup +' who?</p><p>'+ snapshot.val()[lastindex].punchline +'</p><footer class="blockquote-footer"><cite title="Source Title">id: <div style="margin-left: 40px; margin-top: -24px;">'+ snapshot.val()[lastindex].id +'</div></cite></footer></blockquote></div><div class="card-footer text-muted">'+ snapshot.val()[lastindex].date_posted +'<button type="button" style="float:right;" class="btn btn-danger" onclick="deletejoke('+snapshot.val()[lastindex].id+')">Delete</button></div></div></div><br>'
                            }
                        }
                    });
                }
            });
        }
    })
}

//Delete user's posts **Solution, give each of the posts their own id from the very start, connect the button to that...
function deletejoke(jokeid) {
    console.log(jokeid);
    db.ref('jokes/joke'+jokeid).remove().then(() => {
        console.log('success')
        location.reload();
    })     
}

//Show jokes previous input - part of upload jokes for two liner
var uploadform2 = document.getElementById('upload-form2');
uploadform2.addEventListener('change', e => {
    e.preventDefault()
    
    var category = uploadform2['categorytwo'].value;
    console.log(category)
    document.getElementById('knock-knock').innerHTML = ''
    document.getElementById('knock-knock2').innerHTML = ''
    
    if (category == "Knock Knock") {
        console.log('knock knock')
        document.getElementById('knock-knock').innerHTML = "<p class='text-muted' style='margin-bottom:0px; margin-top:-8px'>Knock Knock!<br>Who's there?</p>"
        document.getElementById('knock-knock2').innerHTML = "<p class='text-muted' style='margin-bottom:0px; margin-top:-8px'>*Setup* who?</p>"
    }
    else {
        console.log('not')
    }
})

//Show jokes previous input - part of upload jokes for one liner
var uploadform = document.getElementById('upload-form');
uploadform.addEventListener('change', e => {
    e.preventDefault()
    
    var category = uploadform['categoryone'].value;
    console.log(category)
    document.getElementById('yo-mama').innerHTML = ''
    
    if (category == "Yo Momma") {
        console.log('YOUR MOM')
        document.getElementById('yo-mama').innerHTML = "<p class='text-muted' style='margin-bottom:0px; margin-top:-8px'>Yo momma is so...</p>"
    }
    else {
        console.log('not')
    }
})

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user);

        //input fields (navbar prof pic)
        var navdiv = document.getElementById('navprof');
    
        db.ref('/users/'+user.uid).once('value', function(snapshot) {  
    
            navdiv.innerHTML += '<img src="'+ snapshot.val().profilepic +'" height="25px" width="25px" style="margin-left:2px; margin-right:3px; margin-bottom: 5px;">'
        });

        //Upload two-part jokes
        var uploadform2 = document.getElementById('upload-form2');
        uploadform2.addEventListener('submit', (e) => {
            document.getElementById('messageinputjoke2').innerHTML = '';
            e.preventDefault();
            db.ref('/').once('value', function(snapshot) {
                var id = snapshot.val().id
                //Authorid
                var authorid = user.uid;
                //Author Username
                var username = user.displayName;
                //category
                var category = uploadform2['categorytwo'].value;
                //joke
                var setup = uploadform2['firstline'].value;
                var punchline = uploadform2['secondline'].value;
                if (category == 'Category') {
                    document.getElementById('messageinputjoke2').innerHTML = 'Please pick a category!';
                }
                else {
                    //Date
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var js_time = date+' '+time;
                    //String Concatonation
                    db.ref('jokes/joke'+id+'/').push({
                        author: username, 
                        authorid: authorid,
                        category: category,
                        date_posted: js_time,
                        id: id,
                        setup: setup,
                        joke: punchline,
                        type: 'twopart',
                    }).then(() => {
                        document.getElementById('smessageinputjoke2').innerHTML = 'Success';
                        updateid = db.ref('/').update({
                            id: id+1
                        })        
                        location.reload();     
                    }).catch(function(error) {
                    document.getElementById('messageinputjoke2').innerHTML = 'Could not upload joke.<br>Joke too long or left blank';
                    })
                }
              })
            })
        
        //Upload one-liner jokes
        var uploadform = document.getElementById('upload-form');
        uploadform.addEventListener('submit', (e) => {
            document.getElementById('messageinputjoke').innerHTML = '';
            e.preventDefault();
            db.ref('/').once('value', function(snapshot) {
                var id = snapshot.val().id
                //Authorid
                var authorid = user.uid;
                //Author Username
                var username = user.displayName;
                //category
                var category = uploadform['categoryone'].value;
                //joke
                var joke = uploadform['jokeline'].value;
                if (category == 'Category') {
                    document.getElementById('messageinputjoke').innerHTML = 'Please pick a category!';
                }
                else {
                    //Date
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var js_time = date+' '+time;
                    //String Concatonation
                    db.ref('jokes/joke'+id+'/').push({
                        author: username, 
                        authorid: authorid,
                        category: category,
                        date_posted: js_time,
                        id: id,
                        joke: joke,
                        type: 'single',
                    }).then(() => {
                        document.getElementById('smessageinputjoke').innerHTML = 'Success';
                        updateid = db.ref('/').update({
                            id: id+1
                        })        
                        location.reload();     
                    }).catch(function(error) {
                    document.getElementById('messageinputjoke').innerHTML = 'Could not upload joke.<br>Joke too long or left blank';
                    })
                }
                })
            })
    }
    else {
        window.location.replace("/index.html");
    }
})
        

