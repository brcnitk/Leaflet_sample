
const myMap = L.map('map').setView([13.0102, 74.7938], 16.5);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tileLayer = L.tileLayer(tileUrl,{maxzoom:19,});
tileLayer.addTo(myMap);




var routingControl;




function calculateRoute() {
    // Get source and destination values
    var source = document.getElementById('source').value.split(',');
    var destination = document.getElementById('destination').value.split(',');

    if (routingControl) {
        myMap.removeControl(routingControl);
    }

    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(source[0], source[1]),
            L.latLng(destination[0], destination[1])
        ],
        routeWhileDragging: true,
        showAlternatives: true,
        lineOptions: {
            styles: [
                { color: 'black', opacity: 1, weight: 7 },
                { color: 'white', opacity: 0.8, weight: 6 },
                { color: 'blue', opacity: 0.7, weight: 4 }
            ]
        },
        altLineOptions: {
            styles: [
                { color: 'black', opacity: 0.7, weight: 7 },
                { color: 'white', opacity: 0.6, weight: 6 },
                { color: 'red', opacity: 0.5, weight: 4 }
            ],
            
            missingRouteStyles: [
                { color: 'gray', opacity: 0.5, weight: 5 }
            ]
        }
    }).addTo(myMap);
}




function generateList() {
    const ul = document.querySelector('.list');
    deptList.forEach((dept) => {
        const li = document.createElement('li');
        const div = document.createElement('li');
        const a = document.createElement('a');
        const p = document.createElement('p');
        a.addEventListener('click',()=>{
            flyToDept(dept);
        })

        div.classList.add('dept-item');
        a.innerText = dept.properties.name;
        a.href = '#';
        p.innerText = dept.properties.aboutdept;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
}

generateList();

function makePopupContent(building){

    return `
           <div>
               <h4>${building.properties.name}</h4>
               <p>${building.properties.aboutdept}</p>
               <div class="Get-directions">
                   <a href="${building.properties['get-directions']}">${building.properties['get-directions']}</a>
               </div>
           </div>
       `;

    
}


function onEachFeature(feature, layer){
    layer.bindPopup(makePopupContent(feature),{closeButton:false, offset: L.point(0,-10)});
}


//adding markers to the map

// var myIcon = L.icon({
//     iconUrl: 'marker.png',
//     iconSize: [50,50]
// })


// const deptsLayer = L.geoJSON(deptList,{
//     onEachFeature: onEachFeature,
//     pointToLayer: function(feature,latlng) {
//         return L.marker(latlng,{icon: myIcon});
//     }
// });
// deptsLayer.addTo(myMap);

function flyToDept(dept){
    const lat = dept.geometry.coordinates[1];
    const lng = dept.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 18, {
        duration: 3
    });
    setTimeout(() => {
        L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat, lng])
        .setContent(makePopupContent(dept))
        .openOn(myMap);
    }, 3000);
}

