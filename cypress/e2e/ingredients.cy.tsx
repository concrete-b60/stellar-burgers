import { selectors } from '../support/selectors';

export const ingredients = {
  bunTop: 'Краторная булка N-200i',
  bunBottom: 'Краторная булка N-200i',
  cutlet: 'Биокотлета из марсианской Магнолии',
  sauce: 'Соус фирменный Space Sauce'
};

describe('Перехват запроса на эндпоинт', () => {
  beforeEach(() => {
    cy.getIngredients();
  });

  it('Тест: Добавление ингредиентов в конструктор ', () => {
    cy.clickIngredientButton(0);
    cy.clickIngredientButton(1);
    cy.clickIngredientButton(2);

    cy.verifyIngredientInConstructor(
      selectors.constructorTop,
      ingredients.bunTop
    );
    cy.verifyIngredientInConstructor(
      selectors.constructorBottom,
      ingredients.bunBottom
    );
    cy.verifyIngredientInConstructor(
      selectors.constructorRow,
      ingredients.cutlet
    );
    cy.verifyIngredientInConstructor(
      selectors.constructorRow,
      ingredients.sauce
    );
  });

  it('Тест: Открытия модального окна', () => {
    cy.openIngredientModal(ingredients.bunTop);
    cy.contains(ingredients.bunTop).should('exist');
  });

  it('Тест: Закрытие модального окна по крестику', () => {
    cy.openIngredientModal(ingredients.bunTop);
    cy.closeModalByButton();
  });

  it('Тест: Закрытие модального окна по оверлею', () => {
    cy.openIngredientModal(ingredients.bunTop);
    cy.closeModalByOverlay();
  });
});
