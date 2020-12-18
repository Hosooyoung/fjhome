<template>
  <div>
    <div class='left'>
      <ul>
        <li id='logo'>
          <div>Menu</div>
        </li>
        <p>{{user_info}}</p>
        <li>
	<a href="/">메인화면</a></li>
        <li>
	<a href="/info">공지사항</a> </li>
        <li>
	<a href="/board">게시판</a></li>
        <br>
        <br><br><br><br>
        <br><br><br><br>
        <br><br><br><br>
        <p>지농</p>
       </ul>
    </div>
     </div>
</template>
<script>
export default {
  name: 'left',
  data () {
    return {
      user_info:localStorage.getItem("id")+'님,안녕하세요.'
    }
  },
 methods: {
 
},  
}
</script>
<style>
  a{color:black}
  a:hover{color:rgb(0,0,0);}
  .left{
    position:fixed; 
    top:0px; 
    left:0px; 
    width:250px; 
    height:1000px; 
    background:rgba(255,255,255); 
    padding:40px 0; 
    overflow: hidden
  }
  .left ul {padding: 0 25px}
  .left ul li { font-size:20px;  height:75px;} 
  .left ul li#logo {font-family: 'Passion One', cursive; font-size:50px; height:170px;}
  .left ul li#logo div {line-height: 0.8}
  
</style>