import { сonstructorSelectors } from './selectors/burger-constructor';

Cypress.Commands.add('addIngredientByIndex', (index: number) => {
  cy.get(сonstructorSelectors.ingredient)
    .eq(index)
    .within(() => cy.get(сonstructorSelectors.addButton).click());
});

Cypress.Commands.add('openIngredientModal', (index: number) => {
  cy.get(сonstructorSelectors.ingredient)
    .eq(index)
    .find(сonstructorSelectors.ingredientLink)
    .click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get(сonstructorSelectors.modalClose).click();
});

Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get(сonstructorSelectors.modalOverlay).click({ force: true });
});

Cypress.Commands.add('loginAsTestUser', () => {
  cy.setCookie('accessToken', 'mock-access-token');
  window.localStorage.setItem('refreshToken', 'mock-refresh-token');
});

Cypress.Commands.add('logout', () => {
  cy.clearCookie('accessToken');
  window.localStorage.removeItem('refreshToken');
});

Cypress.Commands.add('shouldHaveEmptyConstructor', () => {
  cy.get(сonstructorSelectors.topBun).should('not.exist');
  cy.get(сonstructorSelectors.bottomBun).should('not.exist');
  cy.get(сonstructorSelectors.element).should('have.length', 0);
});
