'use strict'
export class UserData {
  // 构造
  constructor(data) {
    this.data = data
  }
  list() {
    let obj = {
      rows: [],
      count: ''
    }
    this.data.rows.forEach((value, index) => {
      obj.rows.push({
        userId: value.user_id,
        userName: value.user_name,
        userSex: value.user_sex,
        userPhone: value.user_phone,
        userQQ: value.user_qq,
        userEmail: value.user_email,
        userAddress: value.user_address,
        userFreeze: value.user_freeze,
        userRankId: value.user_rank_id
      })
    })
    obj.count = this.data.count
    return obj
  }
  info() {
    return {
      userId: this.data.user_id,
      userName: this.data.user_name,
      userSex: this.data.user_sex,
      userPhone: this.data.user_phone,
      userQQ: this.data.user_qq,
      userEmail: this.data.user_email,
      userAddress: this.data.user_address,
      userFreeze: this.data.user_freeze,
      userRankId: this.data.user_rank_id
    }
  }
}

export class ResDataTpl {
  data() {
    return {
      success: false,
      message: '',
      data: null
    }
  }
}
