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

        const contentWrapper = document.createElement('section');
        contentWrapper.classList.add('content-wrapper');
        contentWrapper.innerHTML = content;

        this.modalContent.innerHTML = '';
        this.modalContent.appendChild(contentWrapper);
        this.controls.map(c => c.style.display = 'block');
    }
}