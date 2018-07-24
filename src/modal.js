import { VideoPlayer } from './video-player';
import { Gallery } from './gallery';

var galleryLoadEvent;

export class Modal {
    constructor() {
        this.modalCover = document.getElementById('modal-cover');
        this.modalContent = document.getElementById('modal-content');
        this.modalCloseButton = document.getElementById('modal-close-button');
        this.modalContentVideo = document.getElementById('modal-content-video');
        this.modalContentText = document.getElementById('modal-content-text');

        this.modalLeftButton = document.getElementById('modal-left-button');
        this.modalRightButton = document.getElementById('modal-right-button');

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
        this.allContent = [];
        this.currentlyShowingContent = -1;

        this.modalLeftButton.addEventListener('click', function() {
            that.currentlyShowingContent--;
            if (that.currentlyShowingContent < 0) {
                that.currentlyShowingContent = that.allContent.length - 1;
            }

            const toShow = that.allContent[that.currentlyShowingContent];
            that.show(that.currentlyShowingContent, toShow.content, toShow.videoName);
        });

        this.modalRightButton.addEventListener('click', function() {
            that.currentlyShowingContent++;
            if (that.currentlyShowingContent >= that.allContent.length) {
                that.currentlyShowingContent = 0;
            }

            const toShow = that.allContent[that.currentlyShowingContent];
            that.show(that.currentlyShowingContent, toShow.content, toShow.videoName);
        });
    }

    register(content, videoName) {
        this.allContent.push({
            content: content, 
            videoName: videoName
        });
    }
    
    show(id, content, videoName, showArrows = true) {
        
        this.modalLeftButton.style.display = 
        this.modalRightButton.style.display = 
            showArrows ? 'block' : 'none';
            
        this.currentlyShowingContent = id;
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
                return;
            }

            document.getElementById('modal-content').scrollTop = 0;
            allControls.map(c => c.style.display = 'block');

            if (galleryLoadEvent) {
                window.clearTimeout(galleryLoadEvent);
            }
            galleryLoadEvent = window.setTimeout(function() {
                const galleries = document.getElementsByClassName('gallery');
                if (galleries && galleries.length > 0) {
                    for (const gallery of galleries) {
                        const topicName = gallery.getAttribute('data-topic');
                        const caption = gallery.getAttribute('data-caption');
                        const imagesString = gallery.getAttribute('data-images');
                        const images = [];
                        for (const num of imagesString.split(',')) {
                            images.push(`img/${topicName}/article-${num}.jpg`);
                        }

                        let captionsArray = null;
                        if (caption) {
                            captionsArray = caption.split('|');
                        }
                        
                        new Gallery(gallery, images, captionsArray);
                    }
                }
            }, 1000);
          }
        };

        xhttp.open('GET', content, true);
        xhttp.send();
    }
}