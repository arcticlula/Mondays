<template>
  <div>
    <b-row>
      <b-col cols="12" class="mr-2">
        <nuxt-link to="addPlayer">
          <b-button variant="outline-primary" size="sm">addPlayer</b-button>
        </nuxt-link>
        <nuxt-link to="addTeam">
          <b-button variant="outline-primary" size="sm">addTeam</b-button>
        </nuxt-link>
        <nuxt-link to="addMatch">
          <b-button variant="outline-primary" size="sm">addMatch</b-button>
        </nuxt-link>
        <nuxt-link :to="{ path: 'addGoal', query: { match :'uVcMX348dTAEBeCjtmFg' }}">
          <b-button variant="outline-primary" size="sm">addGoal</b-button>
        </nuxt-link>
      </b-col>
    </b-row>
    <nuxt />
  </div>
</template>