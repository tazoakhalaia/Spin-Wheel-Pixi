const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, transparent: true });
document.getElementById('pixi-container').appendChild(app.view);
window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});
