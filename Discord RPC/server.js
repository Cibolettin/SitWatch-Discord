// server.js
const express = require('express');
const cors = require('cors');
const { Client } = require('discord-rpc');

const app = express();
const port = 3000;
const clientId = '1308837622885388298'; // Discord uygulama ID'nizi buraya girin
const rpc = new Client({ transport: 'ipc' });

app.use(cors());  // Tüm originler için CORS'u aç
app.use(express.json());  // JSON verisini parse etmek için

// server.js

app.post('/update-status', (req, res) => {
    const video = req.body;
    //console.log('Gelen video bilgileri:', video);  // Gelen veriyi kontrol et

    if (!video) {
        return res.status(400).json({ error: 'Geçersiz veri' });  // Eğer veri yoksa, hata döndür
    }

    // Discord RPC güncelleniyor
    rpc.setActivity({
        tpye: "WATCHING",
        details: `${video.title}`,
        state: `Görüntülenme: ${video.views} • ${video.date}`,
        largeImageKey: "logo",
        largeImageText: "Sitwatch.net",
        buttons: [{ label: "Videoyu Izle", url: "https://sitwatch.net" }],
        smallImageKey: "logo",
        smallImageText: `Beğeniler: ${video.likes}, Beğenmeme: ${video.dislikes}, Karasız: ${video.midlikes}`
    })
        .then(() => {
            res.json({ message: 'Durum başarıyla güncellendi!' });
        })
        .catch(err => {
            console.error('RPC Güncellenemedi:', err);  // Eğer RPC tarafında hata varsa
            res.status(500).json({ error: 'RPC güncellenemedi', details: err });
        });
});


// Discord RPC'yi başlat
rpc.login({ clientId }).catch(console.error);

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
