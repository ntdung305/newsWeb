'use strict';

// Get DOM element
const newsContainerEl = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const pageNumEl = document.getElementById("page-num");
const searchBtn = document.getElementById("btn-submit");
const queryInp = document.getElementById("input-query");
// Function to get news from News API
const SearchNews = async function(q, language, pageSize, page, API_KEY){
    // get respone from News API
    const respone = await fetch(`https://newsapi.org/v2/everything?q=${q}&pageSize=${pageSize}&page=${page}&language=${language}&apiKey=${API_KEY}`);
    const obj = await respone.json();

    maxPage = (obj.totalResults/pageSize).toFixed(0);

    // Get articles from respone
    const articles = obj.articles;

    newsContainerEl.innerHTML = '';
    // Add articles to news page
    articles.forEach(article => {
        const news = document.createElement('div');
        news.innerHTML = 
        `
        <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src=${article.urlToImage}
									class="card-img"
									alt=${article.title}>
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${article.title}</h5>
									<p class="card-text">${article.description}</p>
									<a href=${article.url}
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>
        `
        newsContainerEl.appendChild(news);
    });

    // change number of page
    pageNumEl.textContent = `${page}`

    // Hide previous button if current page is 1
    page == 1 ? prevBtn.classList.add("hidden") : prevBtn.classList.remove("hidden");

    // Hide next button if current page is the last page
    page >= maxPage ? nextBtn.classList.add("hidden") : nextBtn.classList.remove("hidden");

    pageControl = page;
    console.log(maxPage)
}
// Load user settings from local Storage
const LoadUserSettings = function(){
    // Declare currentUser to manage current user information
    const currentUser = JSON.parse(getFromStorage(KEY_CURRENT_USER));
    // Load setting news page from local Storage
    const settingsArr = JSON.parse(getFromStorage(KEY_SETTINGS)) || []; // Get Settings Array from local Storage
    // Continue if already have a user settings
    if (settingsArr.length > 0){
        const userSettings = settingsArr.filter(settings=>settings.owner == currentUser.username)[0];
        if (userSettings){
            pageSize = userSettings.pageSize;
        }
    }
}



let maxPage = 0; // the number of maximun page get from API
let addedPagesNav = false; // declare addedPagesNav to manage pages navigation. Just add once.
const language='en'
let pageControl=1; // declare pageControl to manage current page
let pageSize=10;
let q = 'Ha Long Bay'; // Default key to search

// Load setting news page from local Storage
LoadUserSettings();

// Add event when click Search Button
searchBtn.addEventListener('click',function(){
    if (queryInp.value !== ''){
        q = queryInp.value
        SearchNews(q, language, pageSize, pageControl, API_KEY)
    }
    else{
        alert("Please type your query first!");
    }
})

// Go to next page when click "Next button"
nextBtn.addEventListener("click", function(){
    pageControl += 1;
    SearchNews(q, language, pageSize, pageControl, API_KEY)
})

// Go to previous page when click "Previous button"
prevBtn.addEventListener("click", function(){
    pageControl-=1;
    SearchNews(q, language, pageSize, pageControl, API_KEY)
})