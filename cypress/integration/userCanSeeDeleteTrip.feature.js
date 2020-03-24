describe("User can see side cards", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/trip");
  });

  it("successfully", () => {
    cy.login();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trips/**",
      response: "fixture:showcard_response.json",
      status: 200
    });
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/api/v1/trips**",
      response: "fixture:inputDest.json",
      status: 200
    });
    cy.createTrip();
    cy.chooseActivityType();
    cy.chooseHotel();
    cy.chooseRestaurants();
    cy.get("#remove-btn-image").click();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trips/**",
      response: "fixture:showcard_response_deleted.json",
      status: 200
    });
    cy.get('#root').should('contain', 'St Petersburg')
  });
});
