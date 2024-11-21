// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "video_info") {
        const videoData = message.data;
        console.log('Video bilgisi alındı:', videoData);  // Gelen veri doğru şekilde alındı
        // Burada fetch işlemi yapılabilir
        fetch('http://localhost:3000/update-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videoData),
        })
            .then(response => {
                console.log('Sunucudan gelen cevap:', response);
                return response.json(); // Yanıtı json olarak döndürüyoruz
            })
            .then(data => {
                console.log('Veri başarıyla gönderildi:', data);
            })
            .catch(error => {
                //console.error('Hata:', error); // Eğer fetch sırasında hata alırsanız burası devreye girecek
            });
    }
});
