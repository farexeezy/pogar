const itemsList = document.querySelector(".items-list");
const buttonFilter = document.querySelector(".filtered");
const username = document.getElementById("username");
const userFind = document.getElementById("userFind");
const sortAtoZ = document.getElementById("sortAtoZ");
const sortLength = document.getElementById('sortLength');
const sortList = document.getElementById("sort-list");


buttonFilter.addEventListener("click", () => {
  sortList.classList.toggle("sort-list-hide");
});


const getUsers = async () => {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  return users.json();
};


const Actions = async () => {
  const userList = await getUsers();

  let filteredUsers = userList.map((user) => {
    return {
      name: user.name,
      email: user.email,
      company: user.company.name,
      userId: user.id,
    };
  });

  const searchUser = (username) => {
    const filters = filteredUsers.filter((user) =>
        user.name.includes(username)
    );
    filters.forEach((user) => {
        itemsList.innerHTML += `
        <li class="li-item">
            <div class="user_ph"></div>
            <div class="user_description">
              <span class="user_name"><a${user.userId}">${user.name}</a></h2>
              <span class="user_company normal">${user.company}</span>  
              <span class="user_email small">${user.email}</span>
            </div>
            <div class="user_follow">
                        <button class="user_button"><a href="./userProfile.html?userId=${user.userId}">Перейти
                    </div>
        </li>
    `;
    });
};

username.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
      if (!username.value == '') {
          let usernameRight = username.value[0].toUpperCase() + username.value.slice(1);
          itemsList.innerHTML = ` `;
          searchUser(usernameRight);
      } else {
          searchUser(username.value)
      }
  }
});

  const outputUsers = () => {
    filteredUsers.forEach((user) => {
      itemsList.innerHTML += `
            <li>
                <div class="user_ph"></div>
                <div class="user_description">
                  <span class="user_name"><a${user.userId}>${user.name}</a></span>
                  <span class="user_company normal">${user.company}</span>  
                  <span class="user_email small">${user.email}</span>
                </div>
                <div class="user_follow">
                        <button class="user_button"><a href="./userProfile.html?userId=${user.userId}">Перейти
                    </div>
            </li>
        `;
    });
  };
  outputUsers();

  sortAtoZ.addEventListener("click", () => {
    if (sortAtoZ.innerText === "Сортировать A-Z") {
        sortAtoZ.innerText = "Сортировать Z-A";
        filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
        itemsList.innerHTML = ``;
        outputUsers();
    } else {
        sortAtoZ.innerText = "Сортировать A-Z";
        filteredUsers.reverse();
        itemsList.innerHTML = ``;
        outputUsers();
    }
});

sortLength.addEventListener('click', () => {
    if (sortLength.innerText === 'Сортировать по длине ↓') {
        sortLength.innerText = 'Сортировать по длине  ↑';
        filteredUsers.sort( (a, b) => b.name.length - a.name.length);
        itemsList.innerHTML = '';
        console.log(filteredUsers)
        outputUsers();
    } else {
        sortLength.innerText = 'Сортировать по длине  ↓';
        filteredUsers.reverse();
        itemsList.innerHTML = '';
        console.log(filteredUsers);
        outputUsers();
    }
})


};
Actions();