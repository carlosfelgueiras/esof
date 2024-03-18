<template>
  <v-dialog v-model="dialog" persistent width="600">
    <v-card>
      <v-card-title>
        <span class="headline"> New Application </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="*Motivation"
                :rules="[(v) => !!v || 'A motivation is required']"
                v-model="enrollment.motivation"
                required
                data-cy="motivationInput"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="$emit('close-enrollment-dialog')"
        >
          Close
        </v-btn>
        <v-btn
          v-if="isMotivationValid"
          color="blue-darken-1"
          variant="text"
          data-cy="saveEnrollment"
          @click="onSaveEnrollment"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import Enrollment from '@/models/enrollment/Enrollment';
import RemoteServices from '@/services/RemoteServices';

@Component({})
export default class EnrollmentDialog extends Vue {
  @Model('dialog', { type: Boolean }) dialog!: boolean;
  @Prop({ type: Number, required: true }) readonly activityId!: number;

  enrollment: Enrollment = new Enrollment();

  async onSaveEnrollment() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      try {
        const result = await RemoteServices.createEnrollment(
          this.activityId,
          this.enrollment,
        );
        this.$emit('save-enrollment', result);
      } catch (error) {
        await this.$store.dispatch('error', error);
      }
    }
  }

  get isMotivationValid() {
    if (this.enrollment.motivation === undefined) return false;
    return this.enrollment.motivation.trim().length >= 10;
  }
}
</script>

<style scoped lang="scss"></style>
