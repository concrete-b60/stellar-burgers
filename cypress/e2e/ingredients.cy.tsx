describe('Перехват запроса на эндпоинт', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('Тест: Добавление ингредиентов в конструктор ', () => {
    cy.get('.common_button').first().click();
    cy.get('.common_button').eq(1).click();
    cy.get('.common_button').eq(2).click();
    cy.get('.constructor-element_pos_top')
      .contains('Краторная булка N-200i')
      .should('be.visible');
    cy.get('.constructor-element_pos_bottom')
      .contains('Краторная булка N-200i')
      .should('be.visible');
    cy.get('.constructor-element__row')
      .contains('Биокотлета из марсианской Магнолии')
      .should('be.visible');
    cy.get('.constructor-element__row')
      .contains('Соус фирменный Space Sauce')
      .should('be.visible');
  });

  it('Тест: Открытия модального окна', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.contains('Краторная булка N-200i').should('exist');
  });

  it('Тест: Закрытие модального окна по крестику', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy="close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Тест: Закрытие модального окна по оверлею', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('[data-cy="overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
