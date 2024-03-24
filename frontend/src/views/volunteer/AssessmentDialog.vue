<template>
  <v-dialog v-model="dialog" persistent width="600">
    <v-card>
      <v-card-title>
        <span class="headline"> New Assessment </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="*Review"
                :rules="[(v) => !!v || 'A review is required']"
                v-model="assessment.review"
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
          @click="$emit('close-assessment-dialog')"
        >
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          data-cy="saveAssessment"
          @click="onSaveAssessment"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import Assessment from '@/models/assessment/Assessment';

@Component({})
export default class AssessmentDialog extends Vue {
  @Model('dialog', { type: Boolean }) dialog!: boolean;
  @Prop({ type: Number, required: true }) readonly activityId!: number;

  assessment: Assessment = new Assessment();

  async onSaveAssessment() {
    //TODO: implement
    this.$emit('save-assessment');
  }
}
</script>

<style scoped lang="scss"></style>
