<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>我的资料</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="昵称" prop="nickName">
            <i-input v-model="formData.nickName" size="large"></i-input>
          </FormItem>
          <FormItem label="用户名称" prop="userName">
            <i-input v-model="formData.userName" size="large"></i-input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <i-input v-model="formData.email" size="large"></i-input>
          </FormItem>
          <FormItem label="手机号码" prop="phone">
            <i-input v-model="formData.phoneNumber" size="large"></i-input>
          </FormItem>
          <FormItem label="性别" prop="sex" >
            <i-input v-model="formData.sex" size="large"></i-input>
          </FormItem>
          <FormItem label="性别" prop="id" hidden="true">
            <i-input v-model="formData.id" size="large"></i-input>
          </FormItem>
          <FormItem label="性别" prop="avatar" hidden="true">
            <i-input v-model="formData.avatar" size="large"></i-input>
          </FormItem>
          <FormItem label="性别" prop="createTime" hidden="true">
            <i-input v-model="formData.createTime" size="large"></i-input>
          </FormItem>
          <FormItem label="性别" prop="updateTime" hidden="true">
            <i-input v-model="formData.updateTime" size="large"></i-input>
          </FormItem>
          <FormItem label="性别" prop="password" hidden="true">
            <i-input v-model="formData.password" size="large"></i-input>
          </FormItem>
          <FormItem label="性别" prop="level" hidden="true">
            <i-input v-model="formData.level" size="large"></i-input>
          </FormItem>
          <FormItem label="性别" prop="integral" hidden="true">
            <i-input v-model="formData.integral" size="large"></i-input>
          </FormItem>

        </Form>
      </div>
      <div class="add-submit">
        <!-- <Button type="primary" @click="editUser">保存修改</Button> -->
        <template>
          <i-button type="primary" @click="editUser">保存修改</i-button>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
  import Distpicker from 'v-distpicker';
  export default {
    name: 'UserInfo',
    data() {
      return {
        // uid: tihs.$route.query.id,

        formData: {
          nickName: '',
          userName: '',
          email: '',
          phoneNumber: '',
          sex: '',
          avatar: '',
          createTime: '',
          updateTime: '',
          id: '',
          password: '',
          level: '',
          integral: '',


        },
        ruleInline: {
          userName: [{
            required: false,
            message: '请输入用户名称',
            trigger: 'blur'
          }],
          nickName: [{
            required: false,
            message: '请输入昵称',
            trigger: 'blur'
          }],
          sex: [{
            required: false,
            message: '请输入地址',
            trigger: 'blur'
          }],
          email: [{
            required: false,
            message: '请输入邮箱',
            trigger: 'blur'
          }],
          phone: [{
              required: false,
              message: '手机号不能为空',
              trigger: 'blur'
            },
            {
              type: 'string',
              pattern: /^1[3|4|5|7|8][0-9]{9}$/,
              message: '手机号格式出错',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    methods: {
      editUser: function() {
        const _this = this;
        let user = _this.formData;
        _this.$http
          .put('/user/editUser', user)
          .then(resp => {
            console.log(resp)
            if (resp.data.code == 200) {

              _this.$Message.info('成功修改', 3);

            }
          });
      }
    },
    components: {
      Distpicker
    },
    created: function() {
      const _this = this;
      let user = sessionStorage.getItem('loginInfo');
      let userin = (JSON.parse(user));
      console.log(JSON.parse(user))
      _this.formData.nickName = userin.nickName;
       _this.formData.userName = userin.userName;
      _this.formData.phoneNumber = userin.phoneNumber;
      _this.formData.sex = userin.sex;
      _this.formData.email = userin.email;
      _this.formData.avatar = userin.avatar;
       _this.formData.id= userin.id;
      _this.formData.level = userin.level;
      _this.formData.password = userin.password;
      _this.formData.createTime = userin.createTime;
       _this.formData.updateTime = userin.updateTime;
       _this.formData.integral = userin.integral;
    }
  };
</script>

<style scoped>
  .add-container {
    margin: 15px auto;
    width: 60%;
    min-width: 600px;
  }

  .add-title {
    margin-bottom: 15px;
    text-align: center;
  }

  .add-submit {
    display: flex;
    justify-content: center;
  }
</style>
