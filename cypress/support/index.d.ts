declare namespace Cypress {
  interface Chainable {
    getIngredients(): Chainable<void>;
    clickIngredientButton(index?: number): Chainable<void>;
    openIngredientModal(ingredientName: string): Chainable<void>;
    closeModalByButton(): Chainable<void>;
    closeModalByOverlay(): Chainable<void>;
    verifyIngredientInConstructor(
      selector: string,
      ingredientName: string
    ): Chainable<void>;
    getUser(): Chainable<void>;
    placeOrder(): Chainable<void>;
    waitForOrderCreation(): Chainable<void>;
    verifyOrderModal(orderNumber: string): Chainable<void>;
    verifyEmptyConstructor(): Chainable<void>;
    refreshToken(): Chainable<void>;
  }
}
