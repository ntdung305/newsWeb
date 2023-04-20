'use strict'
// Get DOM element
const newsContainerEl = document.getElementById("news-container");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const sampleLiEl = document.getElementById("sample-li");

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
            category = userSettings.category;
        }
    }
}

// Add more option for Page navigation
const AddLi = function(){
    if (addedPagesNav == false){
        for (let i = maxPage; i >=1; i--){
            const liEl = document.createElement('li');
            liEl.classList.add("page-item");
            liEl.innerHTML =
            `
            <a class="page-link" id="page-${i}" onclick="GetNews('${country}', '${category}', ${pageSize}, ${i}, '${API_KEY}')">${i}</a>
            `
            sampleLiEl.parentNode.insertBefore(liEl, sampleLiEl.nextSibling);
        }
        addedPagesNav = true;
    }
    
}
// Function to get news from News API
const GetNews = async function(country, category, pageSize, page, API_KEY){
    // get respone from News API
    const respone = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`);
    const obj = await respone.json();
    console.log(obj)
    maxPage = (obj.totalResults/pageSize).toFixed(0);
    console.log(maxPage)
    // Get articles from respone
    const articles = obj.articles;
    console.log(articles)
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

    // Add button for change pages 
    AddLi(maxPage);

    // Hide previous button if current page is 1
    page === 1 ? prevBtn.classList.add("hidden") : prevBtn.classList.remove("hidden");

    // Hide next button if current page is the last page
    page == maxPage ? nextBtn.classList.add("hidden") : nextBtn.classList.remove("hidden");
    console.log(page, maxPage);

    /* Animation for change page number */
    // Unhighlight previous page
    document.getElementById(`page-${pageControl}`).style.backgroundColor = '#fff';
    // Highlight current page
    document.getElementById(`page-${page}`).style.backgroundColor = '#74c0fc';
    
    // update current page for pageControl
    pageControl = page;
}

let maxPage = 0; // the number of maximun page get from API
let addedPagesNav = false; // declare addedPagesNav to manage pages navigation. Just add once.

const country='us'
let pageControl=1; // declare pageControl to manage current page
let category='business', pageSize=10;
LoadUserSettings();
    
// Load first page by default
GetNews(country, category, pageSize, pageControl, API_KEY);

// Go to next page when click "Next button"
nextBtn.addEventListener("click", function(){
    // Unhighlight current page
    document.getElementById(`page-${pageControl}`).style.backgroundColor = '#fff';
    // Go to next page
    pageControl += 1;
    GetNews(country, category, pageSize, pageControl, API_KEY)
})

// Go to previous page when click "Previous button"
prevBtn.addEventListener("click", function(){
    // Unhighlight current page
    document.getElementById(`page-${pageControl}`).style.backgroundColor = '#fff';
    // Go to previous page
    pageControl-=1;
    GetNews(country, category, pageSize, pageControl, API_KEY)
})
