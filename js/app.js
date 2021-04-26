'use strict';

let pictureArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
console.log(pictureArray);
const picture = document.getElementById('picture');
const pictureLeft = document.getElementById('pictureLeft');
const pictureRight = document.getElementById('pictureRight');
const pictureCenter = document.getElementById('pictureCenter');
const buttResulte = document.getElementById('buttResulte');

let clickNum = 0;
let pictureLeftIndex = 0;
let rightPictureIndex = 0;
let centerPictureIndex = 0;
let centerOdd = 0;
let rightOdd = 0;
let leftOdd = 0;

function Images( name ) {
  this.name = name;
  this.img = `./img/${name}.jpg`;
  this.shown = 0;
  this.click = 0;
  Images.all.push(this);
}

Images.all = [];


for ( let i = 0; i < pictureArray.length; i++ ) {
  new Images(pictureArray[i]);
}


function eventHandler( task ) {
  if ( ( task.target.id === 'pictureLeft' || task.target.id === 'pictureRight' || task.target.id === 'pictureCenter' ) && clickNum < 25 ) {

    if( task.target.id === 'pictureLeft' ) {
      Images.all[pictureLeftIndex].click++;
    }

    if( task.target.id === 'pictureRight' ) {
      Images.all[rightPictureIndex].click++;
    }
    if( task.target.id === 'pictureCenter' ) {
      Images.all[centerPictureIndex].click++;
    }

    clickNum++;
    renderImages();

  } else {

    console.log( Images.all );
  }
}




function renderImages() {
  let leftIndex = randomNumber( 0, pictureArray.length - 1 );
  let rightIndex;
  let centerIndex;

  do {
    rightIndex = randomNumber( 0, pictureArray.length - 1 );
    centerIndex = randomNumber(0, pictureArray.length + 1);
  } while ( leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex);

  // centerOdd = centerIndex;
  // leftOdd = leftIndex;
  // rightOdd = rightIndex;

  pictureLeft.src = Images.all[leftIndex].img;
  pictureRight.src = Images.all[rightIndex].img;
  pictureCenter.src = Images.all[centerIndex].img;



  pictureLeftIndex = leftIndex;
  rightPictureIndex = rightIndex;
  centerPictureIndex = centerIndex;

  Images.all[leftIndex].shown++;
  Images.all[rightIndex].shown++;
  Images.all[centerIndex].shown++;
}




let view = document.getElementById('picture');
let ulElement = document.createElement('ul');
view.appendChild(ulElement);


function viewResult(event) {
  event.preventDefault();
  for (let i = 0; i < Images.all.length; i++){
    let liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = `${Images.all[i].name}  ${Images.all[i].click} votes ${Images.all[i].shown} times`;

  }
  buttResulte.removeEventListener('click', viewResult);
  renderChart();
}

buttResulte.addEventListener('click', viewResult);
function randomNumber( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) + min ); //The maximum is inclusive and the minimum is inclusive
}


function renderChart (){

  let clicks =[];
  let names = [];
  let showns = [];
  for(let i = 0; i <Images.all.length; i++){
    clicks.push(Images.all[i].click);
    names.push(Images.all[i].name);
    showns.push(Images.all[i].shown);
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: clicks,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [

          'rgba(255, 99, 132, 1)',

        ],
        borderWidth: 1
      }, {
        label: '# of view',
        data: showns,
        backgroundColor: [
          'rgba(255, 206, 120, 0.2)',
        ],
        borderColor: [

          'rgba(255, 206, 120, 1)',

        ],
        borderWidth: 1
      },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}






picture.addEventListener( 'click', eventHandler );
renderImages();
viewResult();

// view.innerHTML = ' ';
