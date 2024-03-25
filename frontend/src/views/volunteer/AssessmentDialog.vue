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
                data-cy="reviewInput"
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
          v-if="isReviewValid"
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
import RemoteServices from '@/services/RemoteServices';

@Component({})
export default class AssessmentDialog extends Vue {
  @Model('dialog', { type: Boolean }) dialog!: boolean;
  @Prop({ type: Number, required: true }) readonly institutionId!: number;

  assessment: Assessment = new Assessment();

  async onSaveAssessment() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      try {
        const result = await RemoteServices.createAssessment(
          this.institutionId,
          this.assessment,
        );
        this.$emit('save-assessment', result);
      } catch (error) {
        await this.$store.dispatch('error', error);
      }
    }
  }

  get isReviewValid() {
    if (this.assessment.review === undefined) return false;
    return this.assessment.review.trim().length >= 10;
  }
}
</script>

<style scoped lang="scss"></style>
