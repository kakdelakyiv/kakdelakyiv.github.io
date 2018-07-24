var topicId = 0; 
export class Topic {
    constructor(longitude, latitude, topicName, title, tooltip) {
        this.topicName = topicName;
        this.longitude = longitude;
        this.latitude = latitude; 
        this.colour = 'black'; 
        this.image = `img/${topicName}/profile.jpg`;
        this.title = title;
        this.tooltip = tooltip;
        this.content = `html/topics/${topicName}.html`;
        this.id = topicId;
        topicId++;
    }
}