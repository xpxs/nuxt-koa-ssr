<template>
  <div>
    <Upload
      :headers="headers"
      :on-success="handleSuccess"
      multiple
      action="http://127.0.0.1:3000/oauth/upload">
      <Button icon="ios-cloud-upload-outline">选择图片</Button>
    </Upload>
  </div>
</template>
<script>
export default {
  layout: 'layoutAdmin',
  components: {},
  data() {
    return {
      headers: { authorization: '' }
    }
  },
  mounted() {
    console.log('this.$store.state.token', this.$store.state.token)
    this.headers['Request-Time'] = this.$moment().valueOf()
    this.headers.authorization = 'Bearer ' + this.$store.state.token
  },
  methods: {
    handleUpload(file) {
      console.log('file', file)
      this.file = file
      return false
    },
    upload() {
      this.loadingStatus = true
      setTimeout(() => {
        this.file = null
        this.loadingStatus = false
        this.$Message.success('Success')
      }, 1500)
    },
    handleSuccess(response, file, fileList) {
      console.log('fileList', fileList)
      console.log('file', file)
      console.log('response', response)
    }
  }
}
</script>
