describe("User can submit destination", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/trip");
  });

  it("successfully", () => {
    let destination = "Rome";
    cy.route({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?**",
      response: "fixture:inputDest.json",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY
      }
    });
    cy.login();
    cy.get("#place-form").within(() => {
      cy.get("#place").type("Rome");
      cy.get("#submit").click();
    });
    cy.get("#root").should("contain", "Destination successfully selected");
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/**",
      response: "fixture:inputDest.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/**",
      response: "fixture:inputDest.json"
    });

    cy.get("#days").click();
    cy.get("#days > .visible > :nth-child(3)").click();

    cy.get("#root").should("contain", "Focus of trip");
  });

  it("unsuccessfully when no location is found", () => {
    let destination = "sdfsdfsdf";
    cy.route({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?**",
      response: "fixture:inputDest0Results.json",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY
      }
    });
    cy.login();
    cy.get("#place-form").within(() => {
      cy.get("#place").type("sdfsdfsdf");
      cy.get("#submit").click();
    });
    cy.get("#root").should("contain", "Can't go there. Zero Results");
  });
});
