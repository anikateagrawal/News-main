// variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis 
const API_KEY = "554b68d2faa3412f8c0646e0d03cdc09";
const HEADLINES_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/general/in.json";
const HEALTH_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";
const BUSINESS_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json";
const SPORTS_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json";
const ENTERTAINMENT_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/entertainment/in.json";
const TECHNOLOGY_NEWS = "https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newsType.innerHTML="<h4>Headlines</h4>";
    fetchHeadlines();
};


generalBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Health</h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}


const fetchGeneralNews = async () => {
    const response = await fetch(HEALTH_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        // handle errors
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

const fetchQueryNews = async () => {

    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apikey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //error handle
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}

function displayNews() {

    newsdetails.innerHTML = "";

    // if(newsDataArr.length == 0) {
    //     newsdetails.innerHTML = "<h5>No data found.</h5>"
    //     return;
    // }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}

