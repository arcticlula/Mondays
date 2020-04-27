<template>
  <div>
    <ul>
      <li v-for="color of colors" :key="color">
        <component
          style="width:35px;height:35px"
          :is="`icon-${color}`"
          :class="getClasses(color)"
          @click="$colorMode.preference = color"
        />
      </li>
    </ul>
    <p>
      <ColorScheme placeholder="..." tag="span">
        Modo:
        <b>{{ cores[$colorMode.preference] }}</b>
        <span v-if="$colorMode.preference === 'system'">
          (
          <i>Modo {{ cores[$colorMode.value] }} detectado.</i> )
        </span>
      </ColorScheme>
    </p>
  </div>
</template>

<script>
import IconSystem from '@/assets/icons/system.svg?inline'
import IconLight from '@/assets/icons/light.svg?inline'
import IconDark from '@/assets/icons/dark.svg?inline'
// import IconSepia from '@/assets/icons/sepia.svg?inline'

export default {
  components: {
    IconSystem,
    IconLight,
    IconDark
    // IconSepia
  },
  data() {
    return {
      colors: ['system', 'light', 'dark'],
      cores: { system: 'Sistema', light: 'Dia', dark: 'Noite' }
    }
  },
  methods: {
    getClasses(color) {
      // Does not set classes on ssr preference is system (because we know them on client-side)
      if (this.$colorMode.unknown) {
        return {}
      }
      return {
        prefered: color === this.$colorMode.preference,
        selected: color === this.$colorMode.value
      }
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
    padding: 5px;
  }
}
p {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 20px;
}
.feather {
  position: relative;
  top: 0px;
  cursor: pointer;
  padding: 7px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color-icon);
  margin: 0;
  border-radius: 5px;
  transition: all 0.1s ease;
  &:hover {
    top: -3px;
  }
  &.prefered {
    border-color: var(--color-icon);
    top: -3px;
  }
  &.selected {
    color: var(--color-icon);
  }
}
</style>
