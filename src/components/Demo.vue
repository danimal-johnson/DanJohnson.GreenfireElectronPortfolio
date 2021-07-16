<template>
  <div>
    <VueQr3
          :width="200"
          :height="200"
          data="https://diadal.com.ng"
          :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :dotsOptions="{
            type: 'dots',
            color: '#26249a',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#26249a' },
                { offset: 1, color: '#26249a' },
              ],
            },
          }"
          :backgroundOptions="{ color: '#ffffff' }"
          image="https://diadal.com.ng/icons/favicon-96x96.png"
          :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
          fileExt="png"
          :download="true"
          myclass="my-qur"
          imgclass="img-qr"
          downloadButton="my-button"
          :downloadOptions="{ name: 'vqr', extension: 'png' }"
        >
    </VueQr3>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  // onBeforeUnmount,
  defineAsyncComponent
} from 'vue'


export default defineComponent({
  name: 'VueQr3',
  components: {
    VueQr3: defineAsyncComponent(() =>
      Promise.resolve(import('vue3-qr-code-styling'))
    )
  },
  setup () {
    return {
    }
  }
})
</script>

<style>

</style>