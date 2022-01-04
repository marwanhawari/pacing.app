/// <reference types="cypress" />

describe("pacing.app tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Make sure the time, distance, and pace elements exist", () => {
        cy.get(".time").should("have.length", 1);
        cy.get(".time").children().should("have.length", 5);
        cy.get(".distance").should("have.length", 1);
        cy.get(".distance").children().should("have.length", 1);
        cy.get(".pace").should("have.length", 1);
        cy.get(".pace").children().should("have.length", 5);
    });

    it("Input a time", () => {
        const minutesVal = "30";
        cy.get("#time-minutes")
            .type(`${minutesVal}`)
            .should("have.value", "30");
        cy.get("#pace-minutes").should("have.value", "03");
    });

    it("Input a pace", () => {
        const minutesVal = "30";
        cy.get("#pace-minutes")
            .type(`${minutesVal}`)
            .should("have.value", "30");
        cy.get("#time-hours").should("have.value", "05");
    });

    it("Change the distance value", () => {
        const distanceVal = "05";
        cy.get("#distance-input")
            .type(`{backspace}{backspace}${distanceVal}`)
            .should("have.value", "05");

        const minutesVal = "30";
        cy.get("#pace-minutes")
            .type(`{backspace}{backspace}${minutesVal}`)
            .should("have.value", "30");
        cy.get("#time-hours").should("have.value", "02");
        cy.get("#time-minutes").should("have.value", "30");
    });

    it("Change the distance unit", () => {
        cy.get("#distance-unit").should("have.value", "miles");
        cy.get("#distance-unit")
            .select("kilometers")
            .should("have.value", "kilometers");
    });

    it("Test the distance unit conversion", () => {
        cy.get("#distance-unit").should("have.value", "miles");

        const minutesVal = "10";

        cy.get("#pace-minutes").type(`${minutesVal}`);

        cy.get("#time-hours").should("have.value", "01");
        cy.get("#time-minutes").should("have.value", "40");
        cy.get("#time-seconds").should("have.value", "00");

        cy.get("#distance-unit").select("kilometers");

        cy.get("#pace-hours").should("have.value", "00");
        cy.get("#pace-minutes").should("have.value", "16");
        cy.get("#pace-seconds").should("have.value", "06");

        const updateDistanceVal = "9";

        cy.get("#distance-input").type(
            `{backspace}{backspace}${updateDistanceVal}`
        );

        cy.get("#pace-hours").should("have.value", "00");
        cy.get("#pace-minutes").should("have.value", "17");
        cy.get("#pace-seconds").should("have.value", "53");

        cy.get("#pace-unit").select("per kilometer");

        cy.get("#pace-hours").should("have.value", "00");
        cy.get("#pace-minutes").should("have.value", "11");
        cy.get("#pace-seconds").should("have.value", "07");
    });
});
