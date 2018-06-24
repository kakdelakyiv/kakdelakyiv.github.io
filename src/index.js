var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import { Topic } from './topic';
import { Grid } from './grid';
import { Modal } from './modal';
import AboutUs from './html/about-us.html';
import AntonRomanov from './html/topics/anton-romanov.html';

(function () {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9rb3Nrb2tvcyIsImEiOiJjamc0MjJldXQ4NXBwMzBwbzd6NDBiZTh5In0.FYICg4VkTs8EhV4BBTiPMA';
    const lon = 30.521703502765035;
    const lat = 50.44810640667666;
    const boundPadding = 0.5;
    const options = {
        center: [lon, lat],
        container: 'map-container',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 11,
        minZoom: 9.4,
        keyboard: false,
        dragRotate: false,
        dragPanboolean: false,
        maxBounds: [[lon - boundPadding, lat - boundPadding], [lon + boundPadding, lat + boundPadding]],
        scrollZoom: false
    };

    const topics = [];
    for (let i = 0; i < 9; i++) {
        topics.push(new Topic(lon + 0.0300, lat + 0.0130, 'anton-romanov.jpg', 'Anton Romanov', 'An artist from Kiev', AntonRomanov));
    }

    const modal = new Modal();
    const map = new mapboxgl.Map(options);
    const grid = new Grid(modal);

    topics.forEach(topic => {

        const element = document.createElement('div');
        element.className = 'marker';
        element.style.backgroundColor = topic.colour;
        
        const marker = new mapboxgl.Marker(element)
            .setLngLat([topic.longitude, topic.latitude])
            .addTo(map);

        grid.addCell(topic);
        element.addEventListener('click', () => modal.show(topic.content));
    });

    function removeFadeOut( el, speed ) {
        var seconds = speed/1000;
        el.style.transition = "opacity "+seconds+"s ease";
    
        el.style.opacity = 0;
        setTimeout(function() {
            el.parentNode.removeChild(el);
        }, speed);
    }
    
    removeFadeOut(document.getElementById('main-title'), 4000);

    const aboutUsLink = document.getElementById('about-us');

    aboutUsLink.addEventListener('click', function() {
        console.log(AboutUs);
        modal.show(AboutUs);
    });
})();







