<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>添加收货地址</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="序号" prop="id" hidden>
            <i-input v-model="formData.id" size="large"></i-input>
          </FormItem>
          <FormItem label="收件人" prop="receiver">
            <i-input v-model="formData.receiver" size="large"></i-input>
          </FormItem>
          <FormItem label="收件地区" prop="address">
            <Distpicker :province="formData.province" :city="formData.city" :area="formData.area" @province="getProvince"
              @city="getCity" @area="getArea"></Distpicker>
          </FormItem>
          <FormItem label="收件地址" prop="street">
            <i-input v-model="formData.street" size="large"></i-input>
          </FormItem>
          <FormItem label="手机号码" prop="phone">
            <i-input v-model="formData.phone" size="large"></i-input>
          </FormItem>
          <FormItem label="邮政编码" prop="zipCode">
            <i-input v-model="formData.zipCode" size="large"></i-input>
          </FormItem>
          <FormItem label="用户序号" prop="uid" hidden="true">
            <i-input v-model="formData.uid" size="large"></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="primary" @click="addAddress">添加地址</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import Distpicker from 'v-distpicker';
  export default {
    name: 'AddAddress',
    data() {
      return {
        formData: {
          address: '',
          street: '',
          phone: '',
          zipCode: '',
          province: '湖北省',
          city: '宜昌市',
          area: '西陵区',
          uid: '',
          receiver: '',

        },
        ruleInline: {
          receiver: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }],
          street: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }],
          zipCode: [{
            required: true,
            message: '请输入邮政编码',
            trigger: 'blur'
          }],
          phone: [{
              required: true,
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
      getProvince(data) {
        this.formData.province = data.value;
      },
      getCity(data) {
        this.formData.city = data.value;
      },
      getArea(data) {
        this.formData.area = data.value;
      },
      addAddress: function() {
        const _this = this;
        _this.$http
          .post('/address/addAddress', this.formData)
          .then(resp => {
            console.log(resp)
            if (resp.data.code == 200) {
              console.log("成功")
              _this.$router.push({
                path: '/home/MyAddress'
              })
            }
          })
      }
    },

    components: {
      Distpicker
    },
    created: function() {
      const _this = this;
      let user = sessionStorage.getItem('loginInfo');
      let userin = (JSON.parse(user));
      _this.formData.uid = userin.id

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
