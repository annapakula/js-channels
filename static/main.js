"use strict"

import getAllChannels from "./scripts/api.js";
import { digitsFromString, numberToImperialNotation } from "./scripts/utils.js";

const content = document.querySelector(".js-content");
const titleInput = document.querySelector("#sort-title");
const subscribersInput = document.querySelector("#sort-subscribers");
const videosInput = document.querySelector("#sort-videos");
const viewsInput = document.querySelector("#sort-views");
const sortAscending = document.querySelector("#sort-ascending");
const filterChannels = document.querySelector("#filter-channels");
const clearSorting = document.querySelector("#clear-sorting");

let sortBy = "";
let sortAsc = true;
let filterValue = "";
const channels = [];

function showChannels() {
  content.innerHTML = "";

  let copyChannels = [...channels];

  if(filterValue) {
    copyChannels = copyChannels.filter(channel => channel.title.toLowerCase().includes(filterValue.toLowerCase()));
  }

  if(sortBy) {
    switch (sortBy) {
      case "title":
        copyChannels.sort((a,b) => a.title.localeCompare(b.title)); 
        break;
      case "subscribers":
        copyChannels.sort((a,b) => digitsFromString(a.statistics.subscriberCount) - digitsFromString(b.statistics.subscriberCount)); 
        break;
      case "videos":
        copyChannels.sort((a,b) => digitsFromString(a.statistics.videoCount) - digitsFromString(b.statistics.videoCount)); 
        break;
      case "views":
        copyChannels.sort((a,b) => digitsFromString(a.statistics.viewCount) - digitsFromString(b.statistics.viewCount)); 
        break;
    }
  }

  if(!sortAsc) {
    copyChannels.reverse();
  }

  if(copyChannels.length === 0) {
    content.innerHTML = "<p>No search results</p>";
    return;
  }
  copyChannels.forEach((channel) => {
    content.innerHTML += `
      <a class="card__link" href="${channel.customUrl}/?utm_timestamp=${Date.now()}" target="_blank">
        <div class="card">
          <img class="card__image" src="${channel.thumbnails.medium.url}" width="${channel.thumbnails.medium.width}" alt="${channel.title} logo" />
          <h2 class="card__header">${channel.title}</h2>
          <div class="wrapper__statistics">
            <div class="card__statistic">
              <p class="card__text">SUBSCRIBERS:</p>
              <p class="card__text"><b>${numberToImperialNotation(channel.statistics.subscriberCount)}</b></p>
            </div>
            <div class="card__statistic">
              <p class="card__text">VIDEOS:</p>
              <p class="card__text"><b>${numberToImperialNotation(channel.statistics.videoCount)}</b></p>
            </div>
            <div class="card__statistic">
              <p class="card__text">VIEWS:</p>
              <p class="card__text"><b>${numberToImperialNotation(channel.statistics.viewCount)}</b></p>
            </div>
          </div>
        </div>
      </a>
    `;
  });
}

function getChannels() {
  getAllChannels()
    .then(result => {
      channels.push(...result);
      showChannels();
    })
    .catch((error) => {
      content.innerHTML = `<p>${error.message}</p>`;
      console.error(error);
    });
}

getChannels();

titleInput.addEventListener("click", () => {
  sortBy = "title";
  showChannels();
});
subscribersInput.addEventListener("click", () => {
  sortBy = "subscribers";
  showChannels();
});
videosInput.addEventListener("click", () => {
  sortBy = "videos";
  showChannels();
});
viewsInput.addEventListener("click", () => {
  sortBy = "views";
  showChannels();
});
sortAscending.addEventListener("click", () => {
  sortAsc = !sortAsc;
  showChannels();
})
filterChannels.addEventListener("input", e => {
  filterValue = e.target.value;
  showChannels();
})
clearSorting.addEventListener("click", () => {
  titleInput.checked = false;
  subscribersInput.checked = false;
  videosInput.checked = false;
  viewsInput.checked = false;
  sortAscending.checked = true;
  filterChannels.value = "";
  sortAsc = true;
  sortBy = "";
  filterValue = "";
  showChannels();
});
