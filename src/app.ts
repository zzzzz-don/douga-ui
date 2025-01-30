interface Video {
  title: string;
  url: string;
}

const apiUrl = "https://run.mocky.io/v3/0dea2ab8-510e-4e95-b5f7-fa4a517bfee7";

function fetchVideoList() {
  return fetch(apiUrl).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}

function displayVideos(videos: Video[]) {
  const videoList = document.getElementById("video-list");
  if (!videoList) return;

  videos.forEach((video) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = video.url;
    link.textContent = video.title;
    link.target = "_blank";
    listItem.appendChild(link);
    videoList.appendChild(listItem);
  });
}

fetchVideoList()
  .then(displayVideos)
  .catch((error) => console.error("Error fetching video list:", error));
