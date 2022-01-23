export {};

describe("Cypress", () => {
  it("should have loading text and load list", () => {
    cy.visit("http://localhost:3000");
    cy.get("span").should("have.text", "Loading supermarket list items...");

    cy.get("h1", {timeout: 2000}).should("be.visible");
    cy.get("h1").should("have.text", "Supermarket List");
  });

  it("should add a new item to the list", () => {
    cy.get("h1", {timeout: 2000});
    cy.get("button").contains("Add Item").click();
    cy.get("input").type("cypress item");
    cy.get("nav > button").contains("Add", {matchCase: true}).click();
    cy.get("ul", {timeout: 2000}).get("li").contains("cypress item").should("be.visible");
  });

  it("should remove an item to the list", () => {
    cy.get("h1", {timeout: 2000});
    cy.get("ul").get("li").get('button > [alt="Delete item image"]').click();
    cy.get("h3", {timeout: 2000}).should("have.text", "0 item(s)");
  });
});
