"use strict"
import getAllChannels from "./api.js";

getAllChannels()
  .then(channels => {
    console.log(channels)
  })
  .catch(error => console.error(error))
