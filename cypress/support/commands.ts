import { selectors } from './selectors';

Cypress.Commands.add('getIngredients', () => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.visit('/');
  cy.wait('@getIngredients');
});

Cypress.Commands.add('getUser', (): void => {
  cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.setCookie('accessToken', 'mock-access-token');
  cy.setCookie('refreshToken', 'mock-refresh-token');
  cy.visit('/');
  cy.wait('@getUser');
});

Cypress.Commands.add('refreshToken', (): void => {
  cy.intercept('POST', '/api/auth/token', { fixture: 'refresh.json' }).as(
    'refreshToken'
  );
});

Cypress.Commands.add('clickIngredientButton', (index = 0) => {
  cy.get(selectors.commonButton).eq(index).click();
});

Cypress.Commands.add('placeOrder', (): void => {
  cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );
  cy.get(selectors.placeOrder).click();
});

Cypress.Commands.add('waitForOrderCreation', () => {
  cy.wait('@createOrder');
});

Cypress.Commands.add('verifyOrderModal', (orderNumber: string): void => {
  cy.get(selectors.modal).should('be.visible');
  cy.get(selectors.orderNumber).should('contain', orderNumber);
});

Cypress.Commands.add('verifyEmptyConstructor', (): void => {
  cy.get(selectors.constructor).should('not.contain', 'Краторная булка N-200i');
});

Cypress.Commands.add('openIngredientModal', (ingredientName) => {
  cy.contains(ingredientName).click();
  cy.get(selectors.modal).should('be.visible');
});

Cypress.Commands.add('closeModalByButton', () => {
  cy.get(selectors.closeButton).click();
  cy.get(selectors.modal).should('not.exist');
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(selectors.overlay).click({ force: true });
  cy.get(selectors.modal).should('not.exist');
});

Cypress.Commands.add(
  'verifyIngredientInConstructor',
  (position, ingredientName) => {
    cy.get(position).contains(ingredientName).should('be.visible');
  }
);

Cypress.Commands.add('waitForOrderCreation', () => {
  cy.wait('@createOrder');
});
