<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>我的资料</h1>
      </div>
      <Card style="height: 283px;">
        <p slot="title">
          <Icon type="ios-pricetags-outline"></Icon>
          缩略图
        </p>
        <Upload ref="upload" @getimg="upload" :on-success="handleSuccess" :format="['jpg', 'jpeg', 'png']" :max-size="2048"
          multiple type="drag" name="file" action="https://upload-z2.qiniup.com" :data="{ token: token, imgUrl: imgUrl }">
          <div style="width:58px;height:58px;line-height:58    px;">
            <Icon type="camera" size="20"></Icon>
          </div>
        </Upload>
      </Card>
      <div style="display: flex; width: 200px; height: 200px;">
        <img :src="this.formData.avatar" id="test" alt="返回的图片" style="align-items: center;justify-content: center;align-content: center;"/>
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
          <FormItem label="性别" prop="sex">
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
          <FormItem label="性别" prop="deleted" hidden="true">
            <i-input v-model="formData.deleted" size="large"></i-input>
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
  import Distpicker from "v-distpicker";
  // import Qiniu from 'qiniu.js';
  import axios from "axios";

  export default {
    components: {
      // Upload
    },
    name: "UserInfo",
    //注入依赖
    inject: ["reload"],

    data() {
      return {
        backurl: "",
        imgUrl: "",
        upload: {},
        token: "",
        formData: {
          nickName: "",
          userName: "",
          email: "",
          phoneNumber: "",
          sex: "",
          avatar: "",
          createTime: "",
          updateTime: "",
          id: "",
          password: "",
          level: "",
          integral: ""
        },
        ruleInline: {
          userName: [{
            required: false,
            message: "请输入用户名称",
            trigger: "blur"
          }],
          nickName: [{
            required: false,
            message: "请输入昵称",
            trigger: "blur"
          }],
          sex: [{
            required: false,
            message: "请输入地址",
            trigger: "blur"
          }],
          email: [{
            required: false,
            message: "请输入邮箱",
            trigger: "blur"
          }],
          phone: [{
              required: false,
              message: "手机号不能为空",
              trigger: "blur"
            },
            {
              type: "string",
              pattern: /^1[3|4|5|7|8][0-9]{9}$/,
              message: "手机号格式出错",
              trigger: "blur"
            }
          ]
        }
      };
    },
    methods: {
      upload(url) {
        console.log("url")
        console.log(url)
        alert("从Upload组件获取的数据" + url);
        this.formData.avatar = url;
      },
      // beforeUpload(request) {
      //   console.log(request, "beforeUpload");
      //   // **注意这里的参数必须通过属性赋值，如果直接修改整个uploadParams是无效的。**
      //   // 上传之前设置上传参数,
      //   this.uploadParams.token = this.$store.state.upload_token;
      //   // 七牛response hash key的值自定义，后面如果需要浏览或者下载都需要这个地址，如果key不定义，那么七牛生成的key === hash的值
      //   this.uploadParams.key = request.name;
      //   // 整个上传肯定是一个组件，所以需要将值反馈给父界面
      //   this.$emit("completeFun", [request]);
      // },
      handleSuccess(request, file, list) {
        console.log(request.key);
        this.backurl = request.key;
        // console.log(file, list, "上传成功");
        // 这里就能拿到七牛返回的response信息（hash, key)然后拼接服务器地址，就可以访问了
        this.formData.avatar = "http://jximg.iboy.tech/" + request.key;

        let url = "http://jximg.iboy.tech/" + request.key;
        // this.imgUrl = url;
        document.getElementById("test").src = url;

        // upload(url);

        // $("#test").attr("src", "http://jximg.iboy.tech/" + request.key);
        // console.log(
        //   request,
        //   this.$store.getters.upload_url + file.name,
        //   "获取图片地址"
        // );
        // this.qiNiuUrl =
        // this.$emit("successFun", [file, list, this.imageUrl]);
        this.$emit("getimg", [url]);
      },
      //url 七牛部署的地址
      // bucket参数为七牛的空间名
      // this.$refs.imgLocal.files[0] 为上传的图片的名包含路径
      // res返回数据为一个key,通过key可以获取上传到七牛上的图片地址
      // 图片上传凭证

      // updateer() {
      //   //  bucket:‘public-image’(可直接拼接图片地址)
      //   axios.post('http://jximg.iboy.tech/', {
      //     bucket: 'public-image'
      //   }).then((res) => {
      //     const uploadToken = res.data.upToken;
      //     var data = new FormData();
      //     data.append('token', uploadToken);
      //     data.append('file', this.$refs.imgLocal.files[0]);
      //     axios({
      //       method: 'POST',
      //       url: 'https://upload-z2.qiniup.com',
      //       data: data,

      //       onUploadProgress: function(progressEvent) {
      //         var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
      //       },
      //     }).then((res) => {
      //       //  `http://publicimage.xq5.com/${response.data.key}`; （若bucket 参数为public-image则不需要下一步的图片地址获取可直接使用http://publicimage.xq5.com/ + ‘res.data.key’，拼接图片地址）
      //       console.log(res.data.key)
      //     })
      //   });
      // },
      // axios.post(url, {
      //   bucket: '',
      //   file_name: ''
      // }).then((res) => {
      //   if (Number(res.data.errno) === 0) {
      //     console.log(res.data.qrcodeURL)
      //   }
      // });

      editUser: function() {
        const _this = this;
        let user = _this.formData;
        _this.$http.put("/user/editUser", user).then(resp => {
          console.log(resp);
          if (resp.data.code == 200) {
            _this.$Message.info("成功修改", 3);
            _this.reload();
            _this.getInfo();
          }
        });
      },
      getInfo: function() {
        this.$http.get("/user/getUserInfo").then(resp => {
          if (resp.data.code == 200) {
            console.log("修改后");
            console.log(resp.data.data.avatar);
            this.formData = resp.data;
          }
        });
      },
      
      getToken: function() {

        this.$http
          .get('/qiniu/token')
          .then(resp => {
            if (resp.data.code == 200) {
              console.log(resp.data.data)
              this.token = resp.data.data.token
            }

          })
      },
    },
    components: {
      Distpicker
    },
    created: function() {

      this.$http.get("/user/getUserInfo").then(resp => {
        if (resp.data.code == 200) {
          console.log(resp.data.data.avatar);
          this.formData = resp.data.data;
        }
      });
      this.getToken();
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
