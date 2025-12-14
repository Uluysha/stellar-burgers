export const сonstructorSelectors = {
  element: '[data-cy=burger-constructor-element]',
  topBun: '[data-cy=burger-constructor-top-bun]',
  bottomBun: '[data-cy=burger-constructor-bottom-bun]',
  ingredient: '[data-cy=burger-ingredient]',
  modal: '[data-cy=modal]',
  modalClose: '[data-cy=modal-close]',
  modalOverlay: '[data-cy=modal-overlay]',
  orderDetailsNumber: '[data-cy=order-details-number]',
  addButton: 'button:contains("Добавить")',
  orderButton: 'button:contains("Оформить заказ")',
  ingredientLink: 'a[href^="/ingredients/"]'
} as const;

export type TConstructorSelectors =
  (typeof сonstructorSelectors)[keyof typeof сonstructorSelectors];
