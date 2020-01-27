<template>
  <div />
</template>
<script>
import { parseTime } from '@/utils/index'

export default {
  props: {
    instiId: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    formData: {
      targetGrades: [
        { itemName: 'TG', seq: 1, itemValue: '유치원', itemProperty: '0', targetLevels: [{ gdn: 'AG', codeNo: 7, useYn: false, disp: '유치원' }] },
        { itemName: 'TG', seq: 2, itemValue: '초등', itemProperty: '0',
          targetLevels: [
            { gdn: 'AG', codeNo: 8, useYn: false, disp: '초1' },
            { gdn: 'AG', codeNo: 9, useYn: false, disp: '초2' },
            { gdn: 'AG', codeNo: 10, useYn: false, disp: '초3' },
            { gdn: 'AG', codeNo: 11, useYn: false, disp: '초4' },
            { gdn: 'AG', codeNo: 12, useYn: false, disp: '초5' },
            { gdn: 'AG', codeNo: 13, useYn: false, disp: '초6' }
          ]
        },
        { itemName: 'TG', seq: 3, itemValue: '중등', itemProperty: '0',
          targetLevels: [
            { gdn: 'AG', codeNo: 14, useYn: false, disp: '중1' },
            { gdn: 'AG', codeNo: 15, useYn: false, disp: '중2' },
            { gdn: 'AG', codeNo: 16, useYn: false, disp: '중3' }
          ]
        },
        { itemName: 'TG', seq: 4, itemValue: '고등', itemProperty: '0',
          targetLevels: [
            { gdn: 'AG', codeNo: 17, useYn: false, disp: '고1' },
            { gdn: 'AG', codeNo: 18, useYn: false, disp: '고2' },
            { gdn: 'AG', codeNo: 19, useYn: false, disp: '고3' }
          ]
        },
        { itemName: 'TG', seq: 5, itemValue: 'N수', itemProperty: '0', targetLevels: [{ gdn: 'AG', codeNo: 20, useYn: false, disp: 'N수' }] }
      ]
    }
  }),
  watch: {

  },
  mounted: function() {
  },
  methods: {

  }
}
</script>
<style scoped>
.tg-row {
  height: 30px;
}
.tg-row-10 {
  height: 10px;
}
.tg-t-text {
    font-size: 110%;
    color: indigo;
}
</style>
