describe('Assessment', () => {
    beforeEach(() => {
        cy.deleteAllButArs();
        cy.createDemoEntities();
        cy.insertAssessmentData();
    });

    afterEach(() => {
        cy.deleteAllButArs();
    });

    it('create assessment', () => {
        const ASSESSMENT_REVIEW = "Institution bad";

        cy.demoVolunteerLogin()

        cy.intercept('POST', '/institutions/*/assessments').as('createAssessment');

        cy.intercept('GET', '/activities').as('getActivities');
        cy.intercept('GET', '/enrollments/volunteer').as('getEnrollments');
        cy.intercept('GET', '/participations/volunteer').as('getParticipations');
        cy.intercept('GET', '/assessments/volunteer').as('getAssessments');

        cy.get('[data-cy="volunteerActivities"]').click();

        cy.wait('@getActivities');
        cy.wait('@getEnrollments');
        cy.wait('@getParticipations');
        cy.wait('@getAssessments');

        cy.get('[data-cy="volunteerActivitiesTable"] tbody tr')
            // Verify that the table of activities has 6 instances
            .should('have.length', 6)
            .eq(0)
            .children()
            .eq(0)
            // Verify that the first activity of the table has the name A1
            .should('contain', 'A1')
            .parent()
            .children()
            .eq(9)
            // Assess the first activity of the table
            .find('[data-cy="writeAssessmentButton"]')
            .click();

        cy.get('[data-cy="reviewInput"]').type(ASSESSMENT_REVIEW);

        cy.get('[data-cy="saveAssessment"]').click();

        cy.wait('@createAssessment');

        cy.logout();

        cy.demoMemberLogin()

        cy.intercept('GET', '/users/*/getInstitution').as('getInstitution');
        cy.intercept('GET', '/institutions/*/assessments').as('getInstitutionAssestments');

        cy.get('[data-cy="institution"]').click();
        cy.get('[data-cy="assessments"]').click();

        cy.wait('@getInstitution');
        cy.wait('@getInstitutionAssestments');

        cy.get('[data-cy="institutionAssessmentsTable"] tbody tr')
            // Verify that the table of institution assessments has 1 instance
            .should('have.length', 1)
            .eq(0)
            .children()
            .eq(0)
            // Verify that the first assessment of the table has the review
            .should('contain', ASSESSMENT_REVIEW);

        cy.logout();

    });
});