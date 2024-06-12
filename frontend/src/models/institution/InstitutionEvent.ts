import Assessment from '../assessment/Assessment';
import Enrollment from '../enrollment/Enrollment';
import Participation from '../participation/Participation';

export default class InstitutionEvent {
  event!: Enrollment | Participation | Assessment;
  eventDate!: String;
  eventDescription!: String;

  constructor(event: Enrollment | Participation | Assessment) {
    this.event = event;

    if (event instanceof Enrollment) {
      this.eventDate = event.enrollmentDateTime;
      this.eventDescription = `${event.volunteerName} enrolled into Activity ${event.activityId}`;
    } else if (event instanceof Participation) {
      this.eventDate = event.acceptanceDate;
      this.eventDescription = `Volunteer ${event.volunteerId} was accepted into Activity ${event.activityId}`;
    } else if (event instanceof Assessment) {
      this.eventDate = event.reviewDate;
      this.eventDescription = `${event.volunteerName} reviewed the institution`;
    }
  }
}
