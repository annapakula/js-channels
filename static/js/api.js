async function getAllChannels() {
  const response = await fetch('/channels');
  if(!response.ok) {
    throw new Error("Data loading has failed!");
  }
  const channels = await response.json();

  return channels;
}

export default getAllChannels;
