<template>
  <v-card class="table">
    <v-data-table
      :headers="headers"
      :items="institutions"
      :search="search"
      disable-pagination
      :hide-default-footer="true"
      :mobile-breakpoint="0"
    >
      <template v-slot:top>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            class="mx-2"
          />
        </v-card-title>
      </template>
      <template v-slot:[`item.themes`]="{ item }">
        <v-chip v-for="theme in item.themes" v-bind:key="theme.id">
          {{ theme.name }}
        </v-chip>
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <v-tooltip bottom v-if="item.active">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              data-cy="profileInstitutionButton"
              :to="`/institution/${item.id}`"
              plain
              ><v-icon
                class="mr-2 action-button"
                color="blue"
                v-on="on"
                data-cy="profileInstitutionIcon"
                >fa-solid fa-right-to-bracket</v-icon
              >
            </v-btn>
          </template>
          <span>Go to institution profile</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RemoteServices from '@/services/RemoteServices';
import Institution from '@/models/institution/Institution';

@Component({
  components: {},
})
export default class InstitutionListView extends Vue {
  institutions: Institution[] = [];
  search: string = '';
  headers: object = [
    { text: 'Name', value: 'name', align: 'left', width: '50%' },
    {
      text: 'Active',
      value: 'active',
      align: 'center',
      width: '25%',
    },
    {
      text: 'Profile',
      value: 'action',
      align: 'center',
      sortable: false,
      width: '25%',
    },
  ];

  async created() {
    await this.$store.dispatch('loading');
    try {
      this.institutions = await RemoteServices.getInstitutions();
    } catch (error) {
      await this.$store.dispatch('error', error);
    }
    await this.$store.dispatch('clearLoading');
  }
}
</script>

<style lang="scss" scoped></style>
