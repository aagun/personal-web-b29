const posts = [
  {
    id: 1639927512954,
    title: 'The HTML <a> Tag – Anchor Tag Example Code',
    content: `HTML(Hyper Text Markup Language) is one of the languages we use to create web applications. It adds structure to your web pages. HTML has various tags we use to create elements.`,
    image:
      'https://www.freecodecamp.org/news/content/images/size/w2000/2021/12/freeCodeCamp-Cover.png',
    author: 'Agun',
    postAt: new Date(
      'Sun Dec 19 2021 22:19:12 GMT+0700 (Western Indonesia Time)'
    ),
  },
  {
    id: 1639927677589,
    title:
      'How to Mute on Zoom – Mute Yourself with a Keyboard Shortcut or a Press of a Button',
    content: `As remote work becomes more and more popular, more and more people and companies are using video conferencing services such as Zoom.`,
    image:
      'https://www.freecodecamp.org/news/content/images/size/w2000/2021/12/How-to-mute-yourself-on-Zoom--2-.jpg',
    author: 'Agun',
    postAt: new Date(
      'Sun Dec 19 2021 22:27:57 GMT+0700 (Western Indonesia Time)'
    ),
  },
];

function imagePreview() {
  let addPostDisplay = document.getElementById('add-post').style.display;
  let imageFile;
  let inputBlogImage;
  let div;
  let imgPrev;
  let imageName = document.querySelector('.nb');

  if (addPostDisplay !== 'none') {
    imgPrev = document.querySelectorAll('#img-preview')[0];
    div = document.querySelectorAll('#preview')[0];
    [imageFile] = document.getElementById('input-blog-image').files;
  } else {
    imgPrev = document.querySelectorAll('#img-preview')[1];
    div = document.querySelectorAll('#preview')[1];
    [imageFile] = document.getElementById('data-blog-image').files;
  }

  // check input image by user
  if (imageFile) {
    const imageExtension = imageFile.type.match(/(?<=image\W)[\w]*/);
    const regex = /(jpeg|png)/;
    const isJpegOrPng = regex.test(imageExtension);

    // check image file extention
    if (!isJpegOrPng) {
      inputBlogImage.value = '';
      return alert('Image extension must be .JEPG/.JPG/.PNG');
    }

    // show the preview image
    let url = URL.createObjectURL(imageFile);

    imageName.innerHTML = imageFile.name;
    imgPrev.src = url;

    if (div.style.display == 'none') {
      div.style.display = 'block';
    }
  } else {
    imageName.innerHTML = 'Image must be .jpeg/.jpg/.png';
    div.style.display = 'none';
  }
}

function cancel() {
  document.getElementById('data-blog-title').value = '';
  document.getElementById('data-blog-content').value = '';
  document.querySelector('#add-post').style.display = 'block';
  document.querySelector('#edit-post').style.display = 'none';
}

// update post
function updatePost(id, author, postAt) {
  console.log(postAt);
  console.log(new Date(postAt));
  let title = document.getElementById('data-blog-title').value;
  let content = document.getElementById('data-blog-content').value;
  let uploadedImage = document.querySelectorAll('#img-preview')[1];
  let image;

  // if user doesn't change the image so it will use prev image url
  if (uploadedImage.src) {
    image = uploadedImage.src;
  } else {
    // get new image url if user upload new image
    uploadedImage = document.getElementById('data-blog-image').files[0];
    image = URL.createObjectURL(uploadedImage);
  }

  // check if all input form filled
  if (!title || !content || !image) {
    return alert('All data must be filled');
  }

  const post = {
    id,
    title,
    content,
    image,
    author,
    postAt: new Date(postAt),
  };

  // find the index of data
  posts.findIndex((p, index) => {
    if (p.id == id) {
      // update new data
      posts.splice(index, 1, post);
    }
  });

  renderPosts();

  document.getElementById('add-post').style.display = 'block';
  document.getElementById('edit-post').style.display = 'none';
  document.querySelectorAll('#preview')[1].style.display = 'none';
}

// edit post by id
function editPost(id) {
  document.getElementById('add-post').style.display = 'none';
  document.getElementById('edit-post').style.display = 'block';
  document.querySelectorAll('#preview')[1].style.display = 'block';

  // get data by id
  let post = posts.filter((p) => p.id == id);

  const { title, content, image, author, postAt } = post[0];
  // render data that want to edit
  document.querySelectorAll('#img-preview')[1].src = image;
  document.getElementById('data-blog-title').value = title;
  document.getElementById('data-blog-content').value = content;

  let button = document.querySelectorAll('.button-group')[1];
  button.innerHTML = `
    <button id="cancle" class="bg-secondary" onclick="cancel()">Cancel</button>
    <button id="update-data" onclick="updatePost(${id}, '${author}', ${postAt.getTime()})">Update</button>
  `;
}

// store data to local storage and url param
function detailPost(id) {
  // local storage cannot store array and objects
  // JSON encode before storing, convert to string
  const post = posts.filter((p) => p.id == id);

  // clear stored data on local storage
  // localStorage.clear();

  // store new data to local storage
  localStorage.setItem(`${id}`, JSON.stringify(post[0]));

  // pass data postId to detail.html by url params
  let params = new URLSearchParams();
  params.append('postId', id);

  const url = `blog-view.html?${params.toString()}`;
  window.open(url);
}

// delete post by id
function deletePost(id) {
  posts.filter((p, index) => {
    if (p.id === id) {
      const message = `Do you want to delete data ${p.title}?`;
      if (confirm(message)) {
        posts.splice(index, 1);
        renderPosts();
        alert('Deleted data success');
      }
    }
  });
}

// adding new post to array
function addPost(event) {
  event.preventDefault();

  let title = document.getElementById('input-blog-title').value;
  let content = document.getElementById('input-blog-content').value;
  let uploadedImage = document.getElementById('input-blog-image');

  // check if all input form filled
  if (!title || !content || uploadedImage.files.length == 0) {
    return alert('All data must be filled');
  }

  let [image] = uploadedImage.files;
  console.log(image);
  const post = {
    id: Date.now(),
    title,
    content,
    image: URL.createObjectURL(image),
    author: 'Agun',
    postAt: new Date(),
  };
  posts.push(post);

  renderPosts();

  // Reset all form inputs
  document.getElementById('input-blog-title').value = '';
  document.getElementById('input-blog-content').value = '';
  document.getElementById('input-blog-image').value = '';
  document.getElementById('preview').style.display = 'none';
}

// render all data on blogs page
function renderPosts() {
  let contentContainer = document.getElementById('contents');
  contentContainer.innerHTML = '';
  for (const post of posts) {
    const { id, title, content, image, author, postAt } = post;
    contentContainer.innerHTML += `
    <div class="blog-list-item">
      <div class="blog-image">
        <img src="${image}" alt="" />
      </div>
    <div class="blog-content">
      <div class="btn-group">
        <button class="btn-edit" onclick="editPost(${id})">Edit Post</button>
        <button class="btn-delete" onclick="deletePost(${id})">Delete Post</button>
        <button class="btn-post" onclick="detailPost(${id})">View Post</button>
      </div>
      <h1>
        <a onclick="deletePost(${id})">${title}</a>
      </h1>
      <div class="detail-blog-content">
        ${getFullTime(postAt)} | ${author}
      </div>
      <div class="detail-blog-content time-post">
        ${getDisctanceTime(postAt)}
      </div>
      <p>
      ${content}
      </p>
    </div>
  </div>`;
  }
}

// custom date from based on local time
function getFullTime(time) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'Mei',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = time.getDate();
  let month = months[time.getMonth()];
  let year = time.getFullYear();
  let hours = time.getHours();
  let minutes = time.getMinutes();

  let fullTime = `${date} ${month} ${year} - ${hours}:${minutes} WIB`;

  return fullTime;
}

// get real time blog post
function getDisctanceTime(time) {
  let timePosted = time;
  let timeNow = new Date();
  let timeDistance = timeNow - timePosted;

  // get time distance by day
  let distanceDay = Math.floor(timeDistance / (23 * 3600 * 1000));
  if (distanceDay == 1) {
    console.log(distanceDay);
    return `a day ago`;
  }
  if (distanceDay >= 1) {
    return `${distanceDay} days ago`;
  }

  // get time distance by hour
  let distanceHours = Math.floor(timeDistance / (60 * 60 * 1000));
  if (distanceHours == 1) {
    return `an hour ago`;
  }
  if (distanceHours > 1) {
    return `${distanceHours} hours ago`;
  }

  // get time distance by minutes
  let distanceMinutes = Math.floor(timeDistance / (60 * 1000));
  if (distanceMinutes == 1) {
    return `a minute ago`;
  }
  if (distanceMinutes > 1) {
    console.log(distanceMinutes + 'minutes');
    return `${distanceMinutes} minutes ago`;
  }

  // get time distance by second
  let distanceSeconds = Math.floor(timeDistance / 1000);
  if (distanceSeconds <= 1) {
    return `Just Now`;
  }
  if (distanceSeconds > 1) {
    console.log(distanceSeconds + 'seconds');
    return `${distanceSeconds} seconds ago`;
  }
}

setInterval(() => {
  renderPosts();
}, 10000);
