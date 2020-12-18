<template>
	<div>
  <login></login>
  <div class="main_loc">
  <div class="titles">
  <strong>회원관리</strong>
	<br>
	<el-button type="primary" size="small" @click="goback">메인으로 돌아가기</el-button>
  </div>
 	<div class="listWrap">
	  <h1>회원신청목록</h1>
	  		 <select v-model="join_search.option">
			<option disabled value="">옵션선택</option>
			<option>아이디</option>
			<option>이름</option>
			<option>소속</option>
			<option>연락처</option>
			<option>이메일</option>
			<option>장비</option>
		</select>
		<input type="text" v-model="join_search.contents" ref="join_search.contents" />
		<el-button type="primary" size="mini" @click="fnjoin_Search" icon="el-icon-search"></el-button>
		<el-button type="text" size="small" @click="join_redirection" v-if="join_show_all==true">가입신청 전체목록 보기</el-button>
       		<table class="tbList">
				<colgroup>
					<col width=150px />
					<col width=100px />
					<col width=200px />
					<col width=200px />
					<col width=300px />
					<col width=150px />
					<col width=150px />
				</colgroup>
				<tr>
					<th>아이디</th>
					<th>이름</th>
                    <th>소속</th>
					<th>연락처</th>
					<th>이메일</th>
                    <th>등록장비</th>
					<th>비고</th>
				</tr>
				<tr v-for="(row, idx) in join_list" :key="idx">
					<td>{{row.id}}</td>
					<td>{{row.user_name}}</td>
					<td>{{row.user_group}}</td>
					<td>{{row.phone}}</td>
					<td>{{row.email}}</td>
					<td>{{row.user_device}}</td>
                    <td>
                     <el-button @click="Getjoin(row.id,1)" v-if="row.user_auth==4" id="join_button" type="primary" size="mini">승인</el-button>
					 <el-button @click="Getjoin(row.id,2)" v-if="row.user_auth==4" id="join_button" type="danger" size="mini">거절</el-button>
                    </td>
				</tr>
			</table>
		 	</div>
	<div class="join_pagination" v-if="join_paging.totalCount > 0">
			<a href="javascript:;" @click="fnJoinPage(1)" class="first">&lt;&lt;</a>
			<a href="javascript:;" v-if="join_paging.start_page > 10" @click="fnJoinPage(`${join_paging.start_page-1}`)"  class="prev">&lt;</a>
			<template v-for=" (n,index) in Joinpaginavigation()">
				<template v-if="join_paging.page==n">
					<strong :key="index">{{n}}</strong> 
				</template>
				<template v-else>
					<a href="javascript:;" @click="fnJoinPage(`${n}`)" :key="index">{{n}}</a>
				</template>
			</template>
			<a href="javascript:;" v-if="join_paging.total_page > join_paging.end_page" @click="fnJoinPage(`${join_paging.end_page+1}`)"  class="next">&gt;</a>
			<a href="javascript:;" @click="fnJoinPage(`${join_paging.total_page}`)" class="last">&gt;&gt;</a>
    </div>
		<div class="listWrap2">
		<h1>전체 회원 목록</h1>
		 <select v-model="search.option">
			<option disabled value="">옵션선택</option>
			<option>아이디</option>
			<option>이름</option>
			<option>소속</option>
			<option>연락처</option>
			<option>이메일</option>
			<option>장비</option>
		</select>
		<input type="text" v-model="search.contents" ref="search.contents" />
		<el-button type="primary" size="mini" @click="fnSearch" icon="el-icon-search"></el-button>
		<el-button type="text" size="small" @click="redirection" v-if="show_all==true">전체목록 보기</el-button>
	
	   		<table class="tbList">
				<colgroup>
					<col width=150px />
					<col width=100px />
					<col width=200px />
					<col width=200px />
					<col width=300px />
					<col width=150px />
					<col width=150px />
					<col width=150px />
				</colgroup>
				<tr>
					<th>아이디</th>
                    <th>이름</th>
					<th>소속</th>
					<th>연락처</th>
					<th>이메일</th>
                    <th>등록장비</th>
					<th>마지막 로그인</th>
                    <th>비고</th>
				</tr>
				<tr v-for="(row, idx) in list" :key="idx">
					<td>{{row.id}}</td>
					<td>{{row.user_name}}</td>
					<td>{{row.user_group}}</td>
					<td>{{row.phone}}</td>
					<td>{{row.email}}</td>
					<td>{{row.user_device}}</td>
                    <td>{{row.last_login}}</td>
                    <td style="text-align:center;font-szie:0.7em;font-weight:bold"><p v-if="row.user_auth==0">활동회원</p>
                     <p v-if="row.user_auth==2">휴면회원</p>
                     <p v-if="row.user_auth==1">관리자계정</p>
					<br>
					<el-button type="danger" size="small" @click="reset_pw(row.id)">비밀번호 초기화</el-button>
                    </td>
				</tr>
			</table>
		</div>

		<div class="pagination" v-if="paging.totalCount > 0">
			<a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
			<a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"  class="prev">&lt;</a>
			<template v-for=" (n,index) in paginavigation()">
				<template v-if="paging.page==n">
					<strong :key="index">{{n}}</strong> 
				</template>
				<template v-else>
					<a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
				</template>
			</template>
			<a href="javascript:;" v-if="paging.total_page > paging.end_page" @click="fnPage(`${paging.end_page+1}`)"  class="next">&gt;</a>
			<a href="javascript:;" @click="fnPage(`${paging.total_page}`)" class="last">&gt;&gt;</a>
    </div>
	</div>
	</div>
</template> 

<script>
import login from './login.vue'
export default {
	data() { //변수생성
		return{
        auth:''
		,body:'' //리스트 페이지 데이터전송
		,join_body:''  
		  ,id:'' //리스트 데이터
     	 ,name:''
      	,phone:''
		,email:''
		,show_all:false  
		,join_show_all:false 
	  	,group:''
	  	,device:''
		,last_login:''
		,search:{
			option:'',
			contents:''
		}
		,join_search:{
			option:'',
			contents:''
		}
		,list:''
		,join_list:''
		,no:'' //게시판 숫자처리
		,paging:'' //페이징 데이터
		,start_page:'' //시작페이지
		,page:this.$route.query.page ? this.$route.query.page:1
		,keyword:this.$route.query.keyword
		,join_no:'' //게시판 숫자처리
		,join_paging:'' //페이징 데이터
		,join_start_page:'' //시작페이지
		,join_page:this.$route.query.join_page ? this.$route.query.join_page:1
			//,keyword:this.$route.query.keyword
		,paginavigation:function() { 
			var pageNumber = [];
			var start_page = this.paging.start_page;
			var end_page = this.paging.end_page;
			for (var i = start_page; i <= end_page; i++) pageNumber.push(i);
			console.log(pageNumber+"목록")
			return pageNumber;
		},Joinpaginavigation:function() {
			var pageNumber = [];
			var start_page = this.join_paging.start_page;
			var end_page = this.join_paging.end_page;
			for (var i = start_page; i <= end_page; i++) pageNumber.push(i);
			console.log(pageNumber+"신청")
			return pageNumber;
		}
		}
	}
	,mounted() { //페이지 시작하면은 자동 함수 실행
		this.fnGetList();
		this.fnGetJoinList();
	}
	, methods:{
		fnGetList() { //데이터 가져오기 함수
      console.log('1');
      this.body = { 
				page:this.page
			}
      console.log(this.body);
			this.$http.get('/users/getList',{params:this.body})
			.then((res)=>{
				if(res.data.success) {
					this.list = res.data.list;
					for(var i in this.list){
						if(this.list[i].last_login==null){
							this.list[i].last_login==""
						}
						else{
						this.list[i].last_login=this.list[i].last_login.substr(0,10)
						}
					}
					this.paging = res.data.paging;
					this.no = this.paging.totalCount - ((this.paging.page-1) * this.paging.ipp);
				
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요.");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		fnGetJoinList() { 
     		 this.join_body = { 
				page:this.join_page
			}
			console.log("조조"+this.join_page)
			console.log("조조"+this.join_paging.page)
			console.log("조조"+this.join_paging.total_page)
			console.log("조조"+this.join_paging.start_page)
			console.log("조조"+this.join_paging.end_page)
			this.$http.get('/users/getJoinList',{params:this.join_body})
			.then((res)=>{
				if(res.data.success) {
					this.join_list = res.data.join_list;
					this.join_paging = res.data.join_paging;
					this.join_no = this.join_paging.totalCount - ((this.join_paging.page-1) * this.join_paging.ipp);
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요.");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		, fnPage(n) {//페이징 이
			if(this.page != n) {
				this.page = n;
				console.log(this.page+"페이지")
				this.fnGetList();
			}
		},
		fnJoinPage(n) {//페이징 이
			if(this.join_page != n) {
				this.join_page = n;
				console.log(this.page+"조페이지")
				this.fnGetJoinList();
			}
		},
		Getjoin(input,ok){
			var form={
				id:input,
				ok:''
			}
			if(ok==1){
				form.ok="join"
			}else if(ok==2){
				form.ok="reject"
			}
			else{
				alert("다시시도 해주세요.")
				return;
			}
			this.$http.post('users/Getjoin',form)
			.then((res)=>{
				if(res.data.success==true) {
					alert("가입승인완료")
					this.$router.go();
				}else {
					alert("가입거절완료");
					this.$router.go();					
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		fnSearch(){
			if(this.search.contents==''){
				alert("검색어를 입력해주세요.")
				return;
			}
			if(this.search.option==''){
				alert("옵션을 선택해주세요.")
				return;
			}
            if(this.search.option){
				this.body = { 
				page:this.page,
				option:this.search.option
				}
				this.$http.get('/users/getSearchList'+this.search.contents,{params:this.body})
			.then((res)=>{
				if(res.data.success) {
					this.list = res.data.list;
					for(var i in this.list){
						if(this.list[i].last_login==null){
							this.list[i].last_login==""
						}
						else{
						this.list[i].last_login=this.list[i].last_login.substr(0,10)
						}
					}
					this.paging = res.data.paging;
					this.no = this.paging.totalCount - ((this.paging.page-1) * this.paging.ipp);
					this.show_all=true;
			}
            else{
                alert('검색내용이 없습니다.');
			}
			})
        }else{
			alert('검색내용을 확인하고 다시 시도해주세요.');
		}
		},
		redirection(){
			this.join_show_all=false;
			this.$router.go();
		},
		fnjoin_Search(){
			if(this.join_search.contents==''){
				alert("검색어를 입력해주세요.")
				return;
			}
			if(this.join_search.option==''){
				alert("옵션을 선택해주세요.")
				return;
			}
            if(this.join_search.option){
				this.join_body = { 
				page:this.join_page,
				option:this.join_search.option
				}
				this.$http.get('/users/getSearchjoinList'+this.join_search.contents,{params:this.join_body})
			.then((res)=>{
				if(res.data.success) {
					this.join_list = res.data.join_list;
					this.join_paging = res.data.join_paging;
					this.join_no = this.join_paging.totalCount - ((this.join_paging.page-1) * this.join_paging.ipp);
					this.join_show_all=true;
			}
            else{
                alert('검색내용이 없습니다.');
			}
			})
        }else{
			alert('검색내용을 확인하고 다시 시도해주세요.');
		}
		},
		join_redirection(){
			this.show_all=false;
			this.$router.go();
		}
		,
		goback(){
			 this.$router.push('/')
		},
		reset_pw(id){
			var form={
				id:id
			}
			this.$http.post('users/reset_pw',form)
			.then((res)=>{
				if(res.data.success==true) {
					alert(res.data.message)
				}else {
					alert("초기화 실패");
										
				}
			})
			.catch((err)=>{
				console.log(err);
			})	
		}             
}
,components: {
    login
  }
  
}
</script>

<style scoped>
  .main_loc{top:170px; margin-top:120px!important;}
.titles{font-size:2.5em;position: relative;margin-top:120px;top:50px;}
.listWrap{width:1300px;margin-left: 200px;margin-top:50px;top:50px; text-align:left;border-radius:15px; border:2px solid #DCDFE6; position: relative;}
.listWrap2{width:1400px;margin-left: 200px;margin-top:50px;top:50px; text-align:left;border-radius:15px; border:2px solid #DCDFE6; position: relative;}
	.tblist{text-decoration:none; margin-left:auto;margin-right: auto;text-align:center;}
	.tbList th{border-bottom:2px solid #DCDFE6;  padding:0.3em; text-align:center;font-size:1em;}
	.tbList td{ border-bottom:2px solid #DCDFE6; padding:0.5em; text-align: left; }
	.tbList td.txt_left{text-align:left; text-decoration:none; color:#DCDFE6;padding:1em;}
	.tbList td.txt_left a{text-align:left; text-decoration:none; color:black;padding:1em; }
	.tbList td.txt_cont{height:400px; vertical-align:top;}
	
	.pagination{ margin:50px 0 0 0; text-align:center;}
	.pagination span{display:inline-block; padding:0 5px; color:#333;}
	.pagination a{text-decoration:none; display:inline-block; padding:0 5px; color:#666;}
	
	.join_pagination{ margin:50px 0 0 0; text-align:center;}
	.first, .prev, .next, .last{border:1px solid #666; margin:0 5px;}
	.join_pagination span{display:inline-block; padding:0 5px; color:#333;}
	.join_pagination a{text-decoration:none; display:inline-block; padding:0 5px; color:#666;}
</style>