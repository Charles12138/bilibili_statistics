chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.videoData) {
    // Handle received video data
    console.log('Received video data:', request.videoData);
    // You can store or further process the data here
  }
}); 