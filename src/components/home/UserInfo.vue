<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>我的资料</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="昵称" prop="name">
            <i-input v-model="formData.name" size="large"></i-input>
          </FormItem>
          <FormItem label="收件地址" prop="email">
            <i-input v-model="formData.email" size="large"></i-input>
          </FormItem>
          <FormItem label="手机号码" prop="phone">
            <i-input v-model="formData.phone" size="large"></i-input>
          </FormItem>
          <FormItem label="邮政编码" prop="sex">
            <i-input v-model="formData.sex" size="large"></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary" @click="editUser">保存修改</Button>
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
          name: '',
          email: '',
          phone: '',
          sex: '',

        },
        ruleInline: {
          name: [{
            required: false,
            message: '请输入姓名',
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
      editUser:function(){
        const _this = this;
        let params = _this.formData;
        _this.$http
        .get('/user/updata',params)
        .then(resp =>{
          console.log(resp)
        }
        )
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
      _this.formData.name = userin.nickName;
      _this.formData.phone = userin.phoneNumber;
      _this.formData.sex = userin.sex;
      _this.formData.email = userin.email;
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
