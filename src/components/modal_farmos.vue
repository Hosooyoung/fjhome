
<template>
   <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              장비제어접속
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
             fjbox계정을 입력하세요.
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
            <form @submit.prevent="loginForm">
              <input v-model="id" type="text" placeholder="Username" required />
              <input v-model="pw" type="password" placeholder="Password" required />
              <button type="submit">
              로그인v
             </button>
          </form>
            <el-button size="mini" type="danger"  @click="$emit('close')">
                취소
              </el-button>
              <!--label for="id">아이디</label>
              <br>
            <input type="text" id="id" v-model="body.id" value="body.id">
            <br>
              <label for="pw">비밀번호</label>
              <br>
            <input type="password" id="pw" v-model="body.pw" value="body.pw">   
            <br>  
            <el-button size="mini" type="primary" @click="go_farmos">
                확인
              </el-button>
              <el-button size="mini" type="danger"  @click="$emit('close')">
                취소
              </el-button-->
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Cookies from "js-cookie"
import jwt_decode from "jwt-decode"
export default {
    data: function () {
  return {
      body:{
          id:'',
          pw:'',
          isCookie:false
      }
  }
},
mounted() {
  this.cookieCheck()
},
methods:{/*
    go_farmos: function(){
        console.log(this.body.id);
        console.log(this.body.pw);
       this.$http({
        method: 'POST',
       // url: 'http://login.jinong.co.kr/login/login',
        url: 'http://login.jinong.co.kr/login/login',
        data: {
            id:this.body.id,
            pw:this.body.pw
         }
         })
    .then(response =>{
        console.log(typeof response)
    })
    .catch(err => {
        console.log('err2');
      alert(err);
    })
},*/
    cookieCheck(){
        this.isCookie = Cookies.get("token") !== undefined ? true : false
       
    }
, async loginForm() {
            try {
              const result = await this.$http.post("http://fjbox.jinong.co.kr/login", {
                id: this.id,
                pw: this.pw,
              })
              var decoded = jwt_decode(result.data.token)
              const lcalStorageData = {
                user: {
                  info: decoded,
                  token: result.data.token,
                  refreshToken: result.data.refreshToken,
                },
              }
             //'http:fjbox.jinong.co.kr/common/v1/loginserver'
            // var tmp_path="http://"+result.data.url+"/common/v1/loginserver"
 
             Cookies.set("store", JSON.stringify(lcalStorageData), { expires: 31, path:'/common/v1/loginserver', domain : '.jinong.co.kr'})
             
             Cookies.set("token", result.data.token,{domain :'.jinong.co.kr'})
             // this.cookieCheck()
           // window.location.href = `http://${result.data.url}/common/v1/loginserver`
            } catch (error) {
              console.log(error)
              if (error) {
                console.log(error)
                alert("err+"+error)
              } else {
                console.log(error)
                alert("오류가 발생했습니다. 관리자에게 문의바랍니다.")
              }
            }
        }
      } 
}

</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  height: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 15px;
  border:3px solid #33CC33;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-footer{
  text-align: center;
}
.modal-footer label{
  font-weight: bold;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  
  font-weight: bold;
}



/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>