<template>
  <div>
    <court-SVG :playersHome="playersHome" :playersAway="playersAway" />
  </div>
</template>

<script>
import courtSVG from '~/assets/court.svg?inline'
import { mapGetters } from 'vuex'

export default {
	name: 'court',
	components: {
		courtSVG
	},
	computed: {
		...mapGetters('matches', ['playersHome', 'playersAway'])
	},
	mounted() {
		console.log(this.playersHome, this.playersAway)
		for (let i = 0; i < this.playersHome.length; i++) {
			document.getElementById(
				'playerName_H' + i
			).textContent = this.playersHome[i].nickname
		}
		for (let i = 0; i < this.playersAway.length; i++) {
			document.getElementById(
				'playerName_A' + i
			).textContent = this.playersAway[i].nickname
		}
	}
}
</script>

<style scoped>
.st0 {
	fill: #1d793e;
}
.st1 {
	fill: #ffffff;
}
.st2 {
	fill: #0f3134;
}
.st4 {
	font-size: 10px;
	margin-left: -10px;
}
.st5 {
	fill: #c33d47;
}
.st6 {
	opacity: 0.2;
	fill: #ba6a7a;
}
.st7 {
	opacity: 0.2;
	fill: #7e242e;
}
.st8 {
	fill: #c65864;
}
.st9 {
	fill: #94303a;
}
.st10 {
	fill: #5d1923;
}
.st11 {
	fill: none;
	stroke: #310e10;
	stroke-width: 0.75;
	stroke-miterlimit: 10;
}
.st12 {
	fill: #2096aa;
}
.st13 {
	opacity: 0.2;
	fill: #9dc9d3;
}
.st14 {
	opacity: 0.29;
	fill: #156d76;
}
.st15 {
	fill: #166d76;
}
.st16 {
	fill: #2a5756;
}
.st17 {
	fill: none;
	stroke: #0f3134;
	stroke-width: 0.75;
	stroke-miterlimit: 10;
}
#fora_1,
#fora_2,
#fora_3,
#fora_4,
#fora_5,
#casa_1,
#casa_2,
#casa_3,
#casa_4,
#casa_5 {
	cursor: pointer;
}
</style>
