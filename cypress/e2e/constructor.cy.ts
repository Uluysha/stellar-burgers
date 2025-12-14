import { сonstructorSelectors } from '../support/selectors/burger-constructor';

describe('[e2e] Burger Construction', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');

    cy.get(сonstructorSelectors.ingredient).should('have.length', 3);
  });

  it('Добавление ингредиентов', () => {
    cy.addIngredientByIndex(0);
    cy.addIngredientByIndex(1);
    cy.addIngredientByIndex(2);

    cy.get(сonstructorSelectors.topBun)
      .should('be.visible')
      .and('contain.text', '(верх)');

    cy.get(сonstructorSelectors.bottomBun)
      .should('be.visible')
      .and('contain.text', '(низ)');

    cy.get(сonstructorSelectors.element).should('have.length', 2);
  });

  it('Открытие/закрытие окна с ингредиентами', () => {
    cy.openIngredientModal(0);
    cy.get(сonstructorSelectors.modal).should('be.visible');

    cy.closeModal();
    cy.get(сonstructorSelectors.modal).should('not.exist');

    cy.openIngredientModal(0);

    cy.closeModalByOverlay();
    cy.get(сonstructorSelectors.modal).should('not.exist');
  });

  it('Создание заказа (когда авторизован)', () => {
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.loginAsTestUser();

    cy.visit('/');

    cy.get(сonstructorSelectors.ingredient).should('have.length', 3);

    cy.addIngredientByIndex(0);
    cy.addIngredientByIndex(1);
    cy.addIngredientByIndex(2);

    cy.get(сonstructorSelectors.orderButton).click();

    cy.wait('@createOrder');

    cy.get(сonstructorSelectors.orderDetailsNumber)
      .should('be.visible')
      .and('contain.text', '99237');

    cy.closeModal();

    cy.shouldHaveEmptyConstructor();

    cy.logout();
  });
});
