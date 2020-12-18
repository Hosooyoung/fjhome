<template>
<div>
<img src="title.JPG" style="margin-top:100px;width:300px;height:80px"><br>
<strong style="font-size:2em" v-if="status=='join'">회원가입</strong>
<strong style="font-size:2em" v-if="status=='mod'">회원정보수정</strong>
<div class="check_first" v-if="status=='join'">
<form action="" id="joinForm">
            <ul class="join_box">                
            <li class="checkBox check02">
                    <li style="margin-top:30px;font-weight: bold;">개인정보 취급방침 동의(필수)</li>
                    <textarea readonly style="width:1000px; height:100px; resize:none; border:2px solid #DCDFE6;"><주식회사 지농>('login.jinong.co.kr'이하 '푸드 쥬크 박스 로그인 홈페이지 ')(이하 당 사이트라 한다.)은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
<주식회사 지농>('푸드 쥬크 박스 로그인 홈페이지 ') 은(는) 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
       </textarea>
            <el-checkbox style="margin-left:730px; font-weight:bold" v-model="info_law_checked" id="info_law_checkbox">개인정보 취급방침(필수)에 동의합니다.</el-checkbox>
           <li class="checkBox check03">
                    <li style="font-weight: bold;">홈페이지 이용에 대한 안내(필수)</li>
                    <textarea readonly style="width:1000px; height:100px; resize:none; border:2px solid #DCDFE6;">제 1 조 (목적)
이 약관은 주식회사 지농이 운영하는 푸드 쥬크박스 홈페이지(이하 “당 사이트”라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 홈페이지와 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.
                   </textarea>
                        <el-checkbox style="margin-left:680px;font-weight:bold" v-model="homepage_law_checked" id="homepage_law_checkbox">홈페이지 이용에 대한 안내(필수)에 동의합니다.</el-checkbox>
                    <br>
                    <br>
                    <el-checkbox style="margin-left:490px;font-weight:bold"  @change="selectAll" v-model="all_law_checked" id="all_law_checkbox">개인정보 취급방침(필수), 홈페이지 이용에 대한 안내(필수)에 모두 동의합니다.</el-checkbox>
                    </ul>
         </form>
</div>
<div class="input_form">
<div class="input_table">
<table>
<tr>
<th>
 <label for="id">아이디</label><br>
  <input type="profile" id="id" v-model="user.userid" value="user.userid">
</th>
<th>
   <label for="name">이름</label><br>
   <input type="profile" id="name" v-model="user.name">
</th>
</tr>
<tr>
<th>
   <label for="password">비밀번호</label><br>
   <input type="password" id="password" v-model="user.password">
</th>
<th>
   <label for="password_check">비밀번호확인</label><br>
   <input type="password" id="password_check" v-model="password_check">
</th>
</tr>
<br>
<tr>
<th>
   <label for="phone">전화번호</label><br>
   <input type="text" id="phone" v-model="user.phone">
</th>
<th>
  <label for="email">e메일</label><br>
   <input type="text" id="email" v-model="user.email">
</th>
</tr>
<tr>
<th>
  <label for="group">소속</label><br>
   <input type="text" id="group" v-model="user.group">
   <br><br><br>
</th>
<th>
  <label for="device">장비보유여부</label><br>
   <input type="text" id="device" placeholder="제품시리얼번호" v-model="user.dev"><br>
   <input  type="checkbox" id="checkbox" v-model="checked">
<label style="font-size:1em; " for="checkbox">장비없음</label>
</th>
</tr>
</table>
</div> 
<br>
<el-button type="primary" style="width:100px;height:40px;font-size:1em;" v-on:click="createAccount" v-if="status=='join'">가입신청</el-button>
<el-button type="primary" style="width:100px;height:40px;font-size:1em;" v-on:click="modAccount" v-if="status=='mod'">수정하기</el-button>
<el-button type="danger" style="width:100px;height:40px;font-size:1em;" v-on:click="delAccount" v-if="status=='mod'">회원탈퇴</el-button>
<el-button type="default" style="width:100px;height:40px;font-size:1em;" v-on: @click="$router.go(-1)">취소</el-button>
</div>
</div>
</template>
<script>
export default {
    data: function () {
  return {
    user: {
      userid: '',
      name: '',
      password: '',
      phone: '',
      email: '',
      group:'',
      dev:'',
      law_check:'',
      same:''
    },
    homepage_law_checked:false,
    info_law_checked:false,
    all_law_checked:false,
    password_check:''
    ,checked:''
    ,status:''
    ,form:this.$route.query
  }
},
  mounted() {
    console.log("콘솔갓다배림?")
    console.log(this.homepage_law_checked)
    this.check_status();
      },
   methods: {
  createAccount: function () {
    if(this.homepage_law_checked==true&&this.info_law_checked==true){
     this.user.law_check=true;
    if(this.checked==true){
      this.user.dev="장비없음";
    }
    console.log(this.checked)
    console.log(this.user.dev)
    if(this.user.userid==''){
      alert("아이디를 입력해주세요.");
      return;
    }
    if(this.user.name==''){
      alert("이름을 입력해주세요.");
      return;
    }
    if(this.user.password==''){
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if(this.user.phone==''){
      alert("전화번호를 입력해주세요.");
      return;
    }
    if(this.user.email==''){
      alert("e-mail를 입력해주세요.");
      return;
    }
    if(this.user.dev==''){
      alert("장비입력 또는 장비없음을 선택해주세요.");
      return;
    }
    if(this.user.password==this.password_check){
    this.$http.post('/users/createAcc', { 
      user: this.user
    })
    .then((res) => {
      if (res.data.createsuccess == true) {
        alert(res.data.message);
        this.$router.go(-1);
      }
      if (res.data.createsuccess == false) {
        alert(res.data.message);
        this.user.userid='',
        this.user.name='',
        this.user.password='',
        this.user.phone='',
        this.user.email='',
        this.user.law_check='',
        this.user.dev=''
      }
    })
    .catch(function (error) {
      alert(error)
      this.user.userid='',
        this.user.name='',
        this.user.password='',
        this.user.phone='',
        this.user.email='',
        this.user.law_check='',
        this.user.dev=''
    })
    }
    else{
    alert('비밀번호를 확인해주세요.');
  }
  }
    else{
      alert('약관에 동의해주세요.');  
  }
  },
  modAccount:function(){
    this.user.law_check=true;
     if(this.checked==true){
      this.user.dev="장비없음";
    }
    if(this.user.userid==''){
      alert("아이디를 입력해주세요.");
      return;
    }
    if(this.user.name==''){
      alert("이름을 입력해주세요.");
      return;
    }
    if(this.user.password==''){
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if(this.user.phone==''){
      alert("전화번호를 입력해주세요.");
      return;
    }
    if(this.user.email==''){
      alert("e-mail를 입력해주세요.");
      return;
    }
    if(this.user.dev==''){
      alert("장비입력 또는 장비없음을 선택해주세요.");
      return;
    }
    var id=localStorage.getItem("id");
    
    if(id==this.user.userid){
      this.user.same=true
    }
    else {
      this.user.same=false
    }
    if(this.user.password==this.password_check){
    this.$http.post('/users/modAcc', { 
      user: this.user,
      before_mod_id:localStorage.getItem("id")
    })
    .then((res) => {
      if (res.data.success == true) {
        alert(res.data.message);
        localStorage.setItem("id",res.data.id);
        this.$router.go(-1);
      }
      if (res.data.success == false) {
        alert(res.data.message);
      }
    })
    .catch(function (error) {
      alert(error)
    })
    }
    else{
      alert("비밀번호가 일치하지않습니다. 다시입력해주세요.")
    }
  }
  ,
  selectAll:function(){
    console.log("되냐구")
    console.log(this.all_law_checked+"되나?")
    if(this.all_law_checked==true)
    {
      this.homepage_law_checked=true;
      this.info_law_checked=true;
    }
    else{
      this.homepage_law_checked=false;
      this.info_law_checked=false;    
    }
  },
  check_status:function(){
    var id=localStorage.getItem("id");
    if(id==null){
      this.status='join';
    }
    else if(id!=null){
      this.status='mod';
      var body={
        id:id
      }
      this.$http.post('/users/check_user_info',body)
			.then((res)=>{
				if(res.data.success) {
          for(var key in this.form){
            this.user.password=this.user.password+this.form[key]
          }
        this.user.userid=res.data.data[0].id,
        this.user.name=res.data.data[0].user_name,
        this.user.phone=res.data.data[0].phone,
        this.user.password_check=this.user.password,
        this.user.email=res.data.data[0].email,
        this.user.group=res.data.data[0].user_group,
        this.user.dev=res.data.data[0].user_device
        
          console.log('비번2'+this.user.password)
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
    }
  }
  ,
  delAccount:function(){
    this.$http.post('/users/delAcc', { 
      id:localStorage.getItem("id")
    })
    .then((res)=>{
				if(res.data.success) {
           localStorage.removeItem("id");
           localStorage.removeItem("auth");
          alert(res.data.message);
           this.$router.go(-1);
        } else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
  }
}
}
</script>
<style scoped>
body{background-color: #f7f7f7;}
ul>li{list-style: none}
a{text-decoration: none;}
#joinForm{width: 70%;margin: 0 auto; height:450px; }
ul.join_box{border: 1px solid #ddd;height:400px;background-color: #fff;}
.check_first{width:100%;position: relative;}
.input_form{position: relative;width:800;height:900px;margin-left:30%;margin-right:30%;}
.input_table{margin-top:30px;text-align:left;width:700px;height: 520px;border-radius: 5px;border: 1px solid #DCDFE6;}
.input_table table{margin-top:0px;}
.input_table label{font-size:1.4em; font-weight: bold;color:#606266;}
.input_table input{font-size:1.3em;}
.input_table input[type=profile]{width:300px;height: 40px;border-radius: 10px;border: 1px solid #DCDFE6;}
.input_table input[type=password]{width:300px;height: 40px;border-radius: 10px;border: 1px solid #DCDFE6;}
.input_table input[type=text]{width:300px;height: 40px;border-radius: 10px;border: 1px solid #DCDFE6;}
.input_table input[type=checkbox]{width:20px;height: 20px;border-radius: 10px;border: 1px solid #DCDFE6;}
.input_table tr th{padding:20px;}
</style>