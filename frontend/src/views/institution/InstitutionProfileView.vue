<template>
  <div class="pt-4">
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="align-end text-white"
        height="200"
        src="https://t4.ftcdn.net/jpg/05/12/76/37/360_F_512763745_aH8NST04ptKP863Tz0QHuj1FdHGqxmo5.jpg"
        cover
      >
        <v-card-title>{{profile.name}}</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4"> Founded in <b>{{(new Date(profile.creationDate)).toLocaleDateString()}}</b> </v-card-subtitle>

      <v-card-text>
        <div>NIF: {{profile.nif}}</div>
        <div>E-mail: {{ profile.email }}</div>
      </v-card-text>
    </v-card>
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
