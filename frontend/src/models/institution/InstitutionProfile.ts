import { ISOtoString } from '@/services/ConvertDateService';
import Enrollment from '../enrollment/Enrollment';
import Participation from '../participation/Participation';
import Assessment from '../assessment/Assessment';
import InstitutionEvent from './InstitutionEvent';

export default class InstitutionProfile {
  name!: string;
  creationDate!: string;
  nif!: string;
  email!: string;

  enrollments: Enrollment[] = [];
  participations: Participation[] = [];
  assessments: Assessment[] = [];

  events: InstitutionEvent[] = [];

  constructor(jsonObj?: InstitutionProfile) {
    if (jsonObj) {
      this.name = jsonObj.name;
      this.creationDate = ISOtoString(jsonObj.creationDate);
      this.nif = jsonObj.nif
      this.email = jsonObj.email

      jsonObj.enrollments.forEach((enrollment?: Enrollment) => {
        this.enrollments.push(new Enrollment(enrollment));
      });

      jsonObj.participations.forEach((participation?: Participation) => {
        this.participations.push(new Participation(participation));
      });

      jsonObj.assessments.forEach((assessment?: Assessment) => {
        this.assessments.push(new Assessment(assessment));
      });

      this.enrollments.forEach((enrollment: Enrollment) => {
        this.events.push(new InstitutionEvent(enrollment));
      });
      this.participations.forEach((participation: Participation) => {
        this.events.push(new InstitutionEvent(participation));
      });
      this.assessments.forEach((assessment: Assessment) => {
        this.events.push(new InstitutionEvent(assessment));
      });

      this.events.sort((a: InstitutionEvent, b: InstitutionEvent) => {
        return ((new Date(<string>a.eventDate)) < (new Date(<string>b.eventDate))) ? 1 : -1;
      })
    }
  }
}
