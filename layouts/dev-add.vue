<template>
  <div>
    <b-row>
      <b-col class="mr-2">
        <nuxt-link to="addPlayer">addPlayer</nuxt-link>
      </b-col>
      <b-col class="mr-2">
        <nuxt-link to="addTeam">addTeam</nuxt-link>
      </b-col>
      <b-col class="mr-2">
        <nuxt-link to="addMatch">addMatch</nuxt-link>
      </b-col>
      <b-col class="mr-2">
        <nuxt-link :to="{ path: 'addGoal', query: { match :'uVcMX348dTAEBeCjtmFg' }}">addGoal</nuxt-link>
      </b-col>
    </b-row>
    <nuxt />
  </div>
</template>