<template>
	<div>
	<login></login>
	<div class="listWrap">
	<div class="div_for_table" style="align:center">
	<strong style="font-size:2.5em;margin-right:900px;">공지사항</strong>
		<table class="tbList">
					<colgroup>
						<col width="200px" />
						<col width="1000px" />
					</colgroup>
					<tr>
						<th>작성자</th>
						<td>{{user_id}}</td>
					</tr>
					<tr>
						<th>분류</th>
						<td>{{user_option}}</td>
					</tr>
					<tr>
						<th>제목</th>
						<td>{{title}}</td>
					</tr>
					<tr>
						<th>첨부파일</th>
						<td><a href='' id="file_down" download=''>{{file_name}}</a></td>
					</tr>
					<tr>
						<th style="vertical-align:top">내용</th>
						<td class="txt_cont" v-html="contents"></td>
					</tr>
				</table>
			<div class="btnRightWrap_group">
		<el-button type="text" size="default"   @click="fnList"  class="btnRightWrap">목록</el-button>
		   <el-divider direction="vertical"></el-divider>  
		<el-button type="text" size="default" @click="fnMod" class="btnRightWrap">수정</el-button>
		   <el-divider direction="vertical"></el-divider>  
		<el-button type="text" size="default" @click="fnDel" class="btnRightWrap">삭제</el-button>
		</div>
		</div>
		<div class="listWrap_2">
		<strong style="font-size:1.2em">댓글</strong>
		<br>
		<textarea v-model="reply_contents" ref="reply_contents" style="width:900px; height:50px; resize:none; border:2px solid #DCDFE6;" ></textarea>
		<el-button size="default" type="info" @click="addReply" style="margin-left:840px">등록</el-button>
		<table class="tbList_2">
				<colgroup>
					<col width="50px" />
					<col width="100px" />
					<col width="560px" />
					<col width="100px" />
					<col width="150px" />
				</colgroup>
				<tr v-for="(row, idx) in list" :key="idx">
					<td>{{row.orders}}</td>
					<td>{{row.user_id}}</td>
					<td v-if="mod_reply==1&&row.orders==mod_auth"><input type="text" v-model="row.contents"/></td>
					<td v-else>{{row.contents}}</td>
					<td>{{row.write_date.substr(0,10)}}</td>
					<td v-if="row.user_id==check_id||check_auth=='admin'">
					<el-button v-if="mod_reply==0" type="success" size="small" @click="modReply(row.orders)"><i class="el-icon-edit"></i></el-button>
					<el-button v-else type="success" size="mini" @click="SendmodReply(row.orders,row.contents,row.user_id)">완료</el-button>
					<el-button v-if="mod_reply==0" type="danger" size="small" @click="delReply(row.user_id,row.orders)"><i class="el-icon-delete-solid"></i></el-button>
					<el-button v-else type="warning" size="mini" @click="CancelmodReply()">취소</el-button></td>								
					<td v-else></td>
					
				</tr>
			</table>

		<div style="font-size:1.2em;margin-left:400px;margin-top:30px;" class="pagination">
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
	</div>
</template>

<script>
import login from './login.vue';
export default {
	data() {
		return {
			body:this.$route.query
			,file_title:''
			,mod_reply:''
			,mod_auth:''
			,reply_seq:''
			,page_num:''
			,reply_contents:''
			,reply_form:''
			,reply_info:''
			,data:''
			,title:''
			,user_id:''
			,check_auth:''
			,user_option:''
			,file_name:''
			,contents:''
			,check_id:''
			,seq:this.$route.query.seq
			,no:''
			,list:''
			,paging:'' //페이징 데이터
			,start_page:'' //시작페이지
			,page:1
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
	,mounted() {
		
		this.check_id=localStorage.getItem("id");
		this.check_auth=localStorage.getItem("auth");
		this.mod_reply=0;
		this.fnGetView();
		this.fnGetReply();
		this.get_Download_info();
	}
	,methods:{
		fnGetView() {
			this.$http.get('/info/inforead/'+this.body.seq,{params:this.body})
			.then((res)=>{	
				this.data = res.data.data[0];
				this.title = this.data.title;
				this.user_id=this.data.user_id;
				this.user_option=this.data.category_option;
				this.contents = this.data.contents.replace(/(\n)/g,'<br/>');
				this.file=this.data.file_path
				console.log('바디쉑 :'+this.body.seq)
				console.log('쿼리쉑 :'+this.$route.query.seq)
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,fnList(){
			delete this.body.seq;		
			this.$router.push({path:'./info',query:this.body});
		},fnMod() {
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
					this.$router.push({path:'./infowrite',query:this.body}); //등록화면으로 이동하면서 파라미터를 넘겨준다.
				}
				else{
				alert("권한이없습니다.");
			}
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		fnDel(){

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
		this.$http.post('/info/DelNoti',{params:this.body.seq})
			.then((res)=>{	
				if(res.data.success) {
					alert('삭제되었습니다.');
					this.$router.push('/info');
				}
			})
			.catch((err)=>{
				console.log(err);
			})
			}
			else{
				alert("권한이없습니다.");
			}
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,
		addReply() {
			var id=localStorage.getItem("id");
			if(id==null){
				alert("로그인 후 이용해주세요.");
				return;
			}
			var body={
					id:id
					}
			this.$http.post('/users/check_auth_all', body)
			.then((res)=>{
				if(res.data.success){	
			if(!this.reply_contents) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("내용을 입력해 주세요");
				return;
			}
			this.reply_form = {
				contents:this.reply_contents
				,id:localStorage.getItem("id")
				,seq:this.seq
			} 
			console.log("seq"+this.seq);
			this.$http.post('/info/addReply',this.reply_form)
			.then((res)=>{
				if(res.data.success) {
					alert('등록되었습니다.');
					this.reply_contents='';
					this.fnGetReply();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
				}
			else{
				alert(res.data.message);
			}
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		fnGetReply() { 
      this.page_num = { 
				page:this.page,
				seq:this.seq
			}
			this.$http.get('/info/getReply',{params:this.page_num})
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
		}, 
		fnPage(n) {//페이징 이
			if(this.page != n) {
				this.page = n;
				this.fnGetReply();
			}
		}
		, 
		
		delReply(id,input) {//페이징 이
		var form={
			seq:this.seq,
			id:localStorage.getItem("id"),
			orders:input,
			auth:localStorage.getItem("auth")
		}

		if(form.id==null){
				alert("로그인 후 이용해주세요.");
				return;
			}
		this.$http.post('/users/check_auth_info_reply',form)
		.then((res)=>{
			console.log(res.data.success);
			if(res.data.success==true) {
			this.reply_info={
				seq:this.seq,
				orders:input
			}
			this.$http.post('/info/DelReply',this.reply_info)
				.then((res)=>{	
					if(res.data.success) {
						alert('삭제되었습니다.');
						this.fnGetReply();
						}
					})
				} 
			else{
				alert("권한이없습니다.");
			}
			})		
		}
		,
		modReply(ord){
		var form={
			seq:this.seq,
			id:localStorage.getItem("id"),
			orders:ord,
			auth:localStorage.getItem("auth")
		}
		if(form.id==null){
				alert("로그인 후 이용해주세요.");
				return;
			}
		this.$http.post('users/check_auth_info_reply',form)
		.then((res)=>{
				if(res.data.success==true) {
					this.mod_auth=ord;
					this.mod_reply=1;
				}
				else{
					alert("권한이없습니다.");
					}
				
				})
				.catch((err)=>{
				console.log(err);
				})
			},
		CancelmodReply(){
			this.mod_reply=0;
			this.fnGetReply();
		},
		SendmodReply(odr,con,id){
			if(id){
			console.log(id);
			}
			if(id==null){
				alert("로그인 후 이용해주세요.");
				return;
			}
			this.reply_info={
			seq:this.seq,
			contents:con,
			orders:odr
		}

		this.$http.post('/info/modReply',this.reply_info)
			.then((res)=>{	
				if(res.data.success) {
					alert('수정되었습니다.');
					this.mod_reply=0;
					this.fnGetReply();
					}
			})
		},
		get_Download_info:function(){
			var link_name=''
			this.$http.post('/info/searchFile',{seq:this.seq})
			.then((res)=>{	
				if(res.data.success){
				link_name=res.data.name

		//	var file_name="C:/workspace/hodu/vue_project2/svr/uploads/"+name;
			link_name="../uploads/"+link_name;
			this.file_name=res.data.title
			this.file_title=res.data.title
			}
			else {
				this.file_name=''
				this.file_title=''
			}
			var link = document.getElementById("file_down");
			link.href = link_name;
			link.download=this.file_title;
			//document.getElementById("file_down").href=file_name;
			})
		}
		
		/*
		Download:function(name,type){
			var file_name="C:/workspace/hodu/vue_project2/svr/uploads/"+name;
			console.log(file_name)
			console.log(typeof file_name)
			this.file_name=file_name
			document.getElementById("abc").href=this.file_name;
   		this.$http({
				method: 'POST',
				data:{name:this.file_name},
				url: 'http://localhost:9090/info/DownloadFile',			
	 		  config:{ responseType: 'blob',
  			  headers: {
       		 "Content-Type": type
				}
			   }
		})
		.then(response =>{
   			 const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
    		const link = document.createElement('a');
    		link.href = url;
   			 link.setAttribute('download', name);
    		document.body.appendChild(link);
    		link.click();
		})		
		}*/
	},
	components:{
		login
	}
}
</script>

<style scoped>
	.listWrap{margin-left: 200px;margin-top:120px;top:50px; text-align:left; position: relative;}
	.listWrap_2{margin-left: 330px; text-align:left; }
	.tblist{text-decoration:none; margin-left:auto;margin-right: auto;text-align:left;}
	.tbList th{border-bottom:2px solid #DCDFE6;  padding:0.3em; text-align:center;font-size:1em;}
	.tbList td{ border-bottom:2px solid #DCDFE6; padding:0.5em; text-align: left; }
	.tbList td.txt_left{text-align:left; text-decoration:none; color:#DCDFE6;padding:1em;}
	.tbList td.txt_left a{text-align:left; text-decoration:none; color:black;padding:1em; }
	.tbList td.txt_cont{height:400px; vertical-align:top;}
	.tblist_2{text-decoration:none; margin-left:auto;margin-right: auto;text-align:left;}
	.tbList_2 th{border-bottom:2px solid #DCDFE6;  padding:0.3em; text-align:center;font-size:1em;}
	.tbList_2 td{ border-bottom:2px solid #DCDFE6; padding:0.5em; text-align: left; }
	.tbList_2 td.txt_left{text-align:left; text-decoration:none; color:#DCDFE6;padding:1em;}
	.tbList_2 td.txt_left a{text-align:left; text-decoration:none; color:black;padding:1em; }
	.tbList_2 td.txt_cont{height:400px; vertical-align:top;}
	.btnRightWrap_group{margin-left:950px;}	
	.btnRightWrap{color:black;}
	.div_for_table{margin-left:200px; width:1100px; margin-top:100px; height: 680px;}
</style>