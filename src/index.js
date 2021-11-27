console.log("pacing.app");

let time = document.querySelector(".time");
let timeChildren = Array.from(time.children);
// let [timeHours, timeMinutes, timeSeconds] = timeChildren;

let distance = document.querySelector(".distance");
let [distanceInput, distanceUnit] = distance.children;
console.log(distanceUnit);

let pace = document.querySelector(".pace");
let paceChildren = Array.from(pace.children);
// let [paceHours, paceMinutes, paceSeconds] = paceChildren;

function divmod(numerator, denominator) {
    return [Math.floor(numerator / denominator), numerator % denominator];
}

function convertToSeconds(hours, minutes, seconds) {
    let totalSeconds = hours * 3600 + minutes * 60 + +seconds;
    return totalSeconds;
}

function convertFromSeconds(totalSeconds) {
    let [hours, hoursRemainder] = divmod(totalSeconds, 3600);
    let [minutes, seconds] = divmod(hoursRemainder, 60);
    return [hours, minutes, seconds];
}

function calculatePaceFromTime(time, distance) {
    let totalSeconds = time / distance;
    return convertFromSeconds(totalSeconds);
}

function calculateTimeFromPace(pace, distance) {
    let totalSeconds = pace * distance;
    return convertFromSeconds(totalSeconds);
}

// dTime, constant distance, calc pace
time.addEventListener("input", () => {
    let totalTimeSeconds = convertToSeconds(
        ...timeChildren.map((child) => child.value)
    );
    let calculatedPace = calculatePaceFromTime(
        totalTimeSeconds,
        distanceInput.value
    );
    for (let i = 0; i < calculatedPace.length; i++) {
        paceChildren[i].value = calculatedPace[i];
    }
});

// dDistance, constant time, calc pace
distance.addEventListener("input", () => {
    let totalTimeSeconds = convertToSeconds(
        ...timeChildren.map((child) => child.value)
    );
    let calculatedPace = calculatePaceFromTime(
        totalTimeSeconds,
        distanceInput.value
    );
    for (let i = 0; i < calculatedPace.length; i++) {
        paceChildren[i].value = calculatedPace[i];
    }
});

// dPace, constant distance, calc time
pace.addEventListener("input", () => {
    let totalPaceSeconds = convertToSeconds(
        ...paceChildren.map((child) => child.value)
    );
    let calculatedTime = calculateTimeFromPace(
        totalPaceSeconds,
        distanceInput.value
    );
    for (let i = 0; i < calculatedTime.length; i++) {
        timeChildren[i].value = calculatedTime[i];
    }
});

// document.addEventListener("input", (event) => {
//     if (event.target.matches("input")) {
//         let totalTime = getTotalTime(
//             timeHours.value,
//             timeMinutes.value,
//             timeSeconds.value
//         );
//         console.log(totalTime);
//         let [calcPaceHours, calcPaceMinutes, calcPaceSeconds] = calculatePace(
//             totalTime,
//             distanceInput.value
//         );
//         console.log([calcPaceHours, calcPaceMinutes, calcPaceSeconds]);
//         paceHours.value = calcPaceHours;
//         paceMinutes.value = calcPaceMinutes;
//         paceSeconds.value = calcPaceSeconds;
//     }
// });

// function getTime(children) {
//     let [hours, minutes, seconds] = [...children];

//     let totalSeconds = hours * 3600 + minutes * 60 + seconds;

//     return totalSeconds;
// }

// function addChangeListener(element) {
//     element.addEventListener("change", () => {
//         console.log(element.value);
//     });
// }

// let timeChildren = Array.from(time.children);
// timeChildren.forEach((child) => {
//     addChangeListener(child);
// });
// let timeChildrenTotal = getTime(timeChildren);
// console.log(timeChildrenTotal);

// let paceChildren = Array.from(pace.children);
// paceChildren.forEach((child) => {
//     addChangeListener(child);
// });
