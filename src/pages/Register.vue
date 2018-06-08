<template>
  <div id="register" style="background-color: #f2f2f2">
    <div style="background-color: #fff;padding-bottom: 10px;">
      <div style="margin-bottom: 10px;    margin-top: 15px;margin-bottom: -2px;margin-left: 20px;">
        <a href="#" class="logo"><img src="../static/img/logoBule.png"></a>
      </div>
    </div>
    <div class="layout h-log">
      <h3>已有账号，<router-link to="/login">立即登录</router-link></h3>
    </div>
    <div class="layout reg-main">
      <div class="reg-input">
        <h2>手机号免费注册</h2>
        <Form class="layui-form layui-form-pane" method="post" ref="registForm" :model="forms" :rules="ruleInline">
          <Row>
            <Col class="myCol" style="margin-left:0px;">
              <FormItem prop="cname">
                <!--<span>企&nbsp;业&nbsp;名&nbsp;称&nbsp;&nbsp;</span>-->
                <input class="queryTb" placeholder="请输入公司名称" style="height: 39px;width: 239px;" v-model="forms.cname">
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col class="myCol" style="margin-left:0px;">
              <FormItem prop="phone">
                <!--<span>手&nbsp;机&nbsp;号&nbsp;码&nbsp;&nbsp;&nbsp;</span>-->
                <input class="queryTb" placeholder="请输入手机号" style="height: 39px;width: 239px;" v-model="forms.phone">
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col class="myCol" style="margin-left:0px;">
              <FormItem prop="email">
                <!--<span>邮&nbsp;箱&nbsp;号&nbsp;码&nbsp;&nbsp;&nbsp;</span>-->
                <input class="queryTb" placeholder="请输入邮箱" style="height: 39px;width: 239px;" v-model="forms.email">
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col class="myCol" style="margin-left:0px;">
              <input type="button" name="type" @click="registSubmit"  class="mybutton0" style="width: 300px;height: 50px;" lay-submit lay-filter="register" value="免费注册"></input>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <div class="reg-footer" style="margin-bottom: 0px;">
      <p>©2018上海粒数网络科技有限公司  沪ICP备17046827号-2</p>
    </div>
  </div>
</template>

<script>
  const validateNumber = (rule, value, callback) => {
    if (isNaN(value)) {
      callback(new Error('请输入数字值'));
    } else {
      callback();
    }
  };
  const validateMobilel = (rule, value, callback) => {
    if (!(/^[1][0-9]{10}$/.test(value))) {
      callback(new Error('请输入正确的手机号码'));
    } else {
      callback();
    }
  };
  const validateEmail = (rule, value, callback) => {
    if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value))) {
      callback(new Error('请输入正确的邮箱'));
    } else {
      callback();
    }
  };
  export default {
    name: 'login',
    data() {
      return {
        loginModal: true,
        modal_loading: false,
        formValidate: {
          name: '',
          password: ''
        },
        forms: {
          cname: "",
          email: "",
          phone: "",
        },
        ruleInline: {
          email: [
            {required: true, message: '请输入邮件', trigger: 'blur'},
            {validator: validateEmail, trigger: 'blur'}
          ],
          cname: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: validateMobilel, trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      registSubmit() {
        let this_ = this;
        this.$refs.registForm.validate((valid) => {
          if (valid) {
            this.$api.regist(this.forms).then((r) => {
              if (r.result == '200') {
                this_.registModal = false;
                this.$Message.info({
                  content: "初始密码为：" + r.data,
                  duration: 0,
                  closable: true
                });
              } else {
                this.$Modal.error({
                  content: r.message,
                  duration: 0,
                  closable: true
                });
              }
            })
          }
        })
      },
      toRegister() {
        this.$router.push('/register')
      }
    }
  }
</script>
<style scoped>
  @import '../static/css/login/style.css';
</style>
