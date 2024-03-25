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

        cy.demoMemberLogin()

        // intercept get institutions
        cy.intercept('GET', '/users/*/getInstitution').as('getInstitutions');
        cy.intercept('GET', '/themes/availableThemes').as('availableThemes');
        
        cy.get('[data-cy="institution"]').click();

        cy.get('[data-cy="activities"]').click();
        cy.wait('@getInstitutions');
        cy.wait('@availableThemes');

        cy.get('[data-cy="memberActivitiesTable"] tbody tr')
            .should('have.length', 3)
            .eq(0)
            .children()
            .should('have.length', 13)
            .eq(3)
            .should('contain', 0)
        
        cy.logout();

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
            .find('[data-cy="applyButton"]')
            .click();

        cy.get('[data-cy="motivationInput"]').type(ENROLLMENT_MOTIVATION);

        cy.get('[data-cy="saveEnrollment"]').click();

        cy.wait('@createEnrollment');

        cy.logout();

        cy.demoMemberLogin()

        cy.intercept('GET', '/activities/*/enrollments').as('getEnrollments');

        cy.get('[data-cy="institution"]').click();

        cy.get('[data-cy="activities"]').click();
        cy.wait('@getInstitutions');
        cy.wait('@availableThemes');

        cy.get('[data-cy="memberActivitiesTable"] tbody tr')
            .should('have.length', 3)
            .eq(0)
            .children()
            .should('have.length', 13)
            .eq(3)
            .should('contain', 1);

        cy.get('[data-cy="memberActivitiesTable"] tbody tr')
            .should('have.length', 3)
            .eq(0)
            .children()
            .should('have.length', 13)
            .eq(12)
            .find('[data-cy="showEnrollments"]')
            .click();
            
        cy.wait('@getEnrollments');

        cy.get('[data-cy="activityEnrollmentsTable"] tbody tr')
            .should('have.length', 1)
            .eq(0)
            .children()
            .should('have.length', 5)
            .eq(1)
            .should('contain', ENROLLMENT_MOTIVATION);
        
        cy.logout();
    });
});