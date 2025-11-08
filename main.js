import { mockNewsData } from '/offlineData.js';
const availableQueries = [
  "technology", "sports", "business", "health", "science", "entertainment",
  "education", "politics", "travel", "environment"
];
const container = document.querySelector(".container");
const heading = document.getElementById("heading");
container.style.padding = "1rem 1.5rem";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.textAlign = "center";
container.style.alignItems = "center";
container.style.fontFamily = "serif";
const category = document.getElementById("searching");
category.style.padding = "0.4rem";
category.style.borderRadius = "1rem";
category.style.border = "none";
category.style.outlineColor = "black";
const searchBtn = document.getElementById("search");
searchBtn.style.padding = "0.4rem";
searchBtn.style.borderRadius = "1rem";
searchBtn.style.border = "none";
const massage = document.getElementById("massage");
const topnews = document.getElementById("topNews");
topnews.style.display = "flex";
topnews.style.flexDirection = "column";
topnews.style.textAlign = "center";
topnews.style.alignItems = "center";
const headlines = document.getElementById("related-posts");

function displayMock_Data(data) {
  const top_News = data.topNews;
  topnews.innerHTML = `
  <div>
   <h2>${top_News.title}</h2>
   <p style="font-size:11px;">${top_News.description}</p>
   <div><a href="${top_News.link}">Read More..</a></div>
   <hr>
  </div>`;
  const articles = data.articles;
  console.log(articles);
  articles.forEach(article => {
    const post = document.createElement("div");
    post.style.display = "flex";
    post.style.textAlign = "center";
    post.style.alignItems = "center";
    post.style.width = "285px";
    post.style.height = "285px";
    post.style.marginTop = "1rem";
    post.style.padding = "1rem 1rem";
    post.style.border = "1px solid black";
    post.style.borderRadius = "1rem";
    post.innerHTML = `
    <div>

    </div>
    <div>
    <h2>${article.title}</h2>
    <p style="font-size:11px; marin: 25px;" >${article.description}</p>
    <a href="${article.link}" >Read More</a>
    </div>`;
    headlines.appendChild(post);
  })
};

function fetch(category) {
  let data = true;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(mockNewsData.find(news => news.category === category));
      }else {
        reject("Couldn't fetch news..");
      }
    }, 2000);
  });
};

async function fetchNews(category) {
  massage.style.visibility = "visible";
  massage.textContent = "Loading..";
  topnews.innerHTML = "";
  headlines.innerHTML = "";
  console.log('Loading..');
  try {
    const category_data = await fetch(category);
    console.log(category_data);
    displayMock_Data(category_data);
    massage.style.visibility = "hidden";
    
  } catch (err) {
    massage.textContent = err;
  }
}

searchBtn.addEventListener("click", () => {
  fetchNews(category.value.trim().toLowerCase());
});

window.addEventListener("load", ()=>{
  category.value = availableQueries[Math.round(Math.random()*availableQueries.length)];
  fetchNews(category.value.trim().toLowerCase());
});