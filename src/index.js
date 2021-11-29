console.log("pacing.app");

let time = document.querySelector(".time");
let timeChildren = Array.from(time.children);

let distance = document.querySelector(".distance");
let [distanceInput, distanceUnit] = distance.children;

let distanceInputValue = distanceInput.value;
let distanceUnitValue = distanceUnit.value;

let pace = document.querySelector(".pace");
let paceChildren = Array.from(pace.children).slice(0, -1);
// let paceUnit = document.querySelector("#pace-unit");

// let paceUnitValue = paceUnit.value;

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
    console.log(time, distance);
    // if (updatedDistanceUnit) {
    //     console.log("converted - pft!");
    //     distance = convertDistanceUnits(distance, distanceUnitValue);
    // }
    console.log(time, distance);
    let totalSeconds = time / distance;
    return convertFromSeconds(totalSeconds);
}

function calculateTimeFromPace(pace, distance) {
    // if (updatedDistanceUnit) {
    //     console.log("converted - tfp!");
    //     distance = convertDistanceUnits(distance, distanceUnitValue);
    // }
    let totalSeconds = pace * distance;
    // console.log(distance);
    return convertFromSeconds(totalSeconds);
}

function convertDistanceUnits(value, to) {
    console.log("to" + to);
    // if (to == "miles" || to == "/mile") {
    //     return value * 1.60934;
    if (to == "kilometers" || to == "/kilometer") {
        return value * 0.621371;
    } else {
        return value;
    }
}

// function convertPaceUnits(value, to) {
//     if (to == "miles") {
//         return value * 1.60934;
//     } else if (to == "kilometers") {
//         return value * 0.621371;
//     }
// }

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
        outputChildren[i].value = calculatedChildren[i];
    }
}

// document.addEventListener("change", (event) => {
//     distanceInputValue = distanceInput.value;

//     if (distanceInputValue == 0) {
//         return;
//     }
//     let targetUnitSelector = event.target;

//     if (targetUnitSelector.id == "distance-unit") {
//         distanceUnitValue = distanceUnit.value;
//         // console.log(distanceUnitValue);
//         distanceInputValue = convertDistanceUnits(
//             distanceInputValue,
//             distanceUnitValue
//         );
//         updateDOM(
//             "pace",
//             timeChildren,
//             paceChildren,
//             distanceInputValue,
//             distanceUnitValue
//         );
//         console.log("hi");
//     }
//     // else if (targetUnitSelector.id == "pace-unit") {
//     //     let selectedPaceUnit = paceUnit.value;
//     //     let convertedDistanceValue = convertDistanceUnits(
//     //         distanceInput.value,
//     //         selectedPaceUnit
//     //     );
//     //     updateDOM("pace", timeChildren, paceChildren, convertedDistanceValue);
//     // }
// });

document.addEventListener("input", (event) => {
    distanceInputValue = distanceInput.value;
    distanceUnitValue = distanceUnit.value;

    console.log("di,du " + [distanceInputValue, distanceUnitValue]);

    if (distanceInputValue == 0) {
        return;
    }

    distanceInputValue = convertDistanceUnits(
        distanceInputValue,
        distanceUnitValue
    );

    let targetParentElement = event.target.parentElement;

    if (event.target.id == "distance-unit") {
        console.log("du- " + distanceUnitValue);
        updateDOM("pace", timeChildren, paceChildren, distanceInputValue);
    } else if (
        (targetParentElement.className == "distance" ||
            targetParentElement.className == "time") &&
        event.target.id != "distance-unit"
    ) {
        console.log("distance/time- " + distanceUnitValue);
        updateDOM("pace", timeChildren, paceChildren, distanceInputValue);
    } else if (targetParentElement.className == "pace") {
        console.log("pace- " + distanceUnitValue);
        updateDOM("time", paceChildren, timeChildren, distanceInputValue);
    }
});

// distanceUnit.addEventListener("change", (event) => {
//     if (distanceInput.value == 0) {
//         return;
//     }
//     let selectedUnit = distanceUnit.value;
//     let convertedDistanceValue = convertDistanceUnits(
//         distanceInput.value,
//         selectedUnit
//     );
//     updateDOM("pace", timeChildren, paceChildren, convertedDistanceValue);
// });
