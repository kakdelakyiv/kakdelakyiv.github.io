import { VideoPlayer } from './video-player';

export class Modal {
    constructor() {
        this.modalCover = document.getElementById('modal-cover');
        this.modalContent = document.getElementById('modal-content');
        this.modalCloseButton = document.getElementById('modal-close-button');
        this.modalContentVideo = document.getElementById('modal-content-video');
        this.modalContentText = document.getElementById('modal-content-text');

        this.controls = [
            this.modalCover,
            this.modalContent,
            this.modalCloseButton
        ];

        this.controls.map(c => c.style.display = 'none');

        const that = this;
        const hide = () => {
            that.modalContent.scrollTop = 0;
            that.controls.map(c => c.style.display = 'none');
            this.modalContentVideo.innerHTML = '';
            this.modalContentText.innerHTML = '';
        };

        this.modalCover.addEventListener('click', hide);
        this.modalCloseButton.addEventListener('click', hide);
    }
    
    show(content, videoName) {
        const xhttp = new XMLHttpRequest();
        const elmnt = this.modalContentText;
        const allControls = this.controls;

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) { 
                elmnt.innerHTML = this.responseText;
                if (videoName) {
                    new VideoPlayer(videoName);
                }
            }
            if (this.status == 404) {
                elmnt.innerHTML = 'Page not found.';
            }
            
            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                const videos = document.getElementsByTagName('video');
                videos.style.display = 'none';
            }

            document.getElementById('modal-content').scrollTop = 0;
            allControls.map(c => c.style.display = 'block');
          }
        };

        xhttp.open('GET', content, true);
        xhttp.send();
    }
}