let userImput = document.getElementById("userImput");
let btn = document.getElementById("btn");
let result = document.getElementById("result");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let userInfo = document.getElementById("userInfo");

const token = "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";

function showUserInfo(data, imageUrl) {
  const name = data.name || "Name not available";
  const login = data.login || "Login not available";
  const html_url = data.html_url || "#";
  const public_repos = data.public_repos || 0;

  modal.style.display = "block";
  userInfo.innerHTML = "";
   userInfo.innerHTML = `
    <span>  <img class="userAvatar" src="${imageUrl}" alt="User Avatar" /></span>
    <div class="info">
      <h4>Name:</h4>
      <span>${data.name}</span>
    </div>
    <div class="info">
      <h4>Login:</h4>
      <span>${data.login}</span>
    </div>
    <div class="info">
      <h4>HTML URL:</h4>
      <a href="${data.html_url}">${data.html_url}</a>
    </div>
    <div class="info">
      <h4>Public Repos:</h4>
      <span>${data.public_repos}</span>
    </div>`;
}

btn.addEventListener("click", () => {
  let inputValue = userImput.value;

  if (inputValue === "") {
    fetchDefaultUsers();
  } else {
    let url = `https://api.github.com/users/${inputValue}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        fetch(data.avatar_url)
          .then(response => response.blob())
          .then(blob => {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);

            result.innerHTML = `
              <div class="userCard" onclick="showUserInfo(${JSON.stringify(
                data
              )}, '${imageUrl}')">
                <img class="userAvatar" src="${imageUrl}" alt="User Avatar" />
                <div class="userName">
                  <h3>Name:</h3>
                  <span>${data.name}</span>
                </div>
              </div>`;
          })
          .catch(error => {
            console.error("Error:", error);
          });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
});

const fetchDefaultUsers = () => {
    
    
    fetch("https://api.github.com/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(users => {
        if (Array.isArray(users)) {
          const defaultUsers = users.slice(0, 40);
          defaultUsers.forEach(user => {
            fetch(user.avatar_url)
              .then(response => response.blob())
              .then(blob => {
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL(blob);
  
                const userCard = document.createElement("div");
                userCard.classList.add("userCard");
                userCard.innerHTML = `
                  <img class="userAvatar" src="${imageUrl}" alt="User Avatar" />
                  <div class="userName">
                    <h3>Name:</h3>
                    <span>${user.login}</span>
                  </div>
                `;
                userCard.addEventListener("click", () => {
                  showUserInfo(user, imageUrl);
                });
                result.appendChild(userCard);
              })
              .catch(error => {
                console.error("Error:", error);
              });
          });
        } else {
          console.error("Error: Invalid response from GitHub API");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  
span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});



