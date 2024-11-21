// content.js
function getVideoInfo() {
    const videoTitle = document.querySelector(".video-details-2008 h1");
    const viewsCount = document.querySelector(".views-info .views-count");
    const postDate = document.querySelector(".views-info span:nth-child(4)");
    const likeCount = document.querySelector(".button-like-count");
    const dislikeCount = document.querySelector(".button-dislike-count");
    const midlikeCount = document.querySelector(".button-mid-like-count");

    const videoLink = window.location.href;

    if (videoTitle && viewsCount && postDate && likeCount && dislikeCount && midlikeCount && videoLink) {
        return {
            title: videoTitle.textContent.trim(),
            views: parseInt(viewsCount.textContent.trim().replace(/[^\d]/g, '')),
            date: postDate.textContent.trim(),
            likes: parseInt(likeCount.textContent.trim().replace(/[^\d]/g, '')),
            dislikes: parseInt(dislikeCount.textContent.trim().replace(/[^\d]/g, '')),
            midlikes: parseInt(midlikeCount.textContent.trim().replace(/[^\d]/g, '')),
            link: videoLink
        };
    }
    return null; // Veriler eksikse null döndür
}

// Aralıklı olarak video bilgilerini kontrol et
setInterval(() => {
    const videoInfo = getVideoInfo();
    if (videoInfo) {
        console.log('Video bilgisi gönderiliyor:', videoInfo);
        chrome.runtime.sendMessage({ type: 'video_info', data: videoInfo }); // Video bilgisini background.js'e gönder
    }
}, 5000); // 5 saniyede bir kontrol et
