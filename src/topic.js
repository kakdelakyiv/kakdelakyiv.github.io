var topicId = 0; 
export class Topic {
    constructor(longitude, latitude, topicName, title, subtitle) {
        this.topicName = topicName;
        this.longitude = longitude;
        this.latitude = latitude; 
        this.colour = 'black'; 
        this.image = `img/${topicName}/profile.jpg`;
        this.title = title;
        this.subtitle = subtitle;
        this.content = `html/topics/${topicName}.html`;
        this.id = topicId;
        topicId++;
    }
}