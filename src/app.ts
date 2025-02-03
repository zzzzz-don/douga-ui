interface Video {
  title: string;
  url: string;
}

const apiUrl = "https://run.mocky.io/v3/0dea2ab8-510e-4e95-b5f7-fa4a517bfee7";

async function fetchVideoList(): Promise<Video[]> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching video list:", error);
    return [];
  }
}

function extractYouTubeID(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|.*\/))([^?&]+)/
  );
  return match ? match[1] : null;
}

function displayVideos(videos: Video[]) {
  const videoList = document.getElementById("video-list");
  if (!videoList) return;

  videoList.innerHTML = ""; // 既存リストをクリア

  videos.forEach((video) => {
    const videoId = extractYouTubeID(video.url);
    if (!videoId) return;

    const listItem = document.createElement("div");
    listItem.className = "video-card";

    const thumbnail = document.createElement("img");
    thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    thumbnail.alt = video.title;

    const link = document.createElement("a");
    link.href = video.url;
    link.textContent = video.title;
    link.target = "_blank";

    listItem.appendChild(thumbnail);
    listItem.appendChild(link);
    videoList.appendChild(listItem);
  });
}

fetchVideoList().then(displayVideos);
