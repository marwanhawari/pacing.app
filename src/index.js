let time = document.querySelector(".time");
let timeChildren = Array.from(time.children).filter(
    (element) => !element.classList.contains("colon")
);

// let distance = document.querySelector(".distance");
let distanceInput = document.querySelector("#distance-input");
let distanceUnit = document.querySelector("#distance-unit");

let pace = document.querySelector(".pace");
let paceChildren = Array.from(pace.children).filter(
    (element) => !element.classList.contains("colon")
);
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
    if (to == "kilometers" || to == "per-kilometer") {
        return value * 0.621371;
    } else {
        return value;
    }
}

function convertPaceUnits(value, to) {
    if (to == "kilometers" || to == "per-kilometer") {
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
        targetParentElement.className.includes("time") ||
        (targetParentElement.className.includes("pace") &&
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
        targetParentElement.className.includes("distance") ||
        event.target.id == "distance-unit" ||
        targetParentElement.className.includes("time")
    ) {
        updateDOM("pace", timeChildren, paceChildren, distanceInputValue);
    } else if (
        targetParentElement.className.includes("pace") &&
        event.target.id != "pace-unit"
    ) {
        updateDOM("time", paceChildren, timeChildren, distanceInputValue);
    }
});

let colorSchemeButton = document.querySelector("#color-scheme-button");
let toggleLightButton = document.querySelector("#toggle-light-mode");
let toggleDarkButton = document.querySelector("#toggle-dark-mode");
let bodyClasses = document.body.classList;

let colorScheme = localStorage.getItem("colorScheme");
if (colorScheme == "dark") {
    toggleLightButton.style.display = "block";
    toggleDarkButton.style.display = "none";
    bodyClasses.add("dark");
} else {
    toggleLightButton.style.display = "none";
    toggleDarkButton.style.display = "block";
    bodyClasses.remove("dark");
}

// Toggle color scheme
colorSchemeButton.addEventListener("click", () => {
    if (bodyClasses.contains("dark")) {
        // Turn off dark mode
        toggleLightButton.style.display = "none"; // Hide sun icon
        toggleDarkButton.style.display = "block"; // Show moon icon
        bodyClasses.remove("dark");
        localStorage.setItem("colorScheme", "light");
    } else {
        // Turn on dark mode
        toggleLightButton.style.display = "block"; // Show sun icon
        toggleDarkButton.style.display = "none"; // Hide moon icon
        bodyClasses.add("dark");
        localStorage.setItem("colorScheme", "dark");
    }
});
