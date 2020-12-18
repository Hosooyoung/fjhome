<template>
	<div>
	<login></login>
   	
		<div class="listWrap">
		
				<div class="div_for_table">
				<strong style="font-size:2.5em;margin-right:1200px; ">공지사항 {{seq ? '수정':'등록'}}</strong> 
					<table class="tbList_input">
					<colgroup>
						<col width="200px" />
						<col width="950px" />
					</colgroup>
					<tr>
						<th style="border-top:2px solid #DCDFE6;">분류</th>
						<td style="border-top:2px solid #DCDFE6;">
						<el-select v-model="write_option" ref="write_option" size="small" placeholder="옵션선택">
						<el-option value="공지사항">공지사항</el-option>
						<el-option value="업데이트">업데이트</el-option>
  						<el-option value="매뉴얼">매뉴얼</el-option>
  						<el-option value="기타">기타</el-option>
						</el-select>
						</td>
					</tr>
					<tr>
						<th>제목</th>
						<td><input type="text" style="width:900px;height:40px;  border:2px solid #DCDFE6;" v-model="title" ref="title"/></td>
					</tr>
					<tr>
						<th>파일첨부</th>
						<td>
						<form> 
						<input type="file" name="file_input" id="file_input" />
						</form>
						</td>
					</tr>
					<tr>
						<th style="vertical-align:top">내용</th>
						<td>
						<textarea v-model="contents" ref="contents" style="width:900px;height:400px; resize:none; border:2px solid #DCDFE6;" ></textarea></td>
					</tr>
				</table>
		</div>
			<el-divider direction="vertical"></el-divider>  
			<el-button size="default" type="text" style="color:black;font-size:1em" @click="fnList">취소</el-button>
			<el-divider direction="vertical"></el-divider>  
			<el-button v-if="!seq" type="text" size="default" style="color:black;font-size:1em" @click="fnAddNoti" >등록</el-button>
			<el-divider direction="vertical"></el-divider>  
			<el-button v-if="seq" type="text" size="default" style="color:black;font-size:1em" @click="fnModNoti" >완료</el-button>
		</div>	
	</div>
</template>

<script>
import login from './login'
//import sidebar from './Sidebar'
export default {
	data() { //변수 생성
		return{
			title:''
			,upload_file:''
			,contents:''
			,id:localStorage.getItem("id")
			,form:{
				title:'',
				contents:'',
				id:'',
				option:'',
				file:''
			} 
			,seq:this.$route.query.seq
			,body:this.$route.query
			,write_option:''
			,file_name:''
		}
	},mounted(){
		if(this.seq) {
			this.fnGetView();
		}
	}
	,methods:{
		fnList(){ //리스트 화면으로 이동 함수
			this.$router.push('/info');
			
		}
		,fnAddNoti() { //등록 프로세스
			var body={
				id:localStorage.getItem("id")
				,title:''
				,contents:''
				,option:''
				,file_name:''
			}
			if(!this.title) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			if(!this.contents) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("내용을 입력해 주세요");
				this.$refs.contents.focus();
				return;
			}
			if(!this.write_option) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("분류를 선택해 주세요");
				console.log(this.write_option)
				this.$refs.write_option.focus();//방식으로 선택자를 찾는다.
				return;
			}
			var file_check=document.getElementById('file_input').value;
			
			console.log(file_check)
			if(file_check){
				console.log("팔첵 O");
			var frm = new FormData(); 
			var File = document.getElementById("file_input"); 
			frm.append("file", File.files[0]); 
			this.$http.post('/info/addNoti_with_file', frm, 
			{ headers: { 'Content-Type': 'multipart/form-data'} 
			}) 
			.then((res) => {
				if(res.data.success){
					console.log("???????")
				  console.log(res.data.file_name)
				  console.log(typeof res.data.file_name)
				//var file_name="C:/workspace/hodu/vue_project2/svr/uploads/"+res.data.file_name;
				body.title=this.title
				body.contents=this.contents
				body.id=localStorage.getItem("id")
				body.option=this.write_option
				body.file_name=res.data.file_name
				this.fnAddNoti_send(body)
				}
				else{
					alert("파일업로드 실패");
				} 
				}) 
				.catch((err) => { // 예외 처리
					alert(err)
				})

			}else{
				body.title=this.title
				body.contents=this.contents
				body.id=localStorage.getItem("id")
				body.option=this.write_option
				body.file_name=''
				this.fnAddNoti_send(body)
			}	
						
		},
		fnAddNoti_send(body){
						
			this.$http.post('/info/addNotice',body)
			.then((res)=>{
				if(res.data.success) {
					alert('등록되었습니다.');
					this.fnList();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,
		fnGetView() {
			this.$http.get('/info/inforead/'+this.body.seq,{params:this.body})
			.then((res)=>{	
				this.data = res.data.data[0];
				this.title = this.data.title;
				this.contents = this.data.contents;
			
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,fnModNoti() {
			if(!this.title) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			if(!this.contents) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("내용을 입력해 주세요");
				this.$refs.contents.focus();
				return;
			}
			if(!this.write_option) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("분류를 선택해 주세요");
				console.log(this.write_option)
				this.$refs.write_option.focus();//방식으로 선택자를 찾는다.
				return;
			}
			this.form = {
				title:this.title
				,contents:this.contents
				,id:this.id
				,seq:this.seq
				,option:this.write_option
			} 			
			this.$http.post('/info/reNotice',this.form)
			.then((res)=>{
				if(res.data.success) {
					alert('수정되었습니다.');
					this.fnRead();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		fnRead() {
			this.$router.push({path:'./inforead',"query":this.body});
		},
		/*upload(){
				var fd= new FormData()
		var	fd= document.getElementById('file');
		var	fd2= document.getElementById('file').value;
		var	fd3= document.getElementById('file_input').value;
		console.log("zz"+fd);
		 console.log("zz"+fd2);
		 console.log("zz"+fd3); 
	  this.$http.post('/info/createfile', fd)
        .then((res) => {
			console.log(res);
			alert("돼?");
        })
        .catch((err) => {
			console.log(err);
			alert("안돼");
		})
		}	*/


    },
components: {
    login
  }
}
/////////////////////////////파일업로드 히스토리 //
/*
			
			this.form = { //backend로 전송될 POsST 데이터
				title:this.title
				,contents:this.contents
				,id:this.id
				,option:this.write_option
			} 
			
			console.log("변화2357144451227")
			var file_check=document.getElementById('file_input').value;
			console.log(file_check2);
			if(file_check){
				this.$http.post('/info/createfile',fd)
				.then((res)=>{
					console.log(res);
					console.log(res.data.file_name);
					alert('등록되었습니다.');
					return;	
			})
			.catch((err)=>{
				console.log(err);
			})
			 // document.getElementById('file').submit();
			}else{
				this.form.file=''
			}/*
			this.$http.post('/info/addNotice',this.form)
			.then((res)=>{
				if(res.data.success) {
					alert('등록되었습니다.');
					this.fnList();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})*/	
</script>

<style scoped>
.listWrap{margin-left: 200px;margin-top:120px;top:50px;position: relative;}
.listWrap_2{margin-left: 550px; text-align:left; }
	.searchWrap{border:1px solid #DCDFE6; border-radius:5px; text-align:left; padding:20px 0; margin-bottom:40px;}
	.searchWrap input{width:100%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #DCDFE6;}
	.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
	.tblist_input{text-decoration:none; margin-left:350px;;margin-right:auto;text-align:left;}
	.tbList_input th{border-bottom:2px solid #DCDFE6;  padding:0.3em; text-align:left;font-size:1em;}
	.tbList_input td{ border-bottom:2px solid #DCDFE6; padding:0.5em; text-align: left; }
	.tbList_input td.txt_left{text-align:left; text-decoration:none; color:#DCDFE6;padding:1em;}
	.tbList_input td.txt_left a{text-align:left; text-decoration:none; color:black;padding:1em; }
	.tbList_input td.txt_cont{height:400px; vertical-align:top;}
	.btnRightWrap {font-size:1em; color:black;}		
	.div_for_table{margin-left:200px; width:1500px; margin-top:100px; height: 650px;}
</style>