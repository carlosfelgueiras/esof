<template>
  <div>
    <v-card class="table">
      <v-data-table
        :headers="headers"
        :items="profile.events"
        disable-pagination
        :hide-default-footer="true"
        :mobile-breakpoint="0"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RemoteServices from '@/services/RemoteServices';
import InstitutionProfile from '@/models/institution/InstitutionProfile';

@Component({})
export default class InstitutionProfileView extends Vue {
  profile: InstitutionProfile = new InstitutionProfile();

  headers: object = [
    {
      text: 'Decription',
      value: 'eventDescription',
      align: 'left',
      width: '75%',
    },
    {
      text: 'Date',
      value: 'eventDate',
      align: 'left',
      width: '25%',
    },
  ];

  async created() {
    await this.$store.dispatch('loading');

    try {
      this.profile = await RemoteServices.getInstitutionProfile(
        Number.parseInt(this.$route.params.id),
      );
    } catch (error) {
      await this.$store.dispatch('error', error);
    }

    console.log(this.profile);

    await this.$store.dispatch('clearLoading');
  }
}
</script>

<style lang="scss" scoped></style>
