let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');
let check = true;
let card = document.querySelector('.teacher-card');

let teachers = [
    {name:'Matteo', description:'Docente Full-stack che insegna tutto il corso Hackademy', url:'./Media/matteo.png'},
    {name:'Angelo', description:'Docente Frontend che insegna HTMl, CSS, BOOTSTRAP e JS', url:'./Media/angelo.png'},
    {name:'Paola', description:'Docente Frontend che insegna Web Design', url:'./Media/paola.png'},
    {name:'Roberto', description:'Docente Backedn che insegna PHP e Lavarel', url:'./Media/roberto.png'},
];

teachers.forEach((teacher)=>{
    let div = document.createElement('div');
    div.classList.add('.moved');
    div.style.backgroundImage = `url(${teacher.url})`;
    circle.appendChild(div);
});

let movedDivs = document.querySelectorAll('.moved');

opener.addEventListener('click',()=>{

    if(check){
    opener.style.transform = 'rotate(45deg)'
     check = false;  
     movedDivs.forEach((moved,i)=>{
        let angle = (360*i)/movedDivs.length;
        moved.style.transform = `rotate(${angle}deg) translate(200px) rotate(-${angle}deg)`;
     });
    } else {
        opener.style.transform = 'rotate(0deg)'
     check = true;   
     movedDivs.forEach((moved,i)=>{
        let angle = (360*i)/movedDivs.length;
        moved.style.transform = `rotate(0deg) translate(0px) rotate(0deg)`;
     });
    }
});

movedDivs.forEach((div)=>{
    div.addEventListener('click',()=>{
        
    })
})