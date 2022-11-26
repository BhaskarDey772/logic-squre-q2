const cafeUrl = "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json"
const placeUrl = "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json"

let cafes = [];
let places = [];

let jointArray = []
let filteredCafes= [];
const searchInput = document.getElementById("search-input");

function returnInnerHTML(item, index){
    return `<td class="column1">${index+1}</td><td class="column2">${item.name}</td><td class="column3">${item.postal_code
    }</td><td class="column4">${item.lat}</td><td class="column5">${item.long}</td>`
}

window.onload = async() => {
    await fetchCafes();
    await fetchPlaces();



    cafes.forEach(cafe => {
        places.forEach(place => {
            if (cafe?.location_id === place?.id) {
                jointArray.push({ ...cafe, ...place })
            }
        })
    })

    

  
    filteredCafes = jointArray;

    searchInput.addEventListener("keyup", (e) => {
        const searchString = e.target.value;

        filteredCafes = jointArray?.filter((cafe) => {
            if(searchString===" "){
                return cafe;
            }
            else if(cafe?.name?.includes(searchString)){
                return cafe;
            }
        });

        const tbody =  document.querySelector("tbody");
        tbody.innerHTML =" ";
        filteredCafes.forEach((item,index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = returnInnerHTML(item,index);
            tbody.appendChild(tr);
        })

 
        

        
    });

    jointArray?.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = returnInnerHTML(item,index);
            document.querySelector("tbody").appendChild(tr);
        })


}

// fetch cafes
const fetchCafes = async() => {
    await fetch(cafeUrl)
        .then(response => response.json())
        .then(data => {
            data?.cafes?.forEach(cafe => {
                cafes.push(cafe);
            });
        })
}

// fetch places
const fetchPlaces = async() => {
    await fetch(placeUrl)
        .then(response => response.json())
        .then(data => {
            data?.places?.forEach(place => {
                places.push(place);
            });
        })
}



