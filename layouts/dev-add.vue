<template>
  <div>
    <b-row>
      <b-col cols="12" class="mr-2">
        <nuxt-link :to="{ name: 'addPlayer'}">
          <b-button variant="outline-primary" size="sm">addPlayer</b-button>
        </nuxt-link>
        <nuxt-link :to="{ name: 'addTeam'}">
          <b-button variant="outline-primary" size="sm">addTeam</b-button>
        </nuxt-link>
        <nuxt-link :to="{ name: 'addMatch'}">
          <b-button variant="outline-primary" size="sm">addMatch</b-button>
        </nuxt-link>
        <nuxt-link :to="{ name: 'addGoal', query: { match :'ERbdmCr6sb4fdGmttXU6' }}">
          <b-button variant="outline-primary" size="sm">addGoal</b-button>
        </nuxt-link>
      </b-col>
    </b-row>
    <nuxt />
  </div>
</template>