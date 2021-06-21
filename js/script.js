let searchBtn = document.querySelector('#searchBtn');
let searchUser = document.querySelector('#userName');
let ui = new UI();
searchBtn.addEventListener('click', (e) => {
    let userText = searchUser.value;
    if (userText != '') {
        e.preventDefault();
        fetch(`https://api.github.com/users/${userText}`)
            .then(result => result.json())
            .then(data => {
                // console.log(data);
                searchUser.value = '';
                if (data.message == 'Not Found') {
                    ui.showAlart(data.message, 'alart alert-danger ')
                }
                else {
                    //show user profie 
                    ui.showProfile(data);
                    ui.getRepos(userText);

                }
            })
    }
    else {
        ui.clearProfile();
        alert('No Input found');
    }
})

