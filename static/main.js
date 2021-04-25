"use strict"
import getAllChannels from "./api.js";

const content = document.getElementsByClassName("js-content")[0];

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
      <div>
        <img src="${channel.thumbnails.default.url}" alt="${channel.title} logo" />
        <h2>${channel.title}</h2>
        <div>
          <div>
            <p>SUBSCRIBERS:</p>
            <p><b>${numberToImperialNotation(channel.statistics.subscriberCount)}</b></p>
          </div>
          <div>
            <p>VIDEOS:</p>
            <p><b>${numberToImperialNotation(channel.statistics.videoCount)}</b></p>
          </div>
          <div>
            <p>VIEWS:</p>
            <p><b>${numberToImperialNotation(channel.statistics.viewCount)}</b></p>
          </div>
        </div>
      </div>
    `;
    });
  })
  .catch((error) => console.error(error));
