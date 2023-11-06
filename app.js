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
    { img: 'img/icon1.png', color: 0xFF0000 }, 
    { number: 5, color: 0xFF00FF }, 
    { number: 6, color: 0x00FFFF }, 
    { number: 7, color: 0xFFA500 }, 
    { number: 8, color: 0x800080 }, 
    { number: 9, color: 0x00FFFF }, 
    { number: 10, color: 0xFFA500 }, 
    { img: 'img/icon2.png', color: 0x808080 }, 
];


let buttonDiv = document.getElementById('btn-cont');
let chooseNumber = null;
let circleContainerRadius = 200
let spinning = false

elementsAndColors.forEach((item, index) => {
    if (item.img) {
        const button = document.createElement('button');
        button.style.background = `#${item.color.toString(16).padStart(6, '0')}`
        const img = document.createElement('img');
        img.src = item.img;
        img.width = 20;
        img.height = 20;
        button.appendChild(img.cloneNode(true)); 
        button.addEventListener('click', () => {
            chooseNumber = index;
            let choosePrize = document.getElementById('choose_prize');
            const textElement = document.createElement('span');
            textElement.classList.add('white')
            textElement.textContent = 'Pressed Element: ';
            choosePrize.innerHTML = ''; 
            choosePrize.appendChild(textElement);
            choosePrize.appendChild(img.cloneNode(true));
        });
        buttonDiv.appendChild(button);
    } else {
        const button = document.createElement('button');
        button.textContent = `${item.number}`;
        button.style.background = `#${item.color.toString(16).padStart(6, '0')}`
        button.addEventListener('click', () => {
            chooseNumber = index;
            const choosePrize = document.getElementById('choose_prize');
            choosePrize.classList.add('white')
            choosePrize.innerHTML = 'Pressed Element: ' + item.number;
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

const segmentCount = elementsAndColors.length;
const segmentSize = (Math.PI * 2) / segmentCount;
const rotationOffset = Math.PI / 9; 

for (let i = 0; i < segmentCount; i++) {
    const label = new PIXI.Text(elementsAndColors[i].number?.toString() || '', { fill: 0x000000, fontSize: 18 });
    
    if (elementsAndColors[i].img) {
        const segment = new PIXI.Graphics(); 
        const color = elementsAndColors[i].color;
        segment.beginFill(color);
        const startAngle = i * segmentSize + rotationOffset;
        segment.moveTo(0, 0);
        segment.lineTo(0, 0);
        segment.arc(0, 0, 200, startAngle, (i + 1) * segmentSize + rotationOffset);
        segment.lineTo(0, 0);
        segment.endFill();
        const image = PIXI.Sprite.from(elementsAndColors[i].img);
        image.anchor.set(0.5);
        image.width = 15;
        image.height = 15;
        image.position.set(
            125 * Math.cos((i + 0.5) * segmentSize + rotationOffset),
            125 * Math.sin((i + 0.5) * segmentSize + rotationOffset)
        );
        circleContainer.addChild(segment); 
        circleContainer.addChild(image);
    } else {
        const color = elementsAndColors[i].color;
        const segment = new PIXI.Graphics(); 
        segment.beginFill(color);
        const startAngle = i * segmentSize + rotationOffset;
        segment.moveTo(0, 0);
        segment.lineTo(0, 0);
        segment.arc(0, 0, 200, startAngle, (i + 1) * segmentSize + rotationOffset);
        segment.lineTo(0, 0);
        segment.endFill();
        label.anchor.set(0.5, 0.5);
        label.position.set(
            125 * Math.cos((i + 0.5) * segmentSize + rotationOffset),
            125 * Math.sin((i + 0.5) * segmentSize + rotationOffset)
        );
        
        circleContainer.addChild(segment);
        circleContainer.addChild(label);
    }
}


const smallCircle = new PIXI.Graphics();
smallCircle.beginFill(0x000000); 
smallCircle.drawCircle(0, 0, 30); 
smallCircle.endFill();
smallCircle.x = 0;
smallCircle.y = 0;

smallCircle.interactive = true;
smallCircle.buttonMode = true;

circleContainer.addChild(smallCircle);


const triangle = new PIXI.Graphics();
const scale = 0.5; 
triangle.beginFill(0000000); 
triangle.lineStyle(2, 0x000000); 
triangle.moveTo(0, -25 * scale); 
triangle.lineTo(15 * scale, 25 * scale); 
triangle.lineTo(-15 * scale, 25 * scale); 
triangle.lineTo(0, -25 * scale); 
triangle.x = circleContainer.x;
triangle.y = circleContainer.y - circleContainerRadius + 160;

app.stage.addChild(triangle); 



smallCircle.addEventListener('pointerdown', () => {
    if (chooseNumber !== null && !spinning) {
        spinning = true;
        const initialRotation = circleContainer.rotation;
        const degreesToRotate = 1440;
        const targetRotation = initialRotation - (degreesToRotate * (Math.PI / 180));
        const leftRotationDuration = 2000;
        const startTime = performance.now();

    function rotateLeft(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < leftRotationDuration) {
            const progress = elapsedTime / leftRotationDuration;
            const currentRotation = initialRotation - (progress * degreesToRotate * (Math.PI / 180));
            circleContainer.rotation = currentRotation;
            requestAnimationFrame(rotateLeft);
        } else {
            circleContainer.rotation = targetRotation;
            const stopIndex = chooseNumber; 
            const degrees = 1440; 
            const stopAngle = 1440 - ((stopIndex - (elementsAndColors.length / 2)) / segmentCount) * (Math.PI * 2) + (degrees * (Math.PI / 180));
            const triangleOffset = (Math.PI * 2) / segmentCount / 2.5; 
            const finalStopAngle = stopAngle - triangleOffset;

            const rotationDuration = 1000; 

            const startRotation = circleContainer.rotation;
            const startTime = performance.now();

            function rotateToFinal(currentTime) {
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < rotationDuration) {
                    const progress = elapsedTime / rotationDuration;
                    const currentRotation = startRotation + (progress * (finalStopAngle - startRotation));
                    circleContainer.rotation = currentRotation;
                    requestAnimationFrame(rotateToFinal);
                } else {
                    circleContainer.rotation = finalStopAngle;
                    spinning = false;
                }
            }

            requestAnimationFrame(rotateToFinal);
        }
    }

    requestAnimationFrame(rotateLeft);
    }
});