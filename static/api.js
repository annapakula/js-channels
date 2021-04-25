async function getAllChannels() {
  const response = await fetch('channels');
  if(!response.ok) {
    throw new Error("Cannot fetch channels.");
  }
  const channels = await response.json();

  return channels;
}

export default getAllChannels;
