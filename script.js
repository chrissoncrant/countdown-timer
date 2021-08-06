const TIME_LIMIT = (prompt("How long would you like the timer to be (in seconds please)?")) * 1;

let timePassed = 0;
let timeLeft = TIME_LIMIT - timePassed;

const FULL_DASH_ARRAY = 283;

const WARNING_THRESHOLD = (TIME_LIMIT - (TIME_LIMIT / 3)).toFixed(0);

console.log(WARNING_THRESHOLD);

const ALERT_THRESHOLD = (TIME_LIMIT - (3 * (TIME_LIMIT / 4))).toFixed(0);



const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

let remainingPathColor = COLOR_CODES.info.color;


document.getElementById("app").innerHTML = `
<div class="base-timer">
    <svg class="base-timer_svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer_circle">
            <circle class="base-timer_path-elapsed" cx="50" cy="50" r="45" />
            <path id="base-timer-path-remaining" stroke-dasharray="283 283" class="base-timer_path-remaining ${remainingPathColor}" d="M 50 50 m -45 0 a 45 45 0 0 0 90 0 a 45 45 0 0 0 -90 0" />
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer_label">
        ${formatTime(timeLeft)}
    </span>
</div>
`;

startTimer();

function formatTime(time) {
    //time argument will be in seconds
    const minutes = Math.floor(time / 60);
    
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function startTimer() {
    
    setInterval(() => {
        if (timeLeft === 0) {
            return timeLeft === 0;
        }
        timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;

        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);

        setCircleDashArray();

        setRemainingPathColor(timeLeft);

    }, 1000)
}

function calculateTimeFraction() {

    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
 
   /*
   return timeLeft / TIME_LIMIT;
   */
}

function setCircleDashArray() {
    const circleDashArray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    console.log(circleDashArray);
    document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDashArray);

}

function setRemainingPathColor(timeLeft) {
    const {alert, warning, info} = COLOR_CODES;

    if (timeLeft <= alert.threshold) {
        document.getElementById("base-timer-path-remaining").classList.remove(warning.color);
        document.getElementById("base-timer-path-remaining").classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document.getElementById("base-timer-path-remaining").classList.remove(info.color);
        document.getElementById("base-timer-path-remaining").classList.add(warning.color);
    }
}