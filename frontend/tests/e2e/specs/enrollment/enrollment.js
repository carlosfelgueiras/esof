describe('Enrollment', () => {
    beforeEach(() => {
        cy.deleteAllButArs();
        cy.createDemoEntities();
        cy.insertEnrollmentData();
    });

    afterEach(() => {
        cy.deleteAllButArs();
    });

    it('create enrollment', () => {
        const ENROLLMENT_MOTIVATION = "I want to help people";

        cy.demoVolunteerLogin()

        cy.intercept('POST', '/activities/*/enrollments').as('createEnrollment');

        cy.intercept('GET', '/activities').as('getActivities');
        cy.intercept('GET', '/enrollments/volunteer').as('getEnrollments');

        cy.get('[data-cy="volunteerActivities"]').click();

        cy.wait('@getActivities');
        cy.wait('@getEnrollments');

        cy.get('[data-cy="volunteerActivitiesTable"] tbody tr')
            .should('have.length', 3)
            .eq(0)
            .children()
            .should('have.length', 10)
            .eq(9)
            .children()
            .get('[data-cy="applyButton"]')
            .click();

        cy.get('[data-cy="motivationInput"]').type(ENROLLMENT_MOTIVATION);

        cy.get('[data-cy="saveEnrollment"]').click();

        cy.wait('@createEnrollment');

        cy.logout();
    });
});