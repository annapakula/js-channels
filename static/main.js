"use strict"

import getAllChannels from "./scripts/api.js";
import { digitsFromString, numberToImperialNotation } from "./scripts/utils.js";

const content = document.querySelector(".js-content");
const titleInput = document.querySelector("#sort-title");
const subscribersInput = document.querySelector("#sort-subscribers");
const videosInput = document.querySelector("#sort-videos");
const viewsInput = document.querySelector("#sort-views");
const clearSorting = document.querySelector("#clear-sorting");

function getChannels(sortBy) {
  getAllChannels()
    .then((channels) => {
      content.innerHTML = "";

      if(sortBy) {
        switch (sortBy) {
          case "title":
            channels = channels.sort((a,b) => a.title.localeCompare(b.title)); 
            break;
          case "subscribers":
            channels.sort((a,b) => digitsFromString(a.statistics.subscriberCount) - digitsFromString(b.statistics.subscriberCount)); 
            break;
          case "videos":
            channels.sort((a,b) => digitsFromString(a.statistics.videoCount) - digitsFromString(b.statistics.videoCount)); 
            break;
          case "views":
            channels.sort((a,b) => digitsFromString(a.statistics.viewCount) - digitsFromString(b.statistics.viewCount)); 
            break;
        }
      }

      channels.forEach((channel) => {
        content.innerHTML += `
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
        `;
      });
    })
    .catch((error) => {
      content.innerHTML = `<p>${error.message}</p>`;
      console.error(error);
    });
}

getChannels();

titleInput.addEventListener("click", () => {
  getChannels("title");
})
subscribersInput.addEventListener("click", () => {
  getChannels("subscribers");
})
videosInput.addEventListener("click", () => {
  getChannels("videos");
})
viewsInput.addEventListener("click", () => {
  getChannels("views");
})
clearSorting.addEventListener("click", () => {
  getChannels();
  titleInput.checked = false;
  subscribersInput.checked = false;
  videosInput.checked = false;
  viewsInput.checked = false;
})
