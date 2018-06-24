export class Grid {
    constructor(modal) {
        this.gridContainer = document.getElementById('grid-container');
        this.allTopics = [];
        this.modal = modal;
    }

    addCell(topic) {
        const cell = document.createElement('article');
        cell.id = topic.id;

        const img = document.createElement('img');
        img.src = `img/profiles/${topic.image}`;

        const title = document.createElement('h1');
        title.innerHTML = topic.title;

        cell.appendChild(img); 
        cell.appendChild(title);

        cell.classList.add('grid-cell');
        cell.addEventListener('click', () =>  this.modal.show(topic.content));

        this.gridContainer.appendChild(cell);
        this.allTopics.push(topic);
    }
}