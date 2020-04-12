<template>
  <div>
    <b-row>
      <b-col cols="12" class="mr-2">
        <nuxt-link :to="{ name: 'addPlayer'}">
          <b-btn variant="outline-primary" size="sm">addPlayer</b-btn>
        </nuxt-link>
        <nuxt-link :to="{ name: 'addTeam'}">
          <b-btn variant="outline-primary" size="sm">addTeam</b-btn>
        </nuxt-link>
        <nuxt-link :to="{ name: 'addMatch'}">
          <b-btn variant="outline-primary" size="sm">addMatch</b-btn>
        </nuxt-link>
        <nuxt-link :to="{ name: 'addGoal', query: { match :'ERbdmCr6sb4fdGmttXU6' }}">
          <b-btn variant="outline-primary" size="sm">addGoal</b-btn>
        </nuxt-link>
      </b-col>
    </b-row>
    <nuxt />
  </div>
</template>