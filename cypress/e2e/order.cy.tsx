describe('Создание заказа', () => {
  beforeEach(() => {
    cy.getIngredients();
    cy.getUser();
    cy.refreshToken();
  });

  it('Тест: Сборка бургера и оформление заказа', () => {
    cy.clickIngredientButton(0);
    cy.clickIngredientButton(1);
    cy.clickIngredientButton(2);

    cy.placeOrder();

    cy.waitForOrderCreation();

    cy.verifyOrderModal('87334');

    cy.closeModalByButton();

    cy.verifyEmptyConstructor();
  });
});
