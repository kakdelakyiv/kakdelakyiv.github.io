export class Gallery {
    constructor (parentElement, images, caption) {

        this.allImageElements = [];
        this.currentImageIndex = 0;

        const container = document.createElement('div');
        container.classList.add('image-gallery-container');

        for (let i = 0; i < images.length; i++) {
            const imagePath = images[i];
            const imageElement = document.createElement('img');
            imageElement.classList.add('image-gallery-image');
            // imageElement.classList.add('article-image');
            imageElement.src = imagePath;

            if (i !== this.currentImageIndex) {
                imageElement.style.display = 'none';
            }

            container.appendChild(imageElement);
            this.allImageElements.push(imageElement);
        }

        const that = this;

        const leftArrow = document.createElement('a');
        leftArrow.classList.add('image-gallery-left');
        leftArrow.addEventListener('click', function() { 
            that.moveSlides(-1);
        });

        leftArrow.innerHTML = '❮';
        container.appendChild(leftArrow);

        const rightArrow = document.createElement('a');
        rightArrow.classList.add('image-gallery-right');
        rightArrow.addEventListener('click', function() { 
            that.moveSlides(1);
        });

        rightArrow.innerHTML = '❯';
        container.appendChild(rightArrow);

        if (caption) {
            const captionElement = document.createElement('figcaption');
            captionElement.innerHTML = caption;
            container.appendChild(captionElement);
        }

        parentElement.appendChild(container);
    }

    moveSlides(direction) {
        this.currentImageIndex += direction;
        const max = this.allImageElements.length;
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = max - 1;
        } else if (this.currentImageIndex >= max) {
            this.currentImageIndex = 0;
        }

        for (let i = 0; i < max; i++) {
            this.allImageElements[i].style.display = i === this.currentImageIndex
                ? 'block'
                : 'none';
        }
    }
}
