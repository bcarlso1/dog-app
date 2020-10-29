// can't have same option twice - check and run again if so
// ADD POINTS IF CORRECT


// Display 4 random dog photos
 
const randomUrl = 'https://dog.ceo/api/breeds/image/random/1';
 const dogListUrl = 'https://dog.ceo/api/breeds/list';
 const photoDiv = document.getElementById('photo-div');
 const responseDiv = document.getElementById('responses');
 const submit = document.getElementById('submit');
 const next = document.getElementById('next');
 const input = document.getElementsByTagName('input');
 const assess = document.getElementById('assess');
 const score = document.getElementById('score');
 let scoreValue = 0;
score.innerHTML = scoreValue;
const hearts = document.getElementById('hearts')
/***********
 * Create Input
 **************/
function createInput(id) {
    let input = document.createElement('input');
    let label = document.createElement('label');
    let div = document.createElement('div');
    label.setAttribute('for', id);
    label.innerHTML = id;
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'guess');
    input.setAttribute('id', id);
    // add each item to HTML
    responseDiv.appendChild(div);
    div.appendChild(input);
    input.insertAdjacentElement('afterend', label);  
}
async function getRandomDog() {

/***********
 * GET RANDOM IMAGE
 **************/

    const randomDogResponse = await fetch(randomUrl);
    const randomDogJSON = await randomDogResponse.json();
    randomDogResult = randomDogJSON.message;
        let img = document.createElement('img');
        photoDiv.appendChild(img);
        img.setAttribute('src', randomDogResult)
        img.setAttribute('alt', randomDogResult);

/***********
 * POPULATE RESPONSE OPTIONS
 **************/

        const dogListResponse = await fetch(dogListUrl);
        const dogListJSON = await dogListResponse.json();
        const dogListFull = dogListJSON.message;
           for (var i = 0; i < 4; i++) {
            // get a random number from array length
            let random = Math.floor(Math.random() * 93) + 1;
            // build the input HTML and populate with dog breed at that random index
           createInput(dogListFull[random]);
     
           }
          const randomDogName = randomDogResult.toString().slice(30, 34);
   
          for (var i = 0; i < dogListFull.length; i++) {
              if (dogListFull[i].startsWith(randomDogName)) {
                    createInput(dogListFull[i]);
          }
            }
            // add responses in random order
        for (var i = 0; i < responseDiv.children.length; i++) {
            responseDiv.appendChild(responseDiv.children[(Math.floor(Math.random() * i))]);
        }
}

getRandomDog();


/************
 * EVENT LISTENER FOR SUBMITTING SELECTION
 ***********/

submit.addEventListener('click', (e) => {
    let correctAnswer;

    for (var i = 0; i < 5; i++) {
        // what is the correct answer
        let correctSlice = photoDiv.children[0].getAttribute('src').slice(30, 34);
        if(input[i].id.startsWith(correctSlice)) {
            correctAnswer = input[i].id;
            console.log(correctAnswer)
          
        }
    }
    for (var i = 0; i < 5; i++) {
        if (input[i].checked) {
           let guessed = input[i].id;
           console.log(guessed);

             // is correct answer selected
            if(guessed === correctAnswer) {
                assess.innerHTML = "<p>Correct</p>";
                let points = points + 1;

            } else {
                assess.innerHTML = `<p>Incorrect, it's a ${correctAnswer}</p>`;
            }
            
        }
    }
    next.style.display = "inline-block";
    submit.style.display = "none";
});

next.addEventListener('click', (e) => {
    location.reload();
    next.style.display = "none";
    submit.style.display = "inline-block";
})



// // to do make responsive size
// // add alt tags
