<template>
	<div>
	<login></login>
  	<div class="listWrap">
	<div class="div_for_table" style=",align:center">
	<strong style="font-size:3em;margin-right:1200px;">공지사항</strong>
	<br>
	<el-select style="margin-left:700px;" v-model="search.option" size="small" placeholder="옵션선택" class="option">
    <el-option value="제목">제목</el-option>
	<el-option value="내용">내용</el-option>
  </el-select>
	<el-input v-model="search.contents" size="small" class="input" ref="search.contents"></el-input>
	<el-button type="primary" @click="fnSearch" icon="el-icon-search" size="medium"></el-button>
	<el-button  type="success"  size="default"  @click="fnAdd"  ref="auth" v-if="check_auth=='admin'" ><i class="el-icon-edit"></i><strong>공지사항 등록</strong></el-button>
			<table class="tbList">
				<colgroup>
					<col width="100px" />
					<col width="700px" />
					<col width="200px" />
					<col width="200px" />
					<col width="200px" />
					<col width="100px" />
				</colgroup>
				<tr style="background-color:#F5FBF7;bordercolor:#F5FBF7;border-top-radius:30px">
					<th>no</th>
					<th>제목</th>
					<th>아이디</th>	
					<th>등록일</th>
					<th>수정일</th>
					<th>조회수</th>
				</tr>
				<tr v-for="(row, idx) in list" :key="idx" >
					<td>{{row.seq}}</td>
					<td class="txt_left"><a href="javascript:;" @click="fnView(`${row.seq}`)">{{row.title}}</a></td>
					<td>{{row.user_id}}</td>
					<td>{{row.write_date.substr(0,10)}}</td>
					<td>{{row.rewrite_date.substr(0,10)}}</td>
					<td>{{row.hit}}</td>
				</tr>
			</table>
		</div>
		<div class="pagination" v-if="paging.totalCount > 0">
			<a href="javascript:;" @click="fnPage(1)" class="first"><i class="el-icon-d-arrow-left"></i></a>
			<a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"  class="prev"><i class="el-icon-arrow-left"></i></a>
			<template v-for=" (n,index) in paginavigation()">
				<template v-if="paging.page==n">
					<strong :key="index">{{n}}</strong> 
				</template>
				<template v-else>
					<a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
				</template>
			</template>
			<a href="javascript:;" v-if="paging.total_page > paging.end_page" @click="fnPage(`${paging.end_page+1}`)"  class="next"><i class="el-icon-arrow-right"></i></a>
			<a href="javascript:;" @click="fnPage(`${paging.total_page}`)" class="last"><i class="el-icon-d-arrow-right"></i></a>
	</div>
	
	</div>
	</div>
</template> 

<script>
//import sidebar from './Sidebar'
import login from './login.vue'
export default {
	data() { //변수생성
		return{
        auth:localStorage.getItem("auth")
		,body:'' //리스트 페이지 데이터전송
      	,title:'' //리스트 데이터
     	 ,list:''
      	,write_date:''
      	,rewrite_date:''
		,user:''
		,check_auth:''
	  	,search:{
			option:'',
			contents:''
		}
      	,no:'' //게시판 숫자처리
			,paging:'' //페이징 데이터
			,start_page:'' //시작페이지
			,page:this.$route.query.page ? this.$route.query.page:1
			,keyword:this.$route.query.keyword
			,paginavigation:function() { //페이징 처리 for문 커스텀
				var pageNumber = [];
				var start_page = this.paging.start_page;
				var end_page = this.paging.end_page;
				for (var i = start_page; i <= end_page; i++) pageNumber.push(i);
				return pageNumber;
			}
		}
	}
	,mounted() { //페이지 시작하면은 자동 함수 실행
		this.fnGetList();
		this.check_auth=localStorage.getItem("auth");
	}
	, methods:{
		fnGetList() { //데이터 가져오기 함수
      console.log('1');
      this.body = { 
				page:this.page
			}
      console.log(this.body);
			this.$http.get('/info/getList',{params:this.body})
			.then((res)=>{
				if(res.data.success) {
					this.list = res.data.list;
					this.paging = res.data.paging;
					this.no = this.paging.totalCount - ((this.paging.page-1) * this.paging.ipp);
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요.");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,fnAdd() {
			var id=localStorage.getItem("id");
			if(id==null){
				alert("로그인 후 이용해주세요.");
				return;
			}
			console.log(id);
			var body={
				id:id
			}
			this.$http.get('/users/check_auth_admin', {params:body})
			.then((res)=>{
				if(res.data.success){
	  	this.$router.push('/infowrite')
				}
				else{
					alert("권한이 없습니다.");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
			}
		,getList() {
			this.$http.get('/info/getList')
			.then((res)=>{
				console.log(res);
			})
			.then((err)=>{
				console.log(err);
			})
		}
		, fnPage(n) {//페이징 이
			if(this.page != n) {
				this.page = n;
				this.fnGetList();
			}
		}
		,fnView(seq) {
			this.body.seq = seq;
			this.$router.push({path:'./inforead',query:this.body}); //추가한 상세페이지 라우터
	}
	,fnSearch(){
		if(this.search.contents==''){
				alert("검색어를 입력해주세요.")
				return;
			}
            if(this.search.option){
			this.$router.push({path:'./infosearch'+this.search.contents,query:this.search});
			}
            else{
                alert('검색옵션을 다시설정해주세요.');
            }
		}
	,goback(){
		this.$router.go('/');
	}
}
,components: {
    //HelloWorld,
	//sidebar,
	login
  }
  
}
</script>

<style scoped>
.listWrap{margin-left: 200px;margin-top:100px;top:50px;position: relative;}
	.searchWrap{border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;}
	.searchWrap input{width:100%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
	.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
  .tblist{text-decoration:none; margin-left:auto;margin-right: auto;}
	.tbList th{border-bottom:2px solid #DCDFE6; padding:1em; }
	.tbList th, .tbList td{ border-bottom:2px solid #DCDFE6;  padding:1em; }
	.tbList td.txt_left{text-align:left; text-decoration:none; color:#888;padding:1em;}
	.tbList td.txt_left a{text-align:left; text-decoration:none; color:black;padding:1em; }
	.btnRightWrap{text-align:right; margin:10px 0px 0px 650px;}
	.pagination{ margin:40px 0 0 0;  text-align:center;margin-right:150px; font-size:1.2em;}
	.first, .prev, .next, .last{border:0px solid #666; margin:0 5px;}
	.pagination span{display:inline-block; padding:0 5px; color:#333}
	.pagination a{text-decoration:none; display:inline-block; padding:0 5px; color:#666;}
  .div_for_table{ width:1500px;height: 700px;margin-top:120px;}
  .input{width:300px};
  .option{width:50px};
</style>