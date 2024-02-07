const userTitle = document.querySelector(".user_info");
const userPostsList = document.querySelector(".user_posts_list");
const userUrl = window.location.search;
const userId = userUrl.split("=")[1];
let userInfo;
let userPosts;


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
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address.city,
      telephone: user.phone,
      website: user.website,
      company: user.company.name,
    };
  });
  userInfo = filteredUsers.filter((user) => user.id == userId)[0];
  console.log(userInfo);

  let filteredPosts = postList.map((post) => {
    return {
      userId: post.userId,
      body: post.body,
    };
  });
  userPosts = filteredPosts.filter((post) => post.userId == userId);
  console.log(userPosts);

  userTitle.innerHTML += `
    
        <div class="user-profile_head">
            <div class="user-name_location">
                <h1 class="user_name">${userInfo.name}</h1>
                <span class="user_location">${userInfo.city}, ${userInfo.company}</span>
            </div>
            <div class="user_info_block">
                <span class="user_info_title">Контактная информация</span>
                <span class="user_info_item">Полное имя: <strong>${userInfo.username}</strong></span>
                <span class="user_info_item">Эл.почта: <a href="mailto:${userInfo.email}" class="user-profile_link">${userInfo.email}</a></span>
                <span class="user_info_item">Телефон: <a href="tel:${userInfo.telephone}" class="user-profile_link">${userInfo.telephone}</a></span>
                <span class="user_info_item">Сайт: <a href="${userInfo.website}" class="user-profile_link">${userInfo.website}</a></span>
            </div>
        </div>
    `;

  const outputPosts = userPosts.forEach((post) => {
    userPostsList.innerHTML += `
            <li class="user_posts-item">
                <div class="user_post-item-up">
                    <div class="user_post-item-up_ph"></div>
                    <span class="user_post-item-up_name">${userInfo.name}</span>
                </div>
                <p>${post.body}</p>
            </li>
        `;
  });
};
Actions();
