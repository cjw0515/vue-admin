export function dataDivider() {
  this.additionData = {
    OT: [],
    TG: [],
    AG: [],
    TP: []
  }
  this.detailData = {
    AG: [],
    OS: [],
    R1: [],
    R2: [],
    R3: [],
    R4: [],
    R5: []
  }
  this.result = {
    OTData: {},
    TGData: {},
    SJData: {},
    TPData: {}
  }
  this.dispatchData = function(detail, addition) {
    addition.forEach(o => {
      this.additionData[o.itemName].push(o)
    })
    detail.forEach(o => {
      this.detailData[o.gbn].push(o)
    })

    this.makeOTData()
    this.makeTGData()
    this.makeSJData()
    this.makeTPData()

    return this
  }
  this.mergeData = function(originalData) {
    if (typeof originalData !== 'object') return false

    const tmpObj = {}
    Object.keys(this.result).forEach(o => {
      if (!(Object.entries(this.result[o]).length === 0 && this.result[o].constructor === Object)) {
        tmpObj[o] = this.result[o]
      }
    })

    return { ...originalData, ...tmpObj }
  }
  this.makePrefixedTime = function(timeText) {
    let res = []
    if (!timeText || timeText.indexOf(',') === -1) return res

    const sh = timeText.split(',')[0].split('.')[0]
    const sm = timeText.split(',')[0].split('.')[1]
    const eh = timeText.split(',')[1].split('.')[0]
    const em = timeText.split(',')[1].split('.')[1]

    res = [new Date(2020, 1, 1, sh, sm), new Date(2020, 1, 1, eh, em)]

    return res
  }
  this.makeOTData = function() {
    const data = this.additionData.OT
    if (data.length <= 0) {
      return {
        openFlexYn: 0,
        openFlexTime: { itemName: 'OT', useYn: true, seq: 8, itemValue: '동일시간', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 9, 0), new Date(2020, 1, 1, 23, 0)] },
        daysOT: [
          { openStat: true, itemName: 'OT', useYn: true, seq: 1, itemValue: '월', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', useYn: true, seq: 2, itemValue: '화', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', useYn: true, seq: 3, itemValue: '수', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', useYn: true, seq: 4, itemValue: '목', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', useYn: true, seq: 5, itemValue: '금', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] },
          { openStat: true, itemName: 'OT', useYn: true, seq: 6, itemValue: '토', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 10, 30), new Date(2020, 1, 1, 23, 30)] },
          { openStat: false, itemName: 'OT', useYn: true, seq: 7, itemValue: '일', itemProperty: '', prefixdTime: [new Date(2020, 1, 1, 14, 0), new Date(2020, 1, 1, 23, 0)] }
        ]
      }
    }

    let flexData = []
    let daysOT = []

    data.forEach(o => {
      if (o.seq == 8 && o.itemName === 'OT') {
        flexData = { ...o, prefixdTime: this.makePrefixedTime(o.itemProperty || '09.00,23.00') }
      } else {
        daysOT = [
          ...daysOT,
          {
            ...o,
            openStat: o.itemProperty != '0',
            prefixdTime: this.makePrefixedTime(o.itemProperty)
          }
        ]
      }
    })

    daysOT.sort((a, b) => {
      if (a.seq > b.seq) return 1
      if (a.seq < b.seq) return -1
      return 0
    })

    const res = {
      openFlexYn: 0,
      openFlexTime: flexData,
      daysOT: daysOT
    }
    this.result.OTData = res

    return res
  }
  this.makeTGData = function() {
    const TGData = this.additionData.TG
    const AGData = this.detailData.AG
    if (TGData.length <= 0) return

    const res = []
    const selectLevels = codeNo => {
      let text = {}
      switch (codeNo) {
        case 7:
          text = { key: '유치원', disp: '유치원' }
          break
        case 8:
          text = { key: '초등', disp: '초1' }
          break
        case 9:
          text = { key: '초등', disp: '초2' }
          break
        case 10:
          text = { key: '초등', disp: '초3' }
          break
        case 11:
          text = { key: '초등', disp: '초4' }
          break
        case 12:
          text = { key: '초등', disp: '초5' }
          break
        case 13:
          text = { key: '초등', disp: '초6' }
          break
        case 14:
          text = { key: '중등', disp: '중1' }
          break
        case 15:
          text = { key: '중등', disp: '중2' }
          break
        case 16:
          text = { key: '중등', disp: '중3' }
          break
        case 17:
          text = { key: '고등', disp: '고1' }
          break
        case 18:
          text = { key: '고등', disp: '고2' }
          break
        case 19:
          text = { key: '고등', disp: '고3' }
          break
        case 20:
          text = { key: 'N수', disp: 'N수' }
          break
        default:
      }
      return text
    }

    TGData.forEach(o => {
      res.push({
        ...o,
        targetLevels: AGData.reduce((r, a) => {
          const tmp = selectLevels(a.codeNo)
          if (tmp.key === o.itemValue) {
            r.push({
              ...a,
              disp: tmp.disp
            })
          }
          return r
        }, [])
      })
    })

    this.result.TGData = res

    return res
  }
  this.makeSJData = function() {
    const dataKey = ['OS', 'R1', 'R2', 'R3', 'R4', 'R5']

    const chkRes = dataKey.every(o => {
      return this.detailData[o].length === 0
    })
    const data = {}
    if (chkRes) return data

    const selectLabel = code => {
      let text = ''
      switch (code) {
        case 'OS':
          text = '개설 과목'
          break
        case 'R1':
          text = '공통'
          break
        case 'R2':
          text = '초등'
          break
        case 'R3':
          text = '중등'
          break
        case 'R4':
          text = '고등'
          break
        case 'R5':
          text = 'N수'
          break
        default:
      }
      return text
    }

    dataKey.forEach(o => {
      data[`${o}data`] = {
        disp: `${o}data`,
        label: selectLabel(o),
        list: this.detailData[o]
      }
    })

    this.result.SJData = data

    return data
  }
  this.makeTPData = function() {
    const data = this.additionData.TP

    if (data.length <= 0) return
    this.result.TPData = data[0]

    return data[0]
  }
}

export function generateInstiData(data, format) {
  let tmpObj = {}
  let rest = []
  if (data === null) return rest
  const chkFormat = (formatKeys, o) => {
    let rest = false
    const resObj = {}
    rest = formatKeys.every(key => {
      return o[key] !== undefined
    })
    if (rest) {
      formatKeys.forEach(key => {
        resObj[key] = o[key]
      })
    }

    return resObj
  }
  //
  const chk = data => {
    if (typeof data === 'object') {
      return chkFormat(format, data)
    } else {
      return {}
    }
  }

  if (Array.isArray(data)) {
    data.forEach(o => {
      tmpObj = chk(o)
      if (
        !(Object.entries(tmpObj).length === 0 && tmpObj.constructor === Object)
      ) {
        rest = [...rest, tmpObj]
      } else {
        const tmpv = generateInstiData(o, format)
        if (tmpv) {
          rest = [...rest, ...tmpv]
        }
      }
    })
  } else if (typeof data === 'object') {
    tmpObj = chk(data)
    if (
      !(Object.entries(tmpObj).length === 0 && tmpObj.constructor === Object)
    ) {
      rest = [...rest, tmpObj]
    } else {
      Object.keys(data).forEach(key => {
        const tmpv = generateInstiData(data[key], format)
        if (tmpv) {
          rest = [...rest, ...tmpv]
        }
      })
    }
  }
  return rest
}

