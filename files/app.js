// Backgrounds
function changeBackground(){
    const backgrounds = [
        "background1.jpg",
        "background2.webp",
        "background3.jpg",
        "background4.webp",
        "background5.jpg",
        "background6.jpg",
    ]

    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url(/Chill-Pomodoro/images/backgrounds/${randomBackground})`;
}
changeBackground();

// constantes de los botones
const pomodor = document.getElementById("Pomodoro");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const timer = document.getElementById("timer");
const shortBreak = document.getElementById("short-break-button");
const longBreak = document.getElementById("long-break-button");

let isRunning = false;
let currentMode = `pomodoro`;
let defaultTimes = {
    "pomodoro":1800,
    "shortBreak":300,
    "longBreak":600
};

// Iniciar el contador
let timeLeft = 1800; // 30 minutos en segundos, 5 minutos en segundos: 300, 10 minutos en segundos: 600

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

let interval;
startButton.addEventListener("click", () => {
    // manejo de el evento click de start
    if(isRunning) return;//si el timer ya esta corriendo, no se ejecuta el evento
    // se ejecuta el evento
    isRunning = true;
    interval = setInterval(() => {
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }            
        timeLeft--;
        updateTimer(); 
    }, 1000);   
}); 
//Tiempo 30 min por defecto
pomodor.addEventListener("click", () =>{
    clearInterval(interval);
    currentMode = "pomodoro"
    timeLeft = defaultTimes[currentMode];
    updateTimer();
});
//  Descanso de 5 minutos
shortBreak.addEventListener("click", () => {
    clearInterval(interval)
    timeLeft = 300; // 5 minutos en segundos
    updateTimer();
});
// Descanso de 10 minutos
longBreak.addEventListener("click", () => {
    clearInterval(interval)
    timeLeft = 600; // 10 minutos en segundos
    updateTimer();
});
// Boton de pausa
pauseButton.addEventListener("click", () => {
    clearInterval(interval);
    isRunning = false;
});

//Boton de reiniciar el timer
resetButton.addEventListener("click", () =>{
    clearInterval(interval);
    timeLeft = defaultTimes[currentMode];
    updateTimer();
    isRunning = false;
});


