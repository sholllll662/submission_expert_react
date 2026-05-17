describe("Login flow", () => {
  it("should login with valid credentials", () => {
    // mock login and profile endpoints
    cy.intercept("POST", "**/login", {
      statusCode: 200,
      body: { data: { token: "test-token" } },
    }).as("loginReq");

    cy.intercept("GET", "**/users/me", {
      statusCode: 200,
      body: {
        data: {
          user: {
            id: "user-1",
            name: "Test User",
            email: "demo@demo.com",
            avatar: "",
          },
        },
      },
    }).as("meReq");

    cy.visit("/");
    cy.contains("Login").click();
    cy.get('input[type="email"]').type("demo@demo.com");
    cy.get('input[type="password"]').type("password");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginReq");
    cy.wait("@meReq");

    // After login we expect to see Threads page
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
