<template>
  <div class="info-form">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
    >
      <FormItem label="昵称" prop="name">
        <i-input
          v-model="formValidate.name"
          clearable
          size="large"
          placeholder="请输入你的昵称"
        ></i-input>
      </FormItem>
      <FormItem label="邮箱" prop="mail">
        <i-input
          v-model="formValidate.mail"
          clearable
          size="large"
          placeholder="请输入你的邮箱"
        ></i-input>
      </FormItem>
      <FormItem label="姓名" prop="username">
        <i-input
          v-model="formValidate.username"
          clearable
          size="large"
          placeholder="请输入你的真实姓名"
        ></i-input>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <RadioGroup v-model="formValidate.sex">
          <Radio label="男">男</Radio>
          <Radio label="女">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="密码" prop="password">
        <i-input
          type="password"
          v-model="formValidate.password"
          clearable
          size="large"
          placeholder="请输入你的密码"
        ></i-input>
      </FormItem>
      <FormItem label="确认密码" prop="repassword">
        <i-input
          type="password"
          v-model="formValidate.repassword"
          clearable
          size="large"
          placeholder="请再次输入你的密码"
        ></i-input>
      </FormItem>
      <Button
        type="error"
        size="large"
        long
        @click="handleSubmit('formValidate')"
        >注册</Button
      >
    </Form>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "InputInfo",
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formValidate.password) {
        callback(new Error("两次输入的密码不一样"));
      } else {
        callback();
      }
    };
    return {
      formValidate: {
        name: "",
        mail: "",
        password: "",
        repassword: "",
        username: "",
        sex: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ],
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA5]{2,4}$/,
            message: "请输入正确的姓名",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6",
            trigger: "blur"
          }
        ],
        repassword: [{ validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_SIGN_UP_SETP"]),
    ...mapActions(["addSignUpUser"]),
    handleSubmit(name) {
      const father = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          let userinfo = {
            name: this.formValidate.name,
            mail: this.formValidate.mail,
            username: this.formValidate.username,
            sex: this.formValidate.sex,
            password: this.formValidate.password,
            phone: this.$route.query.phone
          };
          this.$http.post("/register", userinfo).then(resp => {
            console.log(resp);
            if (resp.data.code === 200) {
              var res = resp.data;
              console.log(res.data);
              this.$Message.success(resp.data.msg);
               // this.addSignUpUser(userinfo);
                father.SET_SIGN_UP_SETP(2);
                this.$router.push({ path: '/SignUp/signUpDone' });
            } else {
              this.$Message.error(resp.data.msg);
            }
          });
        } else {
          this.$Message.error("注册失败");
        }
      });
    }
  },
  store
};
</script>

<style scoped>
.info-form {
  width: 90% !important;
}
</style>
