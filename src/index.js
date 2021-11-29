console.log("pacing.app");

let time = document.querySelector(".time");
let timeChildren = Array.from(time.children);

let distance = document.querySelector(".distance");
let [distanceInput, distanceUnit] = distance.children;

let pace = document.querySelector(".pace");
let paceChildren = Array.from(pace.children).slice(0, -1);
let paceUnit = document.querySelector("#pace-unit");

function divmod(numerator, denominator) {
    return [Math.floor(numerator / denominator), numerator % denominator];
}

function pad(number, size) {
    number = number.toString();
    while (number.length < size) {
        number = "0" + number;
    }
    return number;
}

function limitInputLength(inputValue, maxLength) {
    if (inputValue.length > maxLength) {
        inputValue = inputValue.slice(0, maxLength);
    }
    return inputValue;
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
    return convertFromSeconds(totalSeconds.toFixed(0));
}

function calculateTimeFromPace(pace, distance) {
    let totalSeconds = pace * distance;
    return convertFromSeconds(totalSeconds.toFixed(0));
}

function convertDistanceUnits(value, to) {
    if (to == "kilometers" || to == "/kilometer") {
        return value * 0.621371;
    } else {
        return value;
    }
}

function convertPaceUnits(value, to) {
    if (to == "kilometers" || to == "/kilometer") {
        return value * 1.60934;
    } else {
        return value;
    }
}

function updateDOM(metric, inputChildren, outputChildren, distanceInputValue) {
    // Convert the Hr/Min/Sec to total Sec
    let totalConvertedSeconds = convertToSeconds(
        ...inputChildren.map((child) => child.value)
    );
    // Calculate the Hr/Min/Sec for the pace
    let calculatedChildren;
    if (metric == "pace") {
        calculatedChildren = calculatePaceFromTime(
            totalConvertedSeconds,
            distanceInputValue
        );
    } else if (metric == "time") {
        calculatedChildren = calculateTimeFromPace(
            totalConvertedSeconds,
            distanceInputValue
        );
    }
    // Actually modify the values in the DOM
    for (let i = 0; i < calculatedChildren.length; i++) {
        outputChildren[i].value = pad(calculatedChildren[i], 2);
    }
}

document.addEventListener("input", (event) => {
    let distanceInputValue = distanceInput.value;
    let distanceUnitValue = distanceUnit.value;
    let paceUnitValue = paceUnit.value;

    // Input validation
    if (distanceInputValue == 0) {
        return;
    }

    let targetParentElement = event.target.parentElement;

    if (
        targetParentElement.className == "time" ||
        (targetParentElement.className == "pace" &&
            event.target.id != "pace-unit")
    ) {
        event.target.value = limitInputLength(event.target.value, 2);
    }

    // Check if distance unit is km
    distanceInputValue = convertDistanceUnits(
        distanceInputValue,
        distanceUnitValue
    );
    // Check if pace unit is min/km
    distanceInputValue = convertPaceUnits(distanceInputValue, paceUnitValue);

    if (event.target.id == "pace-unit") {
        updateDOM("pace", timeChildren, paceChildren, distanceInputValue);
    } else if (
        targetParentElement.className == "distance" ||
        targetParentElement.className == "time"
    ) {
        updateDOM("pace", timeChildren, paceChildren, distanceInputValue);
    } else if (
        targetParentElement.className == "pace" &&
        event.target.id != "pace-unit"
    ) {
        updateDOM("time", paceChildren, timeChildren, distanceInputValue);
    }
});
