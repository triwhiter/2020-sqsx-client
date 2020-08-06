<template>
  <!-- 登录页面 -->
  <div>
    <Row class="container">
      <i-col span="13" offset="2" class="login-img-box">
        <img src="static/img/sale.jpg" alt="" />
      </i-col>
      <i-col span="7" class="login-box">
        <div class="login-container">
          <div class="login-header">
            <p>欢迎登录</p>
          </div>
          <div class="form-box">
            <Form ref="formInline" :model="formDate" :rules="ruleInline">
              <FormItem prop="username">
                <i-input
                  type="text"
                  v-model="formDate.username"
                  clearable
                  size="large"
                  placeholder="手机号"
                >
                  <Icon type="person" slot="prepend"></Icon>
                </i-input>
              </FormItem>
              <FormItem prop="password">
                <i-input
                  type="password"
                  v-model="formDate.password"
                  clearable
                  size="large"
                  placeholder="密码"
                >
                  <Icon type="ios-locked-outline" slot="prepend"> </Icon>
                </i-input>
              </FormItem>
              <FormItem>
                <Button
                  type="error"
                  size="large"
                  @click="handleSubmit('formInline')"
                  long
                  >登录</Button
                >
              </FormItem>
            </Form>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Login",
  data () {
    return {
      formDate: {
        username: "",
        password: ""
      },
      ruleInline: {
        username: [
          { required: true, message: "请输入电话号码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码不能少于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USER_LOGIN_INFO"]),
    ...mapActions(["login"]),
    handleSubmit(name) {
      let father = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http.post("/login", this.formDate).then(response => {
            let res = response.data;
            console.log(res);
            if (res.code === 200) {
              this.$Message.success(res.msg);
              this.login(res.data);
              father.$router.push("/");
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请填写正确的用户名或密码");
        }
      });
    }
  },
  store
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  height: 485px;
  background-color: #fff;
}
.login-img-box {
  height: 485px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-img-box > img {
  width: 68%;
}
.login-box {
  height: 485px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 80%;
  height: 280px;
  border: #ed3f14 solid 1px;
}
.login-header {
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 5px;
  color: #fff;
  background-color: #ed3f14;
}
.form-box {
  width: 80%;
  margin: 30px auto;
}
</style>
