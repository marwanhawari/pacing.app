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

function updateDOM(metric, inputChildren, outputChildren, distanceInput) {
    // Convert the Hr/Min/Sec to total Sec
    let totalConvertedSeconds = convertToSeconds(
        ...inputChildren.map((child) => child.value)
    );
    // Calculate the Hr/Min/Sec for the pace
    let calculatedChildren;
    if (metric == "pace") {
        calculatedChildren = calculatePaceFromTime(
            totalConvertedSeconds,
            distanceInput.value
        );
    } else if (metric == "time") {
        calculatedChildren = calculateTimeFromPace(
            totalConvertedSeconds,
            distanceInput.value
        );
    }
    // Actually modify the values in the DOM
    for (let i = 0; i < calculatedChildren.length; i++) {
        outputChildren[i].value = calculatedChildren[i];
    }
}

document.addEventListener("input", (event) => {
    if (distanceInput.value == 0) {
        return;
    }
    let targetParentElement = event.target.parentElement;
    if (
        targetParentElement.className == "distance" ||
        targetParentElement.className == "time"
    ) {
        updateDOM("pace", timeChildren, paceChildren, distanceInput);
    } else if (targetParentElement.className == "pace") {
        updateDOM("time", paceChildren, timeChildren, distanceInput);
    }
});
