<template>
  <div style="    overflow: hidden;">
    <div class="layout nav" style="   margin-bottom: -72px;  margin-left: 68px;width: 100%;">
      <div style="display:inline;float: left;">
        <a href="#" class="logo"><img src="../static/css/img/logo.png"></a>
      </div>
    <div style="margin-right: 322px;">
      <div class="nav-right">
                <a href="#" class="nav-right-login">登录</a>
                <router-link to="/register"><img src="../static/img/nav-reg.png"></router-link>
        </div>
        <ul>
          <li><a href="index.html">首页</a></li>
          <li><a href="product.html">产品</a></li>
          <li><a href="price.html">价格</a></li>
          <li><a href="api.html">API文档</a></li>
        </ul>
      </div>
    </div>
    <div class="login">
      <div class="layout">
        <div class="login-a">
          <a href="#"></a>
        </div>
        <div class="login-block">
          <h3>用户登录</h3>
          <div class="login-m">
            <form>
              <div>
                <Form id="loginForm" ref="forms" :model="forms" :rules="ruleValidate">
                  <Form-item prop="name">
                    <Input v-model="forms.name" placeholder="请输入姓名"/>
                  </Form-item>
                  <Form-item prop="password">
                    <Input v-model="forms.password" @keyup.native.enter="handleSubmit('formValidate')" type="password"
                           placeholder="请输入密码"/>
                  </Form-item>
                </Form>
              </div>
              <div slot="footer">
                <Button type="primary" style="    height: 37px;" size="large" long :loading="modal_loading" @click="handleSubmit('formValidate')">登录
                </Button>
              </div>
            </form>
          </div>
          <div class="login-reg">
            还没账号？<router-link to="register">点击注册</router-link>
          </div>
        </div>

      </div>
    </div>
    <div class="footer">
      <div class="layout">
        <div class="footer-t">
          <div class="footer-block">
            <h4>产品</h4>
            <a href="#">营销短信</a>
            <a href="#">系统通知</a>
            <a href="#">活动通知</a>
            <a href="#">验证码短息</a>
          </div>
          <div class="footer-block">
            <h4>支持</h4>
            <a href="#">API文档</a>
            <a href="#">使用说明</a>
            <a href="#">常见问题</a>
          </div>
          <div class="footer-block">
            <h4>关于</h4>
            <a href="#">联系我们</a>
            <p>电话：021-61075387</p>
            <p>邮箱：cppy@lishu-fd.com</p>
            <p>合作：cpyy@lishu-fd.com</p>
          </div>

        </div>
        <div class="footer-b">
          <p>©2018上海粒数网络科技有限公司 沪ICP备17046827号-2</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';

  export default {
    name: 'login',
    data() {
      return {
        loginModal: true,
        modal_loading: false,
        forms: {
          name: '',
          password: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码错误', trigger: 'blur'}
          ]

        }
      }
    },
    methods: {
      handleSubmit(name) { // login
        this.$refs.forms.validate((valid) => {
          this.modal_loading = true;
          setTimeout(() => {
            this.modal_loading = false;
            if (valid) {
              let _this = this;
              this.$api.login(_this.forms).then((r) => {
                if (r.result == '200') {
                  Cookies.set("sp_dmp_token",r.data.token_no);
                  Cookies.set("sp_dmp_uid",r.data.uid);
                  this.$router.push('/Mian');
                  location.reload();
                } else {
                  this.$Modal.error({
                  content: r.message,
                  duration: 0,
                  closable: true
                });
              }
              })
            } else {
              this.$Message.error('表单验证失败!');
            }
          }, 2000)
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
