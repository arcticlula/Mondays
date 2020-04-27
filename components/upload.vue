<template>
  <b-row>
    <b-col cols="12" class="mt-2">
      <b-card no-body style="height: 100%;">
        <div class="card-header">
          <b-col cols="12" class="p-0">
            <!-- <b-row>
                  <b-col cols="4">
                    <label>Jogo</label>
                  </b-col>
                  <b-col cols="4" class="text-center">
                    <label
                      class="d-none d-sm-inline d-md-inline d-lg-inline d-xl-inline"
                    >Golos &amp; Assistências</label>
                    <label class="d-inline d-sm-none d-md-none d-lg-none d-xl-none">
                      <i class="dl dl-bola"></i> &amp;
                      <i class="dl dl-ass"></i>
                    </label>
                  </b-col>
                  <b-col cols="4" class="text-right">
                    <label>Resultado</label>
                  </b-col>
            </b-row>-->
            <b-row>
              <b-col>Escolher imagem do jogador:</b-col>
            </b-row>
          </b-col>
        </div>
        <b-card-body class="p-2">
          <b-row>
            <b-col class="mb-3">
              <b-form-file
                v-model="file"
                :state="Boolean(file)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                accept="image/*"
                size="sm"
              ></b-form-file>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="9" lg="10" style="align-self: center;">
              <b-progress :value="uploadValue" max="100"></b-progress>
              <!-- <img class="preview" :src="player.picture" /> -->
            </b-col>
            <b-col cols="3" lg="2" style="align-self: center; text-align: right;">
              <b-btn variant="outline-primary" size="sm" @click="onUpload">Upload</b-btn>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import { storage } from '../plugins/firebase'
import { mapState, mapActions } from 'vuex'
import { isEmpty } from 'lodash'

export default {
  name: 'Upload',
  props: { player: Object },
  data() {
    return {
      file: null,
      uploadValue: 0
    }
  },
  computed: {},
  methods: {
    ...mapActions(['checkUser']),
    ...mapActions('players', ['setPlayerPicture']),
    // previewImage(event) {
    // 	this.uploadValue = 0
    // 	this.imageData = event.target.files[0]
    // 	console.log(this.imageData)
    // },
    onUpload() {
      console.log(this.file, Boolean(this.file))
      if (Boolean(this.file)) {
        const storageRef = storage
          .ref(`players/${this.player.id}`)
          .put(this.file)
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            console.log(error.message)
          },
          () => {
            this.uploadValue = 100
            storageRef.snapshot.ref.getDownloadURL().then(async (url) => {
              await this.setPlayerPicture({
                id: this.player.id,
                url: url
              })
              this.$noty.success('Upload da imagem feito com sucesso!')
              await this.checkUser()
            })
          }
        )
      } else {
        this.$noty.error('Escolher ficheiro primeiro!')
      }
    }
  }
}
</script>
<style scoped="">
img.preview {
  width: 200px;
}
</style>