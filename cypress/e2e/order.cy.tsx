describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    cy.intercept('POST', '/api/auth/token', { fixture: 'refresh.json' }).as(
      'refreshToken'
    );

    cy.intercept('POST', '/api/orders', {
      statusCode: 200,
      body: {
        success: true,
        name: 'Флюоресцентный spicy био-марсианский бургер',
        order: {
          number: 87334,
          status: 'done',
          price: 2490,
          name: 'Флюоресцентный spicy био-марсианский бургер',
          owner: {
            name: 'Александр',
            email: 'd-a-s91@yandex.ru'
          },
          ingredients: [
            {
              _id: '643d69a5c3f7b9001cfa093d',
              name: 'Флюоресцентная булка R2-D3',
              type: 'bun'
            },
            {
              _id: '643d69a5c3f7b9001cfa0941',
              name: 'Биокотлета из марсианской Магнолии',
              type: 'main'
            },
            {
              _id: '643d69a5c3f7b9001cfa0942',
              name: 'Соус Spicy-X',
              type: 'sauce'
            }
          ]
        }
      }
    }).as('createOrder');

    cy.setCookie('accessToken', 'mock-access-token');
    cy.setCookie('refreshToken', 'mock-refresh-token');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('Сборка бургера и оформление заказа', () => {
    cy.get('.common_button').first().click();
    cy.get('.common_button').eq(1).click();
    cy.get('.common_button').eq(2).click();
    cy.get('[data-cy="place-order"]').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '87334');
    cy.get('[data-cy="close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="constructor"]').should(
      'not.contain',
      'Краторная булка N-200i'
    );
  });
});
