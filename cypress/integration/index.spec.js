/// <reference types="cypress" />

describe("pacing.app tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Make sure the time, distance, and pace elements exist", () => {
        cy.get(".time").should("have.length", 1);
        cy.get(".time").children().should("have.length", 3);
        cy.get(".distance").should("have.length", 1);
        cy.get(".distance").children().should("have.length", 2);
        cy.get(".pace").should("have.length", 1);
        cy.get(".pace").children().should("have.length", 3);
    });

    it("Input a time", () => {
        const minutesVal = "30";
        cy.get("#time-minutes")
            .type(`${minutesVal}`)
            .should("have.value", "30");
        cy.get("#pace-minutes").should("have.value", "3");
    });

    it("Input a pace", () => {
        const minutesVal = "30";
        cy.get("#pace-minutes")
            .type(`${minutesVal}`)
            .should("have.value", "30");
        cy.get("#time-hours").should("have.value", "5");
    });

    it("Change the distance value", () => {
        const distanceVal = "5";
        cy.get("#distance-input")
            .type(`{backspace}{backspace}${distanceVal}`)
            .should("have.value", "5");

        const minutesVal = "30";
        cy.get("#pace-minutes")
            .type(`{backspace}${minutesVal}`)
            .should("have.value", "30");
        cy.get("#time-hours").should("have.value", "2");
        cy.get("#time-minutes").should("have.value", "30");
    });

    it("Change the distance unit", () => {
        cy.get("#distance-unit").should("have.value", "Miles");
        cy.get("#distance-unit")
            .select("Kilometers")
            .should("have.value", "Kilometers");
    });
});
