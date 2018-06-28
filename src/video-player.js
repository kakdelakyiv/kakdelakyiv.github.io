export class VideoPlayer {
    constructor(videoFolder) {
        this.videoElement = document.createElement('video');
        this.videoElement.id = 'intro-vid';
        this.videoElement.setAttribute('playsinline', 'true');
        this.videoElement.setAttribute('autoplay', 'autoplay');
        this.videoElement.setAttribute('width', '100%');
        this.videoElement.loop = true;
        this.videoElement.muted = true;

        const types = [ 'webm', 'ogv', 'mp4' ];

        for (const type of types) {
            const sourceElement = document.createElement('source');
            sourceElement.setAttribute('src', `vid/${videoFolder}/video.${type}`); 
            sourceElement.setAttribute('type', `video/${type}`); 
            this.videoElement.appendChild(sourceElement);
        }

        this.playButton = document.createElement('div');
        this.playButton.id = 'intro-vid-play-button';
        const thatVideoElement = this.videoElement;
        const thatPlayButtonElement = this.playButton;

        this.playButton.addEventListener('click', function() {
            thatVideoElement.setAttribute('playsinline', 'false');
            thatVideoElement.removeAttribute('autoplay');
            thatVideoElement.setAttribute('width', '100%');
            thatVideoElement.loop = false;
            thatVideoElement.muted = false;
            thatVideoElement.controls = true;
            thatPlayButtonElement.style.display = 'none';

            const titles =  document.getElementsByClassName('video-title');
            if (titles) {
                titles[0].style.display = 'none';
            }
        });

        const videoContainer = document.getElementById('modal-content-video');
        videoContainer.innerHTML = '';
        videoContainer.appendChild(this.videoElement);
        videoContainer.appendChild(this.playButton);
    }
}