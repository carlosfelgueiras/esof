describe('Participation', () => {
    beforeEach(() => {
        cy.deleteAllButArs();
        cy.createDemoEntities();
        cy.insertParticipationData();
    });

    afterEach(() => {
        cy.deleteAllButArs();
    });

    it('create participation', () => {
        const PARTICIPATION_RATING = 3;

        // login as a member
        cy.demoMemberLogin()

        // intercept create participation request
        cy.intercept('POST', '/activities/*/participations').as('createParticipation');

        // intercept get activities request
        cy.intercept('GET', '/users/*/getInstitution').as('getInstitutions');
        cy.intercept('GET', '/themes/availableThemes').as('availableThemes')

        // intercept get enrollments request
        cy.intercept('GET', '/activities/*/enrollments').as('getEnrollments');

        // navigate to activities page
        cy.get('[data-cy="institution"]').click();
        cy.get('[data-cy="activities"]').click();
        cy.wait('@getInstitutions');
        cy.wait('@availableThemes');

        cy.get('[data-cy="memberActivitiesTable"] tbody tr')
            // Verify that the table of activities has 2 instances
            .should('have.length', 2)
            .eq(0)
            .children()
            .should('have.length', 13)
            .eq(4)
            // Verify that the first activity of the table has 1 participation
            .should('contain', 1)
            .parent()
            .children()
            .eq(12)
            // Select 'Show Enrollments' from the first activity from the table
            .find('[data-cy="showEnrollments"]')
            .click(); 

        // check request was done
        cy.wait('@getEnrollments');

        cy.get('[data-cy="activityEnrollmentsTable"] tbody tr')
            // Verify that the table of activity enrollments has 2 instances
            .should('have.length', 2)
            .eq(0)
            .children()
            .eq(2)
            // Verify that the first enrollment of the table has the Participating column as false
            .should('contain', false)
            .parent()
            .children()
            .eq(4)
            // Select 'Select Participant' from the first enrollment from the table
            .find('[data-cy="participateButton"]')
            .click();

        cy.get('[data-cy="ratingInput"]').type(PARTICIPATION_RATING)

        cy.get('[data-cy="saveParticipation"]').click();

        cy.wait('@createParticipation');

        cy.get('[data-cy="activityEnrollmentsTable"] tbody tr')
            .eq(0)
            .children()
            .eq(2)
            // Verify that the first enrollment of the table has the Participating column as true
            .should('contain', true)
        
        cy.get('[data-cy="getActivities"]').click();

        cy.wait('@availableThemes');

        cy.get('[data-cy="memberActivitiesTable"] tbody tr')
            .eq(0)
            .children()
            .should('have.length', 13)
            .eq(4)
            // Verify that the first activity of the table has 2 participations
            .should('contain', 2)

        cy.logout();
    });
});