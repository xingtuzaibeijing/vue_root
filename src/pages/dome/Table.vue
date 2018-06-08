<template>
  <div class="list">
    <Row>
      <Col>
        <Card>
          <Table  :data="listData" :columns="columns1" size="large"></Table>
          <Page :total="100" show-sizer show-elevator show-total @on-change="pageChange" style="margin-top: 10px"
                @on-page-size-change="PageSizeChange"></Page>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    name: 'list',
    components: {},
    data () {
      return {
        showHeader: true, // 是否显示表头 @:show-header
        fixedHeader: false, // 是否固定表头 @:height
        tableSize: 'small', // @:size
        params: {
          page_size: 10,
          page_num: 1
        },
        listData: [], // @:data
        columns1: [
          { // @:columns
            type: 'selection', // 开启checkbox
            width: 60,
            align: 'center'
          }
          ,{
            title: '显示状态',
            key: 'show_status_label'
          }
          ,{
            title: '产品名称',
            key: 'product_name'
          }
          ,{
            title: 'url',
            key: 'url'
          }
          ,{
            title: '轮播图地址',
            key: 'img_path'
          }
          ,{
            title: '轮播类型',
            key: 'banner_type_label'
          }
        ]
      }
    },
    watch: {
      /**
       * @params 监听参数变化重新获取数据
       * */
      params: {
        handler (val) {
          this.getData(val)
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      /**
       * 刷新页面请求
       * */
      refresh () {
        this.getData(this.params)
      },
      /**
       * @params:category 分类 page：页码 limit:条数
       * */
      getData (params) {
        let _this = this
        this.$api.orderList(params).then(function (r) {
          _this.listData = r.data.content
        })
      },
      /**
       * @on-change 页码改变的回调，返回改变后的页码
       * */
      pageChange (page) {
        this.params.page_num = page
      },
      /**
       * @on-page-size-change 切换每页条数时的回调，返回切换后的每页条数
       * */
      PageSizeChange (limit) {
        this.params.page_size = limit
      }
    },
    created () {
      this.getData(this.params)
    }
  }
</script>
