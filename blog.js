const posts = [];

function addPost(event) {
  event.preventDefault();
  let title = document.getElementById('input-blog-title').value;
  let content = document.getElementById('input-blog-content').value;
  let image = document.getElementById('input-blog-image');
  // check if all input form filled
  if (!title || !content || image.files.length == 0) {
    return alert('All data must be filled');
  }

  // check image file extention
  const imageExtension = image.files[0].type.match(/(?<=image\W)[\w]*/);
  const regex = /(jpeg|jpg)/;
  const fileFilter = regex.test(imageExtension);

  if (!fileFilter) {
    return alert('Image must be .JEPG or .PNG');
  }

  image = URL.createObjectURL(image.files[0]);

  const post = {
    title,
    content,
    image,
    author: 'Agun',
    postAt: new Date(),
  };

  posts.push(post);
  renderPosts();
}

function renderPosts() {
  let contentContainer = document.getElementById('contents');
  contentContainer.innerHTML = '';
  for (const post of posts) {
    const { title, content, image, author, postAt } = post;
    contentContainer.innerHTML += `
    <div class="blog-list-item">
      <div class="blog-image">
        <img src="${image}" alt="" />
      </div>
    <div class="blog-content">
      <div class="btn-group">
        <button class="btn-edit">Edit Post</button>
        <button class="btn-post">Post Blog</button>
      </div>
      <h1>
        <a href="blog-detail.html" target="_blank">${title}</a>
      </h1>
      <div class="detail-blog-content">
        ${getFullTime(postAt)} | ${author}
      </div>
      <p>
      ${content}
      </p>
      <div class="detail-blog-content">
        ${getDisctanceTime(postAt)}
      </div>
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