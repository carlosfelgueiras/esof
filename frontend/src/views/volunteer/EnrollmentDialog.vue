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

@Component({})
export default class EnrollmentDialog extends Vue {
  @Model('dialog', { type: Boolean }) dialog!: boolean;
  @Prop({ type: Number, required: true }) readonly activityId!: number;

  enrollment: Enrollment = new Enrollment();

  async onSaveEnrollment() {
    //TODO: implement
    this.$emit('save-enrollment');
  }
}
</script>

<style scoped lang="scss"></style>
