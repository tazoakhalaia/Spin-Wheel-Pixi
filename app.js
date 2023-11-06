const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, transparent: true });
document.getElementById('pixi-container').appendChild(app.view);
window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

let elementsAndColors = [
    { number: 1, color: 0xFF0000 }, 
    { number: 2, color: 0x00FF00 }, 
    { number: 3, color: 0x0000FF }, 
    { number: 4, color: 0xFFFF00 }, 
    { img: 'img/icon1.png', color: 0000000 }, 
    { number: 5, color: 0xFF00FF }, 
    { number: 6, color: 0x00FFFF }, 
    { number: 7, color: 0xFFA500 }, 
    { number: 8, color: 0x800080 },  
    { number: 9, color: 0x00FFFF }, 
    { number: 10, color: 0xFFA500 }, 
    { img: 'img/icon2.png', color: 0000000 }, 
    { number: 11, color: 0xFFA500 },
    
];


let buttonDiv = document.getElementById('btn-cont');
let chooseNumber = null;
let circleContainerRadius = 200

elementsAndColors.forEach((item, index) => {
    if (item.img) {
        const button = document.createElement('button');
        const img = document.createElement('img');
        img.src = item.img;
        img.width = 20;
        img.height = 20;
        button.appendChild(img.cloneNode(true)); 
        button.addEventListener('click', () => {
            chooseNumber = index;
            let choosePrize = document.getElementById('choose_prize');
            const textElement = document.createElement('span');
            textElement.textContent = 'Pressed Numbers: ';
            choosePrize.innerHTML = ''; 
            choosePrize.appendChild(textElement);
            choosePrize.appendChild(img.cloneNode(true));
        });
        buttonDiv.appendChild(button);
    } else {
        const button = document.createElement('button');
        button.textContent = `${item.number}`;
        button.addEventListener('click', () => {
            chooseNumber = index;
            const contentDiv = document.getElementById('choose_prize');
            contentDiv.innerHTML = 'Pressed Numbers: ' + item.number;
        });
        buttonDiv.appendChild(button);
    }
});

const circle = new PIXI.Graphics();
circle.beginFill(0xFF0000);
circle.drawCircle(0, 0, circleContainerRadius);
circle.endFill();
const circleContainer = new PIXI.Container();
circleContainer.addChild(circle);
circleContainer.x = app.screen.width / 2;
circleContainer.y = app.screen.height / 2;
app.stage.addChild(circleContainer);
