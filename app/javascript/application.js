// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "channels"
import Hls from 'hls.js';

document.addEventListener('DOMContentLoaded', () => {
    var video = document.getElementById('video');
    var videoSrc = 'http://141.94.206.186:8088/hls/obs_stream.m3u8';  // Remplace par le chemin de ton fichier m3u8

    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
});