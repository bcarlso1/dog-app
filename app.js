
// Display 4 random dog photos

const randomUrl = 'https://dog.ceo/api/breeds/image/random/4';
const dogListUrl = 'https://dog.ceo/api/breeds/list';
const photoList = document.getElementById('photo');
const dogSelect = document.getElementById('dog-list')
const ulSection = document.getElementsByTagName('ul');


async function getRandomDogs() {
    const randomDogResponse = await fetch(randomUrl);
    const randomDogJSON = await randomDogResponse.json();
    const randomDogResults = randomDogJSON.message.map((dog) => {
        // console.log(dog);
        let img = document.createElement('img');
        let li = document.createElement('li');
        li.appendChild(img);
        photoList.appendChild(li)
        img.setAttribute('src', dog)
        img.setAttribute('alt', 'tbd')
    })
}

// get select menu of every breed

async function getDogsList() {
    const dogListResponse = await fetch(dogListUrl);
    const dogListJSON = await dogListResponse.json();
    // console.log(dogListJSON.message);
    const dogListResult = dogListJSON.message.map(breed => {
        let option = document.createElement('option');
        dogSelect.appendChild(option)
        option.setAttribute('value', breed);
        breedCaps = breed.toUpperCase();
        option.innerHTML = `${breedCaps}`;
    })
 }

getDogsList();


// get image of current selected breed

async function getBreedPic() {
        // erase current images
        photoList.innerHTML = "";
        // get random dogs first
        const randomDogs = await getRandomDogs();
        let breed = dogSelect.value;
        let selectedUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
        const selectedDogResponse = await fetch(selectedUrl);
                const selectedDogJSON = await selectedDogResponse.json();
                const selectedResult = selectedDogJSON.message;
                    let img = document.createElement('img');
                    let li = document.createElement('li')
                    li.appendChild(img);
                    img.setAttribute('src', selectedResult);
                   
                    // add selected img in random order
                    // get random number 1 to 4
                    let random = Math.floor(Math.random() * 4) + 1;
                    console.log(random);
                    // add in random order
                    let randomImages = photoList.children;
                    // console.log(randomImages.length);
                    let randomImage = randomImages[random];
                           // address instances of random image matching the selected image (avoid 2 correct choices)
                           for (var i = 0; i < randomImages.length; i++) {
                            let checkSlice = randomImages[i].children[0].getAttribute('src').slice(30, 34);
                            console.log(checkSlice);
                            let compare = document.getElementById('dog-list');
                            let compareValue = compare.value;
                            if(compareValue.startsWith(checkSlice)) {
                                 alert("error");
                            } 
   
                        }
                    randomImage.insertAdjacentElement("afterend", li);
}
// ERROR after a few selections
// ERROR alert if 2 match
// check if selection matches select.value

function checkMatch() {
    if (event.target.tagName === "IMG") {
       let url = event.target.getAttribute('src');
       let clickedImgName = url.slice(30, 34);
       if (dogSelect.value.startsWith(clickedImgName)) {
           alert('Correct! Try a new selection!');
       } else {
           alert('Incorrect, please guess again!');
       }
    }
}


dogSelect.addEventListener('change', getBreedPic);

photoList.addEventListener('click', checkMatch);


// to do make responsive size
// add alt tags
// if random selection includes the actual selection, get a new one 