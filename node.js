const itemsList = document.querySelector(".items-list");
const buttonFilter = document.querySelector(".filtered");
document.body.onload = () => {
    setTimeout( () => {
        const preloader = document.querySelector('.preloader');
        if ( !preloader.classList.contains('hide')) {
            preloader.classList.add('hide');
        }
    }, 1500);
}

const getUsers = async () => {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  return users.json();
};
const getPosts = async () => {
  posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  return posts.json();
};

const Actions = async () => {
  const userList = await getUsers();
  const postList = await getPosts();

  let filteredUsers = userList.map((user) => {
    return {
      name: user.name,
      email: user.email,
      company: user.company.name,
      userId: user.id,
    };
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
                        <button class="user_button">Перейти
                    </div>
            </li>
        `;
    });
  };
  outputUsers();
};
Actions();