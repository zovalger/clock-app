import StopwatchUI from "./modules/Stopwatch.UI.js";

const c = new StopwatchUI();


document.querySelector('.nav-toggle-theme')
            .addEventListener("click", () => {
                document.body.classList.toggle("dark-theme") 
            })