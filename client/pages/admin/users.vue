<template>
  <div>
    <search-columns 
      :params="formParams" 
      @fnChangeForm="fnSearch" />
    <table-template :params="formatTableParams" />
    <pagetion 
      :params="pageParams"
      @fnPageSizeChange="fnPageSizeChange" 
      @fnPageNumChange="fnPageNumChange"/>
  </div>
</template>
<script>
import Pagetion from '~/components/common/Pagetion.vue'
import ReloadSpin from '~/components/common/ReloadSpin.vue'
import SearchColumns from '~/components/admin/SearchColumns.vue'
import TableTemplate from '~/components/admin/TableTemplate.vue'
import { reqDataMixins } from '~/mixins'
export default {
  layout: 'layoutAdmin',
  components: {
    'table-template': TableTemplate,
    pagetion: Pagetion,
    'reload-spin': ReloadSpin,
    'search-columns': SearchColumns
  },
  mixins: [reqDataMixins],
  data() {
    return {
      formParams: {
        items: [
          {
            label: '用户名',
            prop: 'userName',
            type: 'text',
            placeholder: '用户名'
          },
          {
            label: '时间',
            prop: 'date',
            type: 'daterange',
            placeholder: '时间'
          },
          {
            label: '选择',
            prop: 'chang',
            type: 'select',
            placeholder: '时间',
            opitions: [
              {
                value: 'New York',
                label: 'New York'
              },
              {
                value: 'London',
                label: 'London'
              },
              {
                value: 'Sydney',
                label: 'Sydney'
              },
              {
                value: 'Ottawa',
                label: 'Ottawa'
              },
              {
                value: 'Paris',
                label: 'Paris'
              },
              {
                value: 'Canberra',
                label: 'Canberra'
              }
            ]
          }
        ]
      },
      tableParams: {
        columns: [
          {
            title: '用户名',
            key: 'userName'
          },
          {
            title: '性别',
            key: 'userSex'
          },
          {
            title: '手机号',
            key: 'userPhone'
          },
          {
            title: 'QQ',
            key: 'userQQ'
          },
          {
            title: '住址',
            key: 'userAddress'
          },
          {
            title: '邮箱',
            key: 'userEmail'
          },
          {
            title: '用户级别',
            key: 'userRankName'
          },
          {
            title: '是否禁用',
            key: 'userFreeze',
            render: (h, params) => {
              return h(
                'i-switch',
                {
                  props: {
                    type: 'primary',
                    value: params.row.userFreeze === 1
                  },
                  on: {
                    'on-change': value => {
                      this.fnChangeUserFreeze(value, params.row)
                    }
                  }
                },
                [
                  h('span', {
                    slot: 'open',
                    domProps: {
                      innerHTML: '启'
                    }
                  }),
                  h('span', {
                    slot: 'close',
                    domProps: {
                      innerHTML: '禁'
                    }
                  })
                ]
              )
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.fnClunmButton(params.index, 1)
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.fnClunmButton(params.index, 0)
                      }
                    }
                  },
                  '删除'
                )
              ])
            }
          }
        ],
        data: [],
        loading: true
      },
      pageParams: {
        total: 0,
        size: 'small',
        showElevator: true,
        showSizer: true,
        showTotal: true
      },
      params: {
        pageNum: 0,
        pageSize: 10
      },
      userFreezeParams: {
        userId: '',
        userFreeze: ''
      }
    }
  },
  computed: {
    formatTableParams() {
      let vm = this
      vm.tableParams.data.forEach((v, i) => {
        v.userRankName = vm.utils.rankName(v.userRankId)
      })
      return vm.tableParams
    }
  },
  watch: {
    params: {
      handler(nv, ov) {
        let vm = this
        vm.tableParams.loading = true
        vm.reqData({
          url: 'getUsers',
          params: 'params',
          success: res => {
            vm.tableParams.data = res.data.data.rows
            vm.tableParams.loading = false
            vm.pageParams.total = res.data.data.count
          },
          error: err => {
            vm.utils.catchErrorStatus(err.status, err.data.message, () => {
              vm.tableParams.loading = false
            })
          }
        })
      },
      deep: true
    }
  },
  created() {
    this.params.pageNum = '1'
  },
  methods: {
    fnChangeUserFreeze(value, row) {
      let vm = this
      vm.userFreezeParams.userId = row.userId
      if (value) {
        vm.userFreezeParams.userFreeze = 1
      } else {
        vm.userFreezeParams.userFreeze = 0
      }
      vm.reqData({
        url: 'updateUser',
        params: 'userFreezeParams',
        success: res => {
          vm.utils.messageFn(res.data.message)
          console.log('res', res)
        },
        error: err => {
          vm.utils.errorFn(err.data.message, () => {})
        }
      })
    },
    /**
     * [切换页码]
     * @Author   tanpeng
     * @DateTime 2018-11-24
     * @version  [v1.0]
     * @param    {[type]}   data [description]
     * @return   {[type]}        [description]
     */
    fnPageNumChange(data) {
      let vm = this
      vm.params.pageNum = data
    },
    //切换每页数量
    fnPageSizeChange(data) {
      let vm = this
      vm.params.pageSize = data
    },
    /**
     * [fnSearch 搜索返回数据,在里面处理与后台的数据交互]
     * @Author   tanpeng
     * @DateTime 2018-11-15
     * @version  [v1.0]
     * @param    {[type]}   data [子组件返回的数据]
     * @return   {[type]}        [description]
     */
    fnSearch(data) {
      let vm = this
      vm.tableParams.loading = true
      setTimeout(function() {
        vm.tableParams.loading = false
      }, 2000)
      console.log('data', data)
    },
    /**
     * [show 表格每行的按钮方法]
     * @Author   tanpeng
     * @DateTime 2018-11-15
     * @version  [v1.0]
     * @param    {[type]}   index [description]
     * @return   {[type]}         [description]
     */
    fnClunmButton(index, type) {
      if (type === 0) {
        this.tableParams.data.splice(index, 1)
      }
    }
  }
}
</script>
