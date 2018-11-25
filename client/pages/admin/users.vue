<template>
  <div>
    <search-columns 
      :params="formParams" 
      @fnChangeForm="fnSearch" />
    <table-template :params="tableParams" />
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
import { commonReq } from '@/api/commonReq'
export default {
  layout: 'layoutAdmin',
  components: {
    'table-template': TableTemplate,
    pagetion: Pagetion,
    'reload-spin': ReloadSpin,
    'search-columns': SearchColumns
  },
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
            key: 'userRank'
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
      }
    }
  },
  watch: {
    params: {
      handler(nv, ov) {
        this.reqData()
      },
      deep: true
    }
  },
  created() {
    this.params.pageNum = 1
  },
  methods: {
    async reqData() {
      let vm = this
      vm.tableParams.loading = true
      let result = await commonReq('getUsers', vm.params)
      if (result.data.success) {
        vm.tableParams.data = result.data.data.rows
        vm.tableParams.loading = false
        vm.pageParams.total = result.data.data.count
      } else {
        vm.tableParams.loading = false
        vm.utils.errorFn(result.data.message)
      }
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
      this.params.pageNum = data
    },
    fnPageSizeChange(data) {
      this.params.pageSize = data
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
