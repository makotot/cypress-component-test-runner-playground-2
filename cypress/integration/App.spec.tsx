describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.scrollTo(0, 0);
  });

  it('childrenがrenderされること', () => {
    cy.get('[data-cy=nav-wrapper]').children().should('have.length', 5);
    cy.get('[data-cy=section-wrapper]').children().should('have.length', 5);
  });
  it('viewport内の要素に対応するナビゲーションがアクティブになること', () => {
    cy.get('[data-cy=section-item]').eq(0).should('have.class', 'active');
    cy.get('[data-cy=nav-item]').eq(0).should('have.class', 'active');
  });
  it('viewport内に収まる要素が変わったら、対応するナビゲーションがアクティブな状態になること', () => {
    cy.get('[data-cy=section-item]').eq(0).should('have.class', 'active');
    cy.get('[data-cy=nav-item]').eq(0).should('have.class', 'active');

    cy.get('[data-cy=section-item').eq(1).scrollIntoView();

    cy.get('[data-cy=section-item]').eq(1).should('have.class', 'active');
    cy.get('[data-cy=nav-item]').eq(1).should('have.class', 'active');
  });
});