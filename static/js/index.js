"use strict";

import getAllChannels from "./api.js";
import { numberToImperialNotation, sortElements } from "./utils.js";

localStorage.setItem(
  "visit-count",
  parseInt(localStorage.getItem("visit-count")) + 1 || 1
);
localStorage.setItem(
  "last-visit-date",
  new Intl.DateTimeFormat(
    "pl",
    {day: "numeric", month: "short", year: "numeric"}
  ).format(new Date())
);

const content = document.querySelector(".js-content");
const titleInput = document.querySelector("#sort-title");
const subscribersInput = document.querySelector("#sort-subscribers");
const videosInput = document.querySelector("#sort-videos");
const viewsInput = document.querySelector("#sort-views");
const sortAscending = document.querySelector("#sort-ascending");
const filterChannels = document.querySelector("#filter-channels");
const searchList = document.querySelector("#search-list");
const clearSorting = document.querySelector("#clear-sorting");
const invertColorsButton = document.querySelector("#invert-colors");

let sortAsc = true;
const channels = [];

// Function to display JS YouTube channels
function showChannels({ sortBy, filterValue }) {
  let channelsCopy = [...channels];
  const options = [];

  // Filter channels by typed text
  if(filterValue) {
    channelsCopy = channelsCopy.filter(channel => 
      channel.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0142-\u036f]/g, "")
        .includes(
          filterValue
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0142-\u036f]/g, "")
        )
    );
  }

  if(channelsCopy.length === 0) {
    content.innerHTML = "<p>No search results</p>";
    return;
  }

  sortBy && sortElements(channelsCopy, sortBy);
  // Toggle sorting in ascending/descending order
  !sortAsc && channelsCopy.reverse();

  // Reset main content to prevent elements doubling
  content.innerHTML = "";
  
  channelsCopy.forEach((channel) => {
    options.push(`<option value="${channel.title}">`);

    content.innerHTML += `
      <a class="card__link" href="${channel.customUrl}/?utm_timestamp=${Date.now()}" target="_blank">
        <div class="card">
          <img class="card__image" 
            src="${channel.thumbnails.medium.url}" 
            width="${channel.thumbnails.medium.width}"
            alt="${channel.title} logo"
          />
          <h2 class="card__header">${channel.title}</h2>
          <div class="wrapper__statistics">
            <div class="card__statistic">
              <p class="card__text">SUBSCRIBERS:</p>
              <p class="card__text">
                <b>${numberToImperialNotation(channel.statistics.subscriberCount)}</b>
              </p>
            </div>
            <div class="card__statistic">
              <p class="card__text">VIDEOS:</p>
              <p class="card__text">
                <b>${numberToImperialNotation(channel.statistics.videoCount)}</b>
              </p>
            </div>
            <div class="card__statistic">
              <p class="card__text">VIEWS:</p>
              <p class="card__text">
                <b>${numberToImperialNotation(channel.statistics.viewCount)}</b>
              </p>
            </div>
          </div>
        </div>
      </a>
    `;
  });

  searchList.innerHTML = options.reduce((a,b) => a + b);
}

function getChannels() {
  getAllChannels()
    .then(result => {
      channels.push(...result);
      showChannels({});
    })
    .catch((error) => {
      content.innerHTML = `<p>${error.message}</p>`;
      console.error(error);
    });
}

titleInput.addEventListener("click", () => {
  showChannels({ sortBy: "title" });
});
subscribersInput.addEventListener("click", () => {
  showChannels({ sortBy: "subscribers" });
});
videosInput.addEventListener("click", () => {
  showChannels({ sortBy: "videos" });
});
viewsInput.addEventListener("click", () => {
  showChannels({ sortBy: "views" });
});
sortAscending.addEventListener("click", () => {
  sortAsc = !sortAsc;
  showChannels({});
})
filterChannels.addEventListener("input", e => {
  showChannels({ filterValue: e.target.value });
})
clearSorting.addEventListener("click", () => {
  titleInput.checked = false;
  subscribersInput.checked = false;
  videosInput.checked = false;
  viewsInput.checked = false;
  sortAscending.checked = true;
  filterChannels.value = "";
  sortAsc = true;
  showChannels({});
});
invertColorsButton.addEventListener("click", () => {
  document.documentElement.style.mixBlendMode === "difference"
    ? document.documentElement.style.mixBlendMode = ""
    : document.documentElement.style.mixBlendMode = "difference";
})

getChannels();
