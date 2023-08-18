// JSON: JavaScript Object Notification

// 1. Connettermi al json - fetch - Promise
// 2. Convertire la Promise in oggetto JS - .then
// 3. Utilizzare l'oggetto

// fetch: chiamata asincrona che si occupa di collegare il mio foglio di lavoro con l'esterno e mi porta dei dati. Promise
// .then(): attraverso la sempre immancabile incommensurabile CALLBACK mi permette una conversione ed un utilizzo di un dato (Promise)

// API: indirizzi

fetch('./annunci.json').then( (response)=> response.json()).then( (data)=> {



    //  Wrapper
    let categoriesWrapper = document.querySelector('#categoriesWrapper');
    let cardsWrapper = document.querySelector('#cardsWrapper');



    function setCategoryFilter(){
        let categories = data.map( (announcement)=> announcement.category);
        // let uniqueCategories = [];

        // categories.forEach( (category)=>{
        //     if(  !uniqueCategories.includes(category)  ){
        //         uniqueCategories.push(category);
        //     }
        // } );

        // Set: classe che crea un oggetto (array-like) che puo' contenere solo elementi che non si ripetono
        // Array.from(): trasforma un array-like in un array
        let uniqueCategories = Array.from(new Set(categories));

        uniqueCategories.forEach( (category)=> {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="category" id="${category}">
            <label class="form-check-label" for="${category}">
              ${category}
            </label>
            `;

            categoriesWrapper.appendChild(div);

        });

    }

    setCategoryFilter();

    function truncateString(string){
        // Le stringhe hanno la proprieta' length

        if(string.length > 15){
            // Partendo da una stringa mi restituisce un array i cui elementi sono separati da cio' che metto nelle tonde
            return string.split(' ')[0] + '...';
        }else{
            return string;
        }

    }

    function showCards(array){

        array.sort( (a,b)=> b.price - a.price );
        
        cardsWrapper.innerHTML = '';

        array.forEach( (annuncio, i)=>{
            let div = document.createElement('div');
            div.classList.add('announcement-card');
            div.innerHTML = `
                <p class="h2 titolo">${truncateString(annuncio.name)}</p>
                <p class="h3">${annuncio.category}</p>
                <p class="lead">${annuncio.price}€</p>
            `;
            div.style.backgroundImage = ` linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)) , url(https://picsum.photos/${300 + i})`
            cardsWrapper.appendChild(div);
        } );



    }

    showCards(data);

    // Input
    let radios = document.querySelectorAll('.form-check-input');

    let priceInput = document.querySelector('#priceInput');

    let wordInput = document.querySelector('#wordInput');

    // Paragraph
    let priceParagraph = document.querySelector('#priceParagraph');

    function filterByCategory(array){

        // In questa funzione devo trovare la categoria che ci serve
        let checked = Array.from(radios).find( (button)=> button.checked );
        let categoria = checked.id;

    if(categoria != 'All'){
        let filtered = array.filter( (annuncio)=> annuncio.category == categoria  );
        
        return filtered;
    }else{
        return array;
    }



    }

    radios.forEach((button)=>{
        button.addEventListener('click', ()=>{
            globalFilter();
        })
    });

    function setPriceInput(){
        let maxPrice = Math.ceil(data[0].price);
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceParagraph.innerHTML = maxPrice;
    }

    setPriceInput();

    function filterByPrice(array){
        let filtered = array.filter( (annuncio)=> +annuncio.price <= +priceInput.value);
        return filtered;
    }



    priceInput.addEventListener('input', ()=>{
        priceParagraph.innerHTML = priceInput.value;
        globalFilter();
    })

    function filterByWord(array){
        let filtered = array.filter( (annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase())  );
        return filtered;
    }


    wordInput.addEventListener('input', ()=>{
        globalFilter();
    })


    // Funzione che ha lo scopo di lanciare le precedenti in catena ognuna sull'array filtrato risultante dalla precedente
    // 1. Categoria -> data
    // 2. Prezzo -> array filtrato per categoria
    // 3. Parola -> array filtrato per prezzo
    // 4. showCards -> array filtrato per parola

    function globalFilter(){
        let filteredByCategory = filterByCategory(data); //array ritornato dalla funzione filterByCategory
        let filteredByPrice = filterByPrice(filteredByCategory); // array ritornato dalla funzione filterByPrice
        let filteredByWord = filterByWord(filteredByPrice); // array ritornato dalla funzione filterByWord


        // let filteredByWord = filterByWord( filterByPrice( filterByCategory(data) ) );


        showCards(filteredByWord);

        showTitles(filteredByWord);
    }

    showTitles(data);
    

    
    function showTitles(array){
       
        let titoli = document.querySelectorAll('.titolo');


        titoli.forEach( (titolo, i)=> {
            titolo.addEventListener('mouseenter', ()=>{
                titolo.innerHTML = array[i].name;
            })

            titolo.addEventListener('mouseleave', ()=>{
                titolo.innerHTML = truncateString(array[i].name);
            })
        });
    }




});


// console.log(5 + '5');
// + : operator overloading
