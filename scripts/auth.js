const registration = document.querySelector('#registration');
const login = document.querySelector('#login');
const logout = document.querySelector('#logout');

let currentUser = null;

//listen fo auth status changed

auth.onAuthStateChanged( user => {
    currentUser = user;
    if (user) {
        console.log('usser logged in',  user.displayName);
    }
    else {
        console.log('usser logged out');
    
    }
    setupUI(user);
});

// signup

registration.addEventListener('submit', (e) => {
   e.preventDefault();

    //user info
    const email = registration['email'].value;
    const password = registration['password'].value;
    const username = registration['username'].value;
    console.log(username, email, password);


    //registration
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        cred.user.updateProfile({
            displayName: username
        }).then( () => {
            registration['email'].value = '';
            registration['password'].value = '';
            registration['username'].value = '';
        });

    })
})

//logout

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})


//login

login.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info
    const email = login['email'].value;
    const password = login['password'].value;

    auth.signInWithEmailAndPassword(email, password).then( cred =>{
        login['email'].value = '';
        login['password'].value = '';
    })
})
