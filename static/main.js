"use strict"
import getAllChannels from "./api.js";

const content = document.querySelector(".js-content");

function numberToImperialNotation(number) {
  if(number.length > 3) {
    const imperialNotation = number
      .match(/\d+/g)
      .reduce((a, b) => a + b)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return imperialNotation;
  }
  return number;
}

getAllChannels()
  .then((channels) => {
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
