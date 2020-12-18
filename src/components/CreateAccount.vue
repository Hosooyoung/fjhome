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
                    <textarea readonly id="info_law_text" style="width:1000px; height:100px; resize:none; border:2px solid #DCDFE6;">
       </textarea>
            <el-checkbox style="margin-left:730px; font-weight:bold" v-model="info_law_checked" id="info_law_checkbox">개인정보 취급방침(필수)에 동의합니다.</el-checkbox>
           <li class="checkBox check03">
                    <li style="font-weight: bold;">홈페이지 이용에 대한 안내(필수)</li>
          
                    <textarea readonly id="homepage_law_text" style="width:1000px; height:100px; resize:none; border:2px solid #DCDFE6; white-space:pre-wrap">
<주식회사 지농>('login.jinong.co.kr'이하 '푸드 쥬크 박스 로그인 홈페이지 ')(이하 당 사이트라 한다.)은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.

<주식회사 지농>('푸드 쥬크 박스 로그인 홈페이지 ') 은(는) 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

제1조(개인정보의 처리목적)
⦁당 사이트는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

- 홈페이지 회원 가입 및 관리
회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별ㆍ인증, 회원자격 유지ㆍ관리, 제한적 본인확인제 시행에 따른 본인 확인, 서비스 부정이용 방지, 
만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의 여부 확인, 홈페이지 이용에 관한 문의사항 확인 및 결과 통보, 홈페이지 서비스 개선을 위한 이용자 의견 수렴, 각종 고지ㆍ통지 등을 목적으로 개인정보를 처리합니다.

⦁당 사이트가 개인정보 보호법 제32조에 따라 등록ㆍ공개하는 개인정보파일의 처리 목적은 다음과 같습니다.

개인정보 
파일의 명칭
운영근거/처리목적
개인정보 파일에 기록되는 개인정보의 항목
보유기간
푸드 쥬크박스 회원명부
이용약관/홈페이지 가입의사 확인 및 회원제 서비스 제공
성명, 이메일주소, 연락처 등
1년


제2조(개인정보의 처리 및 보유기간)
⦁당 사이트는 법령에 따른 개인정보 보유ㆍ이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은 개인정보 보유ㆍ이용기간 내에서 개인정보를 처리ㆍ보유합니다.
⦁각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
- 보유근거: 이용약관
- 개인정보 보유 목적: 홈페이지 회원 가입 및 관리
- 보유기간: 1년* (단, 회원탈퇴 시 개인정보를 보유하지 아니합니다.)
*
 1년을 주기로 정보주체의 재동의 절차를 거쳐 동의한 경우에만 계속하여 보유합니다. 마지막 동의일자로부터 1년이 경과한 회원은 휴면회원으로 전환하여 별도 테이블에서 개인정보를 보관하고, 휴면회원 전환 이후 180일간 재동의가 없는 경우 파기합니다.

제3조(개인정보의 제3자 제공)
⦁정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. ⦁제공목적은 '푸드쥬크박스 사용자 및 데이터 조회 / 푸드쥬크박스 유지 및 관리'입니다.

제4조(개인정보처리의 위탁)
⦁주식회사 지농은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

위탁받는 자 (수탁자)
KIST
코리아디지탈

위탁업무


제공받는 자의 개인정보
로그인 ID, 이름, 소속, 이메일, 휴대폰 전화번호
로그인 ID, 이름, 소속, 이메일, 휴대폰 전화번호


⦁주식회사 지농은 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행 목적 외 개인정보 처리 금지, 기술적ㆍ관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는 지를 감독하고 있습니다.
⦁위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리 방침을 통하여 공개하도록 하겠습니다.

제5조(정보주체의 권리ㆍ의무 및 행사방법)
⦁정보주체는 주식회사 지농에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
- 개인정보 열람요구
- 오류 등이 있을 경우 정정 요구
- 삭제요구
- 처리정지 요구
⦁주식회사 지농에서 보유하고 있는 개인정보는 보호법 제35조(개인정보의 열람)에 따라 열람을 요구할 수 있습니다. 개인정보 열람 요구 시 보호법 제35조제4항에 따라 열람을 제한할 수 있습니다.

제6조(처리하는 개인정보 항목)
⦁당 사이트는 다음의 개인정보 항목을 처리하고 있습니다.
홈페이지 회원 가입 및 관리
필수항목: 아이디, 비밀번호, 이름, 휴대폰 번호, 이메일주소

제7조(개인정보의 파기)
⦁주식회사 지농은 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
⦁정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리 목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보(또는 개인정보파일)를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
⦁개인정보 파기의 절차 및 방법은 다음과 같습니다.
-파기절차
주식회사 지농 파기하여야 하는 개인정보(또는 개인정보파일)에 대해 개인정보 파기계획을 수립하여 파기합니다. 주식히사 지농은 파기 사유가 발생한 개인정보(또는 개인정보파일)를 선정하고, 주식회사 지농의 개인정보 보호책임자의 승인을 받아 개인정보(또는 개인정보파일)를 파기합니다.
-파기방법 
주식회사 지농은 전자적 파일 형태로 기록ㆍ저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록ㆍ저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.

제8조(개인정보의 안전성 확보조치)
⦁주식회사 지농은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
- 관리적 조치: 내부관리계획 수립ㆍ시행, 정기적 직원 교육 등
- 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치
- 물리적 조치: 전산실, 자료보관실 등의 접근통제

제9조(개인정보 보호책임자)
⦁주식회사 지농은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

⦁개인정보 보호책임자
성명 : 
직책 : 
직급 : 
⦁개인정보 보호 담당부서
부서명 : 
담당자 : 
연락처 : 

제10조(개인정보 열람청구)
⦁정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 주식회사 지농은 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.

제11조(권익침해 구제방법)
⦁정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
<아래의 기관은 주식회사 지농과는 별개의 기관으로서, 주식회사 지농의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다>.

- 개인정보 침해신고센터 (한국인터넷진흥원 운영)
소관업무 : 개인정보 침해사실 신고, 상담 신청
홈페이지 : privacy.kisa.or.kr
전화 : (국번없이) 118
주소 : 전라남도 나주시 진흥길 9 한국인터넷진흥원

- 개인정보 분쟁조정위원회
소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)
홈페이지 : www.kopico.go.kr
전화 : 1833-6972
주소 : 서울특별시 종로구 세종대로 209 정부서울청사 4층
대검찰청 사이버범죄수사단
(국번없이) 1301 (www.spo.go.kr)

- 경찰청 사이버안전국
(국번없이) 182, cyberbureau.police.go.kr
또한, 개인정보의 열람, 정정·삭제, 처리정지 등에 대한 정보주체자의 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익을 침해 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
☞ 중앙행정심판위원회(www.simpan.go.kr)의 전화번호 안내 참조

제13조(개인정보 처리방침 변경)
⦁이 개인정보 처리방침은 2020. 12. 2.부터 적용됩니다.
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
      var txtBox = document.getElementsById("homepage_law_text");
      console.log(txtBox);
      var lines = txtBox.split("\n");
      var resultString  = "<p>";
    for (var i = 0; i < lines.length; i++) {
     resultString += lines[i] + "<br>";

    }
    resultString += "</p>";
    var   blk   = document.getElementsById("homepage_law_text");
    blk.innerHTML  =  resultString; 
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