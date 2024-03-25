<template>
  <v-dialog v-model="dialog" persistent width="600">
    <v-card>
      <v-card-title>
        <span class="headline"> Select Participant </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Rating"
                :rules="[
                  (v) =>
                    isRatingValid(v) ||
                    'Rating must be a number between 1 and 5',
                ]"
                v-model="participation.rating"
                data-cy="ratingInput"
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
          @click="$emit('close-participation-dialog')"
        >
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          data-cy="saveParticipation"
          @click="onSaveParticipation"
        >
          Make Participant
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import Participation from '@/models/participation/Participation';
import RemoteServices from '@/services/RemoteServices';

@Component({})
export default class ParticipationDialog extends Vue {
  @Model('dialog', { type: Boolean }) dialog!: boolean;
  @Prop({ type: Number, required: true }) readonly activityId!: number;

  participation: Participation = new Participation();

  async onSaveParticipation() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      try {
        const result = await RemoteServices.createParticipation(
          this.activityId,
          this.participation,
        );
        this.$emit('save-participation', result);
      } catch (error) {
        await this.$store.dispatch('error', error);
      }
    }
  }

  isRatingValid(value: any) {
    if (value == null || value.length == 0) return true;
    if (!/^\d+$/.test(value)) return false;
    const parsedValue = parseInt(value);
    return parsedValue >= 1 && parsedValue <= 5;
  }
}
</script>

<style scoped lang="scss"></style>
