import { ISOtoString } from '@/services/ConvertDateService';

export default class Enrollment {
  id: number | null = null;
  motivation!: string;
  enrollmentDateTime!: string;
  activityId!: number;
  volunteerName!: string;
  volunteerId!: number;
  isParticipating!: boolean;

  constructor(jsonObj?: Enrollment) {
    if (jsonObj) {
      this.id = jsonObj.id;
      this.motivation = jsonObj.motivation;
      this.enrollmentDateTime = ISOtoString(jsonObj.enrollmentDateTime);
      this.activityId = jsonObj.activityId;
      this.volunteerName = jsonObj.volunteerName;
      this.volunteerId = jsonObj.volunteerId;
      this.isParticipating = jsonObj.isParticipating;
    }
  }
}
