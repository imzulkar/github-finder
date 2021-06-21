class UI {
    constructor() {
        this.profile = document.querySelector('.container');

    }
    showProfile(user) {
        this.clearAlart();
        this.profile.innerHTML = `
        <div class=" card">
        <div class="image">
            <img src="${user.avatar_url}"
                class="rounded float-start" alt="${user.login}">
        </div>
        <div class="information">
            <div class="name">
                <h2>${user.name}</h2>
                <p>@${user.login}</p>
            </div>
            <div class="details">
                <p>Location: ${user.location}</p>
                <p>Twitter Username: ${user.twitter_username}</p>
            </div>

            <div class="user-rate">
                <div class="user ">
                    <h4>${user.following}</h4>
                    <p>Following</p>
                </div>
                <div class="user">
                    <h4>${user.followers}</h4>
                    <p>Followers</p>
                </div>
                <div class="user">
                    <h4>${user.public_repos}</h4>
                    <p>Public Repos</p>
                </div>
            </div>
            <div id="repos"></div>
            <div class="links">
                <div class="follow">
                    <a href="" target="_blank">Follow</a>
                </div>
                <div class="follow">
                    <a href="${user.html_url}" target="_blank">View Profile</a>
                </div>
            </div>
        </div>
        </div>

        `
    }
    clearProfile() {
        this.profile.innerHTML = '';

    }
    showAlart(message, className) {
        this.clearAlart();
        this.clearProfile();
        let div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('#searchContainer');
        let search = document.querySelector('.form-group')
        container.insertBefore(div, search);
    }
    clearAlart() {
        let currentAlart = document.querySelector('.alart');
        if (currentAlart) {
            currentAlart.remove();

        }
    }

    getRepos(username) {
        const resp = fetch(`https://api.github.com/users/${username}/repos`)
            .then(respData => respData.json())
            .then(repData => {
                const reposEl = document.getElementById("repos");
                repData
                    .sort((a, b) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 10)
                    .forEach((repo) => {
                        const repoEl = document.createElement("a");
                        repoEl.classList.add("repo");

                        repoEl.href = repo.html_url;
                        repoEl.target = "_blank";
                        repoEl.innerText = repo.name;

                        reposEl.appendChild(repoEl);
                    });
            })

    }

    // addReposToCard(repos) {
    //     const reposEl = document.getElementById("repos");

    //     repos
    //         .sort((a, b) => b.stargazers_count - a.stargazers_count)
    //         .slice(0, 10)
    //         .forEach((repo) => {
    //             const repoEl = document.createElement("a");
    //             repoEl.classList.add("repo");

    //             repoEl.href = repo.html_url;
    //             repoEl.target = "_blank";
    //             repoEl.innerText = repo.name;

    //             reposEl.appendChild(repoEl);
    //         });
    // }
}