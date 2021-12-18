const posts = [];

function imagePreview() {
  let imgPrev = document.getElementById('img-preview');
  let div = document.getElementById('preview');
  let inputBlogImage = document.getElementById('input-blog-image');
  let [imageFile] = inputBlogImage.files;

  // check input image by user
  if (imageFile) {
    const imageExtension = imageFile.type.match(/(?<=image\W)[\w]*/);
    const regex = /(jpeg)/;
    const isJpeg = regex.test(imageExtension);

    // check image file extention
    if (!isJpeg) {
      inputBlogImage.value = '';
      return alert('Image extension must be .JEPG or .JPG');
    }

    // show the preview image
    let url = URL.createObjectURL(imageFile);
    imgPrev.src = url;
    if (div.style.display == 'none') {
      div.style.display = 'block';
    }
  }
}

// function editPost(id) {
//   posts.find((post, index) => {
//     if (post.id == id) {
//       posts.splice(index, 1);
//     }
//   });
//   renderPosts();
// }

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

function deletePost(id) {
  posts.find((post, index) => {
    if (post.id == id) {
      posts.splice(index, 1);
    }
  });
  renderPosts();
}

function addPost(event) {
  event.preventDefault();
  let title = document.getElementById('input-blog-title').value;
  let content = document.getElementById('input-blog-content').value;
  let uploadedImage = document.getElementById('input-blog-image');
  let [image] = uploadedImage.files;
  console.log(image);
  // check if all input form filled
  if (!title || !content || !image) {
    return alert('All data must be filled');
  }
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
