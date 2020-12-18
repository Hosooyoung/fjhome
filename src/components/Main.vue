<template>
  <div>
  <Login></Login>
  <div class="main_loc">
    <div class="back1" style="background-image:url('main1.JPG')">
    <div>
    <div class="seemore_info" style="main_common">
    <p style="margin-left:0px"><strong style="font-size:1.5em;align:left;margin-right:50px;">공지사항</strong>
     <el-button type="text" size="mini" v-on:click="go_info" style="color:black; align:right;"><i class="el-icon-circle-plus"></i>더보기</el-button>
     </p>
     <table class="tbList">
				<colgroup>
          <col width="50px" />
					<col width="250px" />
				</colgroup>
				<tr>
          <th>no</th>
					<th>title</th>
				</tr>
				<tr v-for="(row, idx) in info_list" :key="idx">
          <td style="font-size:1em;">{{row.seq}}</td>
					<td class="txt_left" style="font-size:1em;"><a href="javascript:;" @click="fnView_info(`${row.seq}`)">{{row.title}}</a></td>
				</tr>
			</table>
       <!--el-table v-for="(row, idx) in info_list" :key="idx" stripe style="width: 50%">
    <el-table-column  label="No" width="50">
    {{row.seq}}
    </el-table-column>
    <el-table-column> 
    <a href="javascript:;" @click="fnView_info(`${row.seq}`)">{{row.title}}</a>
    </el-table-column>
  </el-table-->
    </div>
    <div class="seemore_board" style="main_common">
    <p style="margin-left:0px"><strong style="font-size:1.5em;align:left;margin-right:70px;">Q&A</strong>
     <el-button type="text" size="mini" v-on:click="go_board" style="color:black; align:right;"><i class="el-icon-circle-plus"></i>더보기</el-button>
     </p>
     <table class="tbList">
				<colgroup>
          <col width="50px" />
					<col width="250px" />
				</colgroup>
				<tr>
          <th>no</th>
					<th>title</th>
				</tr>
				<tr v-for="(row, idx) in board_list" :key="idx">
          <td style="font-size:1em;">{{row.seq}}</td>
					<td class="txt_left" style="font-size:1em;"><a href="javascript:;" @click="fnView_board(`${row.seq}`)">{{row.title}}</a></td>
				</tr>
			</table>
    </div>
    </div>
    <div class="main_button_group">
    <el-button size="default" v-on:click="Download_1" round><strong style="color:#67C23A;height:54px;">재배 매뉴얼</strong></el-button>
    <el-button size="default" v-on:click="Download_2" style="margin-left:2em;" round><strong style="color:#67C23A;">제품 안전설명서<br>매뉴얼</strong></el-button>
    <el-button size="default" v-on:click="Download_2" style="margin-left:2em;" round><strong style="color:#67C23A;">제품 사용 설명서<br>매뉴얼</strong></el-button>
    </div>
  </div>
  <img src="main2.JPG">
   <div class="back2" style="background-image:url('main3.JPG')">
   <div class="back2_back">
   <el-button type="success" size="default" style=" margin-right:310px;" v-on:click="location.href='https://gn.kist.re.kr:8443/portal/main/main.do'"><strong>더 보기</strong></el-button>
    <el-button type="success" size="default" style=" margin-right:310px;" v-on:click="location.href='http://www.koreadigital.com/'"><strong>더 보기</strong></el-button>
    <el-button type="success" size="default" v-on:click="location.href='http://www.jinong.co.kr/pages/index.html'"><strong>더 보기</strong></el-button>
   </div>
  </div>
  <img src="main4.JPG">
  </div>
  </div>
</template>
<script>
import Login from './login.vue';
export default {
  
  data () {
    return {
      board_title:'',
      board_list:'',
      info_title:'',
      info_list:'',
      body:''
    }
  }
  ,mounted() { //페이지 시작하면은 자동 함수 실행
    console.log("MAIN");
    this.fnGetInfoList();
    this.fnGetBoardList();
     for (var i in this.list){
       console.log(this.list[i])
     }
  },
  
 methods: {
    Download_1:function(){
    this.$http({
    method: 'POST',
    url: 'http://localhost:9090/main/DownloadFile_1',
    responseType: 'blob',
    headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }
})
.then(response =>{
    const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'TT.pdf');
    document.body.appendChild(link);
    link.click();
})
},
 Download_2:function(){
    this.$http({
    method: 'POST',
    url: 'http://localhost:9090/main/DownloadFile_2',
    responseType: 'blob',
    headers: {
        "Content-Type": "application/pdf"
    }
})
.then(response =>{
    const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '테스트.pdf');
    document.body.appendChild(link);
    link.click();
})
},
go_info: function(){
  this.$router.push('/info')
},
go_board: function(){
  this.$router.push('/board')
},
fnView_info(seq) {
			this.body.seq = seq;
			this.$router.push({path:'./inforead',query:this.body}); 
},
fnView_board(seq) {
			this.body.seq = seq;
			this.$router.push({path:'./boardread',query:this.body});
},
fnGetInfoList() { //데이터 가져오기 
      this.body = { 
				page:this.page
			}
      console.log(this.body);
			this.$http.get('/info/getList',{params:this.body})
			.then((res)=>{
				if(res.data.success) {
          this.info_list = res.data.list;
          for(var i in this.info_list){
            if(this.info_list[i].title.length>18){
              this.info_list[i].title=this.info_list[i].title.substr(0,17)+"..."
            }
          }
          console.log(res.data.list);
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요.");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
    }
,
fnGetBoardList() { //데이터 가져오기 
      this.body = { 
				page:this.page
			}
      console.log(this.body);
			this.$http.get('/board/getList',{params:this.body})
			.then((res)=>{
				if(res.data.success) {
          this.board_list = res.data.list;
          for(var i in this.board_list){
            if(this.board_list[i].title.length>18){
              this.board_list[i].title=this.board_list[i].title.substr(0,17)+"..."
            }
          }
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요.");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
    }
 },
components: {
Login
  }
}
</script>

<style scoped>
   a:link { color:black; text-decoration: none;}
  .main_loc{top:170px; margin-top:120px!important;}
  .seemore_info{border: 0px solid black; width:300px;height: 450px;margin-left: 800px; margin-top:100px;position:absolute; background-color:#ECF1F4 ;border-radius: 15px;border:2px solid #33CC33; }
  .seemore_board{border: 0px solid black; width:300px;height: 450px;margin-left: 1150px; margin-top:100px; position: absolute; background-color: #ECF1F4;border-radius: 15px;border:2px solid #33CC33; }
  .listWrap{margin-left: 250px;}
	.searchWrap{border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;}
	.searchWrap input{width:100%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
	.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
  .tblist{text-decoration:none; width:280px;height: 150px; color:black;}
	.tbList th{border-bottom:1px solid #DCDFE6; }
	.tbList th, .tbList td{text-decoration:none; border-bottom:1px solid #eee; padding:5px 0;}
	.tbList td.txt_left{text-align:left; text-decoration:none;}
	.tbList td.txt_left a{text-align:left; text-decoration:none;}
  .main_button_group{position: absolute; margin-left:900px; margin-top: 570px;}
  /*.tblist2{text-decoration:none; margin-left:700px; width:200px;height: 150px;}
	.tbList2 th{border-top:1px solid #888; width:200px;height: 150px; }
	.tbList2 th, .tbList td{text-decoration:none; border-bottom:1px solid #eee; padding:5px 0;}
	.tbList2 td.txt_left{text-align:left; text-decoration:none;}
	.tbList2 td.txt_left a{text-align:left; text-decoration:none;}
	*/
  .main_common{
    display: inline-block;
  }
	.btnRightWrap{text-align:right; margin:10px 0px 0px 650px;} 
	.back1{position: relative; width:100% ;height: 700px; z-index: 2;margin-top:30px;}
	.back2{position: relative; width:100% ;height: 800px; z-index: 2;}
	.back2_back{position:absolute; margin-left:440px;margin-top: 570px;}
</style>  