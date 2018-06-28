export class Modal {
    constructor() {
        this.modalCover = document.getElementById('modal-cover');
        this.modalContent = document.getElementById('modal-content');
        this.modalCloseButton = document.getElementById('modal-close-button');

        this.controls = [
            this.modalCover,
            this.modalContent,
            this.modalCloseButton
        ];

        this.controls.map(c => c.style.display = 'none');

        const that = this;
        const hide = () => {
            that.controls.map(c => c.style.display = 'none');
        };

        this.modalCover.addEventListener('click', hide);
        this.modalCloseButton.addEventListener('click', hide);
    }
    
    show(content) {
        const xhttp = new XMLHttpRequest();
        const elmnt = this.modalContent;
        const allControls = this.controls;
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) { 
                elmnt.innerHTML = this.responseText;
            }
            if (this.status == 404) {
                elmnt.innerHTML = 'Page not found.';
            }
            
            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                console.log('Hiding videos because mobile');
                const videos = document.getElementsByTagName('video');
                videos.style.display = 'none';
            }
            allControls.map(c => c.style.display = 'block');
          }
        };

        xhttp.open('GET', content, true);
        xhttp.send();
    }
}