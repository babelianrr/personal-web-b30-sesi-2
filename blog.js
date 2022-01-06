let articles = [];

let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
let hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

function getTime(time) {

  let year = time.getFullYear();
  let month = time.getMonth();
  let date = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let day = time.getDay();

  return `Posted at ${date} ${monthName[month]} ${year} (${dayName[day]}) ${hours[hour]}:${minutes[minute]} WIB`
}

function getTimeDist(time) {

  let createdAt = time
  let timeNow = new Date()

  let dist = timeNow - createdAt

  let msec = 1000 // milisekon dalam satu detik
  let minsec = 60 // detik da;am satu menit
  let hrmin = 60 // menit dalam satu jam
  let hrssec = 3600 // detik dalam satu jam
  let dayhrs = 23 // jam dalam satu hari
  let weekday = 6 // hari dalam satu pekan
  let monthday = 30 // hari dalam satu bulan
  let yrday = 365 // hari dalam satu tahun

  let distyr = Math.floor(dist / (msec * hrssec * dayhrs * yrday))
  let distmon = Math.floor(dist / (msec * hrssec * dayhrs * monthday))
  let distweek = Math.floor(dist / (msec * hrssec * dayhrs * weekday))
  let distDay = Math.floor(dist / (msec * hrssec * dayhrs))
  let disthrs = Math.floor(dist / (msec * minsec * hrmin))
  let distmin = Math.floor(dist / (msec * minsec))
  let distsec = Math.floor(dist / msec)

  if (distyr >= 1) {
    return `${distyr} year(s) ago`;
  } else if (distmon >= 1) {
    return `${distmon} month(s) ago`;
  } else if (distweek >= 1) {
    return `${distweek} week(s) ago`;
  } else if (distDay >= 1) {
    return `${distDay} day(s) ago`;
  } else if (disthrs >= 1) {
    return `${disthrs} hour(s) ago`;
  } else if (distmin >= 1) {
    return `${distmin} minute(s) ago`;
  } else {
    return `${distsec} second(s) ago`;
  }
}

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image").files;

  image = URL.createObjectURL(image[0])

  let blogData = {
    title: title,
    content: content,
    image: image,
    author: 'Kim Subjong',
    created_at: new Date(),
  }

  articles.push(blogData)

  renderBlog();
}

//  Document Object Model
function renderBlog() {
  let contents = document.getElementById("contents");

  contents.innerHTML = '';

  for (let i = 0; i < articles.length; i++) {
    contents.innerHTML += `
    <div class="blog-list-item">
      <div class="blog-image">
        <img src="${articles[i].image}" alt="" />
      </div>
      <div class="blog-content">
        <div class="btn-group">
          <button class="btn-edit">Edit Post</button>
          <button class="btn-post">Post Blog</button>
        </div>
        <h1>
          <a href="blog-detail.html" target="_blank"
            >${articles[i].title}</a>
        </h1>
        <div class="detail-blog-content">
          ${getTimeDist(articles[i].created_at)} by ${articles[i].author}
        </div >
      <p>
        ${articles[i].content}
      </p>
      </div >
    </div >
      `;
  }

}

// setInterval(() => (
//   renderBlog()
// ), 5000)
