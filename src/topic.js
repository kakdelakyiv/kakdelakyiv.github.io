var topicId = 1000; 
export class Topic {
    constructor(longitude, latitude, image, title, subtitle, content) {
        this.longitude = longitude;
        this.latitude = latitude; 
        this.colour = 'black'; 
        this.image = image;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.id = `topic_${topicId++}`;
    }
}