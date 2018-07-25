var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import { Topic } from './topic';
import { Grid } from './grid';
import { Modal } from './modal';
import { isMobile } from './utils';


window.onload = function () {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9rb3Nrb2tvcyIsImEiOiJjamc0MjJldXQ4NXBwMzBwbzd6NDBiZTh5In0.FYICg4VkTs8EhV4BBTiPMA';
    const lon = 30.5555;// 30.521703502765035;
    const lat = 50.455; //50.44810640667666
    
    const boundPadding = 0.5;
    const options = {
        center: [lon, lat],
        container: 'map-container',
        style: 'mapbox://styles/mapbox/light-v9',
        zoom: 11.9,
        minZoom: 9.4,
        keyboard: false,
        dragRotate: false,
        dragPanboolean: false,
        maxBounds: [[lon - boundPadding, lat - boundPadding], [lon + boundPadding, lat + boundPadding]],
        scrollZoom: false
    };

    if (isMobile()) {
        const videoArrow = document.getElementById('video-arrow');
        videoArrow.parentElement.removeChild(videoArrow);

        const mapContainer = document.getElementById('map-container');
        mapContainer.parentElement.removeChild(mapContainer);
    }

    const topics = [];

    topics.push(new Topic(30.645212, 50.46352, 'masha-reva', 'Masha Reva', 'The market of Lesnaya, a paradise for second-hand shoppers (Masha) '));
    topics.push(new Topic(30.44854, 50.473744, 'anton-romanov', 'Anton Romanov', 'The Syrets district, home to the director and his boyfriend (Anton)'));
    topics.push(new Topic(30.5131, 50.4419, 'mariam-nayyem', 'Mariam Nayyem', 'Taras Shevschenko Park, one of Kyiv’s most popular parks (Mariam)'));
    topics.push(new Topic(30.5171335, 50.4694992, 'vasiliy-oleksii', 'Vasiliy & Oleksii', 'The quickly gentrifying area of Podol (Vasiliy & Oleksii)'));
    topics.push(new Topic(30.511723, 50.458786, 'jana-woodstock', 'Jana Woodstock', 'Pagan cemetery atop a hill (Jana)'));
    topics.push(new Topic(30.5004461, 50.4663455, 'sasha-tessio', 'Sasha Tessio', 'Independent radio station (Sasha)'));
    topics.push(new Topic(30.5158929, 50.4598181, 'yasia-khomenko', 'Yasia Khomenko', 'Andreevsky Descent, Kyiv’s most picturesque street (Yasia)'));
    topics.push(new Topic(30.5042795, 50.4598247, 'vova-vorotniov', 'Vova Vorotniov', 'Podol - Petrivska 30-34, former garage cooperative turned into a hidden hang-out (Vova)'));
    topics.push(new Topic(30.58099, 50.479252, 'evgenia-vidischeva', 'Evgenia Vidischeva', 'Troeshina, a notorious commuter district (Evgenia)'));


    const modal = new Modal();
    let map;
    let teaserVidContent = '';
    if (!isMobile()) {
        map = new mapboxgl.Map(options);
        const nav = new mapboxgl.NavigationControl({
            showCompass: false
        });
        map.addControl(nav, 'bottom-right');

        const cdn = 'https://s3.eu-central-1.amazonaws.com/kakdelakyivvideos';
        teaserVidContent = `<video playsinline="true" autoplay="autoplay" muted loop width="100%" poster="img/kyiv.jpg">
            <source src="${cdn}/landing-page/video.webm" type="video/webm">
            <source src="${cdn}/landing-page/video.ogv" type="video/ogv">
            <source src="${cdn}/landing-page/video.mp4" type="video/mp4"> Sorry, your browser does not support HTML5 videos.
        </video>
        <div id="video-arrow" class="arrow bounce"></div>`;


    } else {
        teaserVidContent = '<img src="img/kyiv.jpg" style="width:100%;">';
    }

    const teaserContainer = document.getElementById('teaser-container');
    teaserContainer.innerHTML = teaserVidContent;


    const grid = new Grid(modal);
    let markerId = 99999;
    topics.forEach(topic => {
        if (map) {
            const element = document.createElement('div');
            element.className = 'marker';
            element.id = markerId++;
            element.style.backgroundColor = 'black';

            const markerClass = topic.topicName ===  'masha-reva'
                ? 'marker-text marker-text-left'
                : 'marker-text marker-text-right';

            element.innerHTML = `<div class="${markerClass}">${topic.tooltip}</div>`;

            element.addEventListener('mouseover',  (event) => {
                const elements = document.getElementsByClassName('marker');
                for (let el of elements) {
                    console.log(event);
                    if (el.id === event.target.id) {
                        continue;
                    }

                    el.style.opacity = 0;
                }
            });

            element.addEventListener('mouseout',  (event) => {
                const elements = document.getElementsByClassName('marker');
                for (let el of elements) {
                    el.style.opacity = 1;
                }
            });

            const marker = new mapboxgl.Marker(element).setLngLat([topic.longitude, topic.latitude]).addTo(map);
            element.addEventListener('click', () => modal.show(topic.id, topic.content, topic.topicName));
        }

        grid.addCell(topic);
    });

    if (map) {
        const element = document.createElement('div');
        element.className = 'marker';
        element.innerHTML = `<div class="marker-text marker-text-left">Maidan Nezalezhnosti, the square where the Euromaidan protests took place in 2013-2014</div>`;
        element.style.backgroundColor = 'red';
        const marker = new mapboxgl.Marker(element).setLngLat([30.522667, 50.451102]).addTo(map);
    }

    function removeFadeOut(el, speed) {
        var seconds = speed / 1000;
        el.style.transition = "opacity " + seconds + "s ease";
        el.style.opacity = 1;
    }

    removeFadeOut(document.getElementById('main-title'), 4000);

    const aboutUsLink = document.getElementById('about-us');

    aboutUsLink.addEventListener('click', function () {
        modal.show(null, 'html/about-us.html', null, false);
    });
};

var mainTitleContainer, mainTitleH1, mainTitleH4;
var lastCall = 0;

window.addEventListener('scroll', function () {
    if (!mainTitleContainer || !mainTitleH1 || !mainTitleH4) {
        mainTitleContainer = document.getElementById('main-title');
        mainTitleH1 = document.getElementById('main-title-h1');
        mainTitleH4 = document.getElementById('main-title-h4');
    }

    const now = new Date().getTime();
    const diff = now - lastCall;

    if (diff < 30) {
        return;
    }

    lastCall = now;
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    const mainTitleTop = Math.min(20, 0.1 * scrollPos) + 'vh'; // between 0vh to 80vh
    const mainTitleSize = Math.max(8, 10 - 0.005 * scrollPos) + 'vw'; // between 10vw to 6vw
    // const subTitleSize = Math.max(2, 3 - 0.005*scrollPos) + 'vw'; // between 3vw to 1vw

    mainTitleH1.style.fontSize = mainTitleSize;
    // mainTitleH4.style.fontSize = subTitleSize;
    mainTitleContainer.style.top = mainTitleTop;
});









