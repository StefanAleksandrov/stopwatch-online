const startButton = document.getElementById("start");
const lapButton = document.getElementById("lap");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const laps = document.getElementById("laps");
const bestLap = document.getElementById("bestLap");
const averageLap = document.getElementById("averageLap");
const worstLap = document.getElementById("worstLap");
let stopPress = false;

startButton.addEventListener("click", start);

function start() {
    let newSeconds = 0;
    let newMinutes = 0;
    let newHours = 0;
    let number = 0;
    startButton.classList.add("hide");
    lapButton.classList.remove("hide");

    setInterval(() => {
        if (!stopPress) {
            number++
            newSeconds = number % 60;
            newMinutes = Math.floor(number / 60);
            newHours = Math.floor(number / 3600);
            seconds.innerText = pad(newSeconds, 2);
            minutes.innerText = pad(newMinutes, 2);
            hours.innerText = pad(newHours, 2);
        }
    }, 1000);
}

function pad(number, count) {
    let numbString = "" + number;
    let string = "0";
    if (numbString.length < count) {
        return `${string.repeat(count - 1)}${number}`;
    } else if (number < 100) {
        return number;
    }
}

lapButton.addEventListener("click", lap);

let lapsArr = [];

function lap() {
    let newSeconds = parseInt(seconds.innerText);
    let newMinutes = parseInt(minutes.innerText);
    let newHours = parseInt(hours.innerText);
    let totalSeconds = (newHours * 3600) + (newMinutes * 60) + newSeconds;

    if (lapsArr.length > 0) {
        totalSeconds -= sum(lapsArr);
    }

    lapsArr.push(totalSeconds);
    let newDiv = document.createElement("div");
    newDiv.classList.add("statsText");
    newDiv.innerText = `${lapsArr.length} LAP- ${pad(Math.floor(totalSeconds / 3600), 2)}:${pad(Math.floor((totalSeconds / 60) % 60), 2)}:${pad((totalSeconds % 60), 2)}`;
    laps.appendChild(newDiv);
}

function sum(array) {
    let sumArr = 0;
    for (let i = 0; i < array.length; i++) {
        sumArr += array[i];
    }
    return sumArr;
}

stopButton.addEventListener("click", stop);

function stop() {
    stopPress = true;
    lap();
    lapButton.removeEventListener("click", lap);
    stopButton.classList.add("hide");
    resetButton.classList.remove("hide");
    lapButton.classList.add("not-allowed");
    lapsArr = lapsArr.sort((a, b) => a - b);
    bestLap.innerText = `BEST LAP- ${pad(Math.floor(lapsArr[0] / 3600), 2)}:${pad(((Math.floor(lapsArr[0] / 60)) % 60), 2)}:${pad((lapsArr[0] % 60), 2)}`;
    averageLap.innerText = `AVERAGE LAP- ${pad(Math.floor(Math.floor(sum(lapsArr) / lapsArr.length) / 3600), 2)}:${pad((Math.floor(Math.floor(sum(lapsArr) / lapsArr.length) / 60) % 60), 2)}:${pad((Math.floor(sum(lapsArr) / lapsArr.length) % 60), 2)}`;
    worstLap.innerText = `WORST LAP- ${pad(Math.floor(lapsArr[lapsArr.length - 1] / 3600), 2)}:${pad((Math.floor(lapsArr[lapsArr.length - 1] / 60) % 60), 2)}:${pad((lapsArr[lapsArr.length - 1] % 60), 2)}`;
    const laps = document.getElementsByClassName("statsText");
    const lapsDivs = Array.from(laps);
    lapsDivs.forEach(element => element.classList.toggle("hide"));
}

resetButton.addEventListener("click", reset);

function reset() {
    window.location.reload();
}