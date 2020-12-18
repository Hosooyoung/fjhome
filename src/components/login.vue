<template>
<div class="color">
  <a href="/">
  <img src="title.JPG" class="img_loc">
  </a>
  <div class="fj_nav">
    <el-button type="text" size="default" @click="go_link('main')"><strong style="color:black">Main</strong></el-button>
    <el-divider direction="vertical"></el-divider>
  <el-button type="text" size="default" @click="go_link('info')"  ><strong style="color:black">공지사항</strong></el-button>
  <el-divider direction="vertical"></el-divider>
  <el-button type="text" size="default" @click="go_link('board')"><strong style="color:black">게시판</strong></el-button>
  </div>
 <div class="login_loc">
 <div v-if="status==0">
   <label for="id">ID</label>
   <input type="id" id="id" v-model="user.userid" style="border:2px solid #33CC33">
    <label for="password">Password</label>
   <input type="password" id="password" v-model="user.password" style="border:2px solid #33CC33">
  <el-button type="text" size="default" v-on:click="login" ><strong style="color:black">로그인</strong></el-button>
   <el-divider direction="vertical"></el-divider>  
	<el-button type="text" size="default" v-on:click="createAccount"><strong style="color:black">회원가입</strong></el-button> 
  </div>
  <div v-if="status==1" ref="status">
  <a style="font-size:0.8em;margin-right:1em">{{user.userid}}</a>
    <!--button @click="openModal">회원정보수정</button>
    <modal @close="closeModal" v-if="modal">
      <p>비밀번호확인</p>
      <div><input v-model="modal_message"></div>
      <template slot="footer">
     <button @click="doSend">확인</button>
      </template>
    </modal--> 
      <el-button type="text" size="default" v-on:click="data_flatform"><strong style="color:black">데이터 플랫폼</strong></el-button>
       <el-divider direction="vertical"></el-divider>
      <el-button type="text" size="default" id="show-modal_farmos" @click="showModal_farmos = true"><strong style="color:black">장비제어</strong></el-button>
    <modal_farmos v-if="showModal_farmos" @close="showModal_farmos = false">
    <h3 slot="header">장비제어</h3>
    </modal_farmos>
     <el-divider direction="vertical"></el-divider>
      <el-button type="text" size="default" @click="calculate"><strong style="color:black text-decoration:none"><a href="http://59.30.85.18:64000/food" style="text-decoration:none;color:black;" onclick="window.open(this.href,'_blank','width=1600px,height=1200px,toolbars=yes,scrollbars=yes'); return false;">양액계산기</a></strong></el-button>
    <!--button id="show-modal_cal" @click="showModal_Cal = true">양액계산기</button>
      <modal_calculator v-if="showModal_Cal" @close="showModal_Cal = false">
    <h3 slot="header">양액계산기</h3>
    </modal_calculator-->
     <el-divider direction="vertical"></el-divider>
      <el-button type="text" size="default" id="show-modal" @click="showModal = true" ><strong style="color:black">회원정보수정</strong></el-button>
  <modal v-if="showModal" @close="showModal = false">
    <h3 slot="header">회원정보수정</h3>
  </modal>
   <el-divider direction="vertical"></el-divider>
  <el-button  type="text" size="default" v-on:click="logout" ><strong style="color:black">로그아웃</strong></el-button>
   <el-divider direction="vertical"></el-divider> 
  <el-button type="text" size="default" @click="ShowMembers"  v-if="check_auth=='admin'" ref="check_auth"><strong style="color:black">회원관리</strong></el-button> 
  </div>
  </div>
</div>
</template>
<script>
import modal from './modal'
import modal_farmos from './modal_farmos'
//import modal_calculator from './Calculator'
export default {
    data: function () {
  return {
    user: {
      userid: '',
      password: ''
    },
    status:''
    ,check_id:localStorage.getItem("id")
    ,check_auth:localStorage.getItem("auth")
    ,showModal:false
    ,showModal_farmos:false
    ,showModal_Cal:false
    ,modal_message:''
  } 
},
mounted(){
    this.check_login();
},
methods: {
 login: function () {
    this.$http.post('/users/logincheck', {
      user: this.user
    })
    .then((res) => {  //로그인 성공
        if (res.data.success == true) {
          console.log(res.data.auth+"어쓰");
          if(res.data.auth==2){
            alert("휴면회원입니다.관리자에게 문의하세요.");
            return;
          }
          else if(res.data.auth==3){
            alert("없는 아이디입니다.");
            return;
          }
          else if(res.data.auth==4){
            alert("가입신청승인 대기중입니다. 관리자에게 문의하세요");
            return;
          }else if(res.data.auth==1){
            this.check_auth="admin";  
          }
          else if(res.data.auth==0){  
            this.check_auth="user";  
          }
          localStorage.setItem("id" ,this.user.userid);
          localStorage.setItem("auth" ,this.check_auth);
          this.user.userid=localStorage.getItem("id")+"님, 환영합니다.";
           this.status=1;
          alert(this.user.userid);   
        this.$router.go();
        }
      else
        alert(res.data.message);
      },
      (err) => { // error 를 보여줌
        console.log('err1');
        alert(err);
      
    })
    .catch(err => {
        console.log('err2');
      alert(err);
    })
  },
  createAccount: function(){
    this.$router.push({path:'./create'});
  },
  check_login: function(){
    if(this.check_id!=null&&this.check_auth!=null){
    this.user.userid=this.check_id+"님, 환영합니다.";
    this.status=1;
    }
  },
  logout: function(){
    localStorage.removeItem("id");
    localStorage.removeItem("auth");
    this.user.userid='';
    this.status=0;
  },
  ShowMembers: function(){
    this.$router.push({path:'./Members'});
  },
  data_flatform: function(){
    alert("서비스 준비중입니다.");
  },
  caculate:function(){
    window.open("http://59.30.85.18:64000/food","Food Jukebox-Nutrient Caculator","width=1000,height=900")
  },
  go_link:function(where){
    if(where=="main"){
      this.$router.push({path:'./'});
    }
    else if(where=="info"){
      this.$router.push({path:'./info'});
    }
    else if(where=="board"){
      this.$router.push({path:'./board'});
    }
  }
  /*,
   openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
      if (this.modal_message.length > 0) {
        alert(this.message)
        this.message = ''
        this.closeModal()
      } else {
        alert('비밀번호를 입력해주세요.')
      }
    }*/
},
components:{
  modal,
  modal_farmos
//  modal_calculator
}
}
</script>
<style scoped>
  .login_loc{position: absolute;top:10px;right:200px;background-color: white;}
  .fj_nav{top:15px;left:450px;font-size:1.5em;position: absolute;}
  .img_loc{position: absolute;left:100px;}
  .color{background-color: white;position: fixed; border-bottom:3px solid #33CC33; width:100%; height: 71px; margin-top:-60px!important;z-index: 3;}
</style>