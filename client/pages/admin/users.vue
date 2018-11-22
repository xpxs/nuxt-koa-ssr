<template>
  <div>
    <search-columns 
      :params="formParams" 
      @fnChangeForm="fnSearch" />
    <table-template :params="tableParams" />
    <pagetion :params="pageParams" />
  </div>
</template>
<script>
import Pagetion from '~/components/common/Pagetion.vue'
import ReloadSpin from '~/components/common/ReloadSpin.vue'
import SearchColumns from '~/components/admin/SearchColumns.vue'
import TableTemplate from '~/components/admin/TableTemplate.vue'
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
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Province',
            key: 'province'
          },
          {
            title: 'City',
            key: 'city'
          },
          {
            title: 'Address',
            key: 'address'
          },
          {
            title: 'Postcode',
            key: 'zip'
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
        data: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            province: 'America',
            city: 'New York',
            zip: 100000
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'Washington, D.C. No. 1 Lake Park',
            province: 'America',
            city: 'Washington, D.C.',
            zip: 100000
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            province: 'Australian',
            city: 'Sydney',
            zip: 100000
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            province: 'Canada',
            city: 'Ottawa',
            zip: 100000
          }
        ],
        loading: false
      },
      pageParams: {
        total: 100,
        size: 'small',
        showElevator: true,
        showSizer: true,
        showTotal: true
      }
    }
  },
  mounted() {},
  methods: {
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
