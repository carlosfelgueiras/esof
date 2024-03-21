<template>
    <v-dialog v-model="dialog" persistent width="600">
      <v-card>
        <v-card-title>
          <span class="headline"> New Rating </span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="*Rating"
                  :rules="[(v) => !!v || 'A Rating is required']"
                  v-model="participation.rating"
                  required
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
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import Participation from '@/models/participation/Participation';
  
  @Component({})
  export default class ParticipationDialog extends Vue {
    @Model('dialog', { type: Boolean }) dialog!: boolean;
    @Prop({ type: Number, required: true }) readonly activityId!: number;
  
    participation: Participation = new Participation();
  
    async onSaveParticipation() {
      //TODO: implement
      this.$emit('save-participation');
    }
  }
  </script>
  
  <style scoped lang="scss"></style>