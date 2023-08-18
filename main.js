// Navbar

let navbar = document.querySelector('#navbar');
let links = document.querySelector('.navlink'); //Nodelist
let logo = document.querySelector('#logo');


window.addEventListener('scroll', ()=>{
    
    let scrolled = window.scrollY;

    if (window.scrollY > 800){
        navbar.classList.add('bg-black');
        navbar.style.width = '80%';
    } else {
        navbar.classList.remove('bg-black');
        navbar.style.width = '100%';
    }
    
    
    });



// Chiamata asincrona: aspetta che la pagina sia stata caricata, che parti l'eventuale JS e poi parte
// Funzioni che restano in attesa che tutto il codice sincrono sia stato eseguito, e poi scattano

// setInterval(): chiamata asincrona che fa partire un loop infinito, ma non blocca il browser
// clearInterval(): blocca un intervallo, ma ha bisogno di un paramentero che rappresenti l'intervallo stesso
// setTimeout(): fa partire una sola volta un blocco di istruzioni, dopo tot tempo

let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');
let thirdNumber = document.querySelector('#thirdNumber');

function createInterval(number, element, timing){

    let counter = 0;

let interval = setInterval(()=>{

    if(counter < number){
        counter++;
        element.innerHTML = counter;   
    } else {
        clearInterval(interval);
    }

}, timing);
}

// Intersection observer(): classe che ci viene fornita dal browser che si occupa di far scattare una callback nel momento in cui viene intersecato un elemento (non appena lo rendo visibile). Così i numeri messi sopra, non scattano finchè non scrollo alla loro sezione. 

let confirm = false;
let observer = new IntersectionObserver((entries)=>{
   
    entries.forEach((entry)=>{
        if(entry.isIntersecting && confirm == false){
            createInterval(1000, firstNumber, 100);
            createInterval(1500, secondNumber, 100);
            createInterval(50, thirdNumber, 1000);
            confirm = false;
            setTimeout(()=>{
                confirm = true;
            },5000)
        }
    });
});

observer.observe(firstNumber);

// Carosello

let reviews = [
    {name: 'Matteo', description: `Il sito più bello dell'Universo conosciuto`, rank: 5},
    {name: 'Deborah', description: `Sito non so. Boh!`, rank: 3},
    {name: 'Luca', description: `Stratosferico!`, rank: 5},
    {name: 'Rosalia', description: `Spacca!`, rank: 5},
    {name: 'Saddam', description: `Petaloso`, rank: 4},
];

let swiperWrapper = document.querySelector('.swiper-wrapper');

function generateReviews(){
    swiperWrapper.innerHTML = '';

    reviews.forEach( (review)=> {
        let div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
        <div class="review-card">
            <p class="h3">${review.name}</p>
            <p class="lead text-center">"${review.description}"</p>
            <div class="star">
    
            </div>
        </div>
        
        `;
    
        swiperWrapper.appendChild(div);
    
    });
    
    
    let stars = document.querySelectorAll('.star'); //NodeList: array-like
    
    stars.forEach( (div, j)=>{
    
      
            for(let i = 1; i <= reviews[j].rank; i++){
                let icon = document.createElement('i');
                icon.classList.add('fa-solid', 'fa-star');
                div.appendChild(icon);
            }
            
            if(reviews[j].rank < 5){
                let difference = 5 - reviews[j].rank;
                for(let i = 1; i <= difference; i++){
                    let icon = document.createElement('i');
                    icon.classList.add('fa-regular', 'fa-star');
                    div.appendChild(icon);
                }
            }
     
    } );
}


generateReviews();


const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });


  let userName = document.querySelector('#userName');
  let userDescription = document.querySelector('#userDescription');
  let userRanks = document.querySelectorAll('.pointer');
  let finalRank;
  userRanks.forEach( (stella, i)=> {
    stella.addEventListener('mouseenter', ()=>{
        stella.classList.add('fa-solid');
        stella.classList.remove('fa-regular');
    })

    stella.addEventListener('click', ()=>{
        finalRank = i + 1;
    })

  });



  let addReviewBtn = document.querySelector('#addReviewBtn');


  addReviewBtn.addEventListener('click', ()=>{
      reviews.push({name: userName.value, description: userDescription.value, rank: finalRank});
      generateReviews();
      
      swiper.update();

      userName.value = '';
      userDescription.value = '';
      userRank.value = '';
  });