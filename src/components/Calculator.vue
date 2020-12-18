<template>
   <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
                양액계산기
            </slot>
          </div>
    
          <div class="modal-body">
            <slot name="body">
            <p>옵션을 선택해주세요.</p>
            <button @click:option=1>양분 비율 자동 탐색</button>
            <button @click:option=2>양분 조제 가능 영역 선택</button>
            </slot>
          </div>
            
          <div class="modal-footer">
            <slot name="footer">
            <div v-if="option==1" id="auto_search">
                 <label for="ec">조재하고자 하는 양액의 전기전도도를 입력하세요.(0~4.5mS/cm)<br>
                 전기전도도(EC)란 전하를 운반할 수 있는 정도를 나타내는 물리량으로<br>
                 양액의 전이온농도 측정에 사용될 수 있습니다.
                 양액의 전이온농도는 양액 내 존재하는 모든 이온농도의 합을 의미합니다.<br>
                 전기전도도가 증가하면 양액의 전 이온농도도 증가합니다.
                 </label>
                <input type="text" v-model="ec" id="ec"> 
                <br>
                <label for="liter">조재하고자하는 양액의 부피를 입력해주세요.(L)</label>
                <input type="text" id="liter" v-model="liter">
                <br>
                <p>[양이온]조재를 원하는 칼륨(K),칼슘(Ca), 마그네슘(Mg) 양분의 비율(%)을 입력해주세요.
                <br>총합은 100(%)이어야합니다.</p>
                <label for="kalum">칼륨</label>
                <input type="text" id="kalum" v-model="kalum">
                <label for="calsum">칼슘</label>
                <input type="text" id="calsum" v-model="calsum">
                <label for="magnesum">마그네슘</label>
                <input type="text" id="magnesum" v-model="magnesum">
                <br>
                <p>[음이온]조재를 원하는 질소(NO3),인(H2PO4), 황(SO4) 양분의 비율(%)을 입력해주세요.
                <br>총합은 100(%)이어야합니다.</p>
                <label for="jilso">질소</label>
                <input type="text" id="jilso" v-model="jilso">
                <label for="inn">인</label>
                <input type="text" id="inn" v-model="inn">
                <label for="whang">황</label>
                <input type="text" id="whang" v-model="whang">
            </div>
            <div v-if="option==2" id="selcet_area">
            </div>
            <div id='myDiv'></div>
            <!--ternary-plot side="300"></ternary-plot-->
            <button class="modal-default-button">
                확인
              </button>
              <button class="modal-default-button" @click="$emit('close')">
                취소
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Plotly from 'plotly.js-dist'
export default {
    data: function () {
  return {
    option:1,
    ec:'',
    liter:'',
    kalum:'',
    calsum:'',
    magnesum:'',
    jilso:'',
    in:'',
    whang:'',
     rawData :  [
    {journalist:75,developer:25,designer:0,label:'point 1'},
    {journalist:70,developer:10,designer:20,label:'point 2'},
    {journalist:75,developer:20,designer:5,label:'point 3'},
    {journalist:5,developer:60,designer:35,label:'point 4'},
    {journalist:10,developer:80,designer:10,label:'point 5'},
    {journalist:10,developer:90,designer:0,label:'point 6'},
    {journalist:20,developer:70,designer:10,label:'point 7'},
    {journalist:10,developer:20,designer:70,label:'point 8'},
    {journalist:15,developer:5,designer:80,label:'point 9'},
    {journalist:10,developer:10,designer:80,label:'point 10'},
    {journalist:20,developer:10,designer:70,label:'point 11'},
    ]
    }
    }
    ,
    mounted(){
      this.draw();
    },
    methods:{
     draw:function(){
         Plotly.newPlot('myDiv', [{
    type: 'scatterternary',
    mode: 'markers',
    a: this.rawData.map(function(d) { return d.journalist; }),
    b: this.rawData.map(function(d) { return d.developer; }),
    c: this.rawData.map(function(d) { return d.designer; }),
    text: this.rawData.map(function(d) { return d.label; }), 
    marker: {
        symbol: 100,
        color: '#DB7365',
        size: 14,
        line: { width: 2 }
    },
    }], {
    ternary: {
        sum: 1,
        aaxis: makeAxis('Journalist', 0),
        baxis: makeAxis('<br>Developer', 45),
        caxis: makeAxis('<br>Designer', -45),
        bgcolor: '#fff1e0'
    },
    paper_bgcolor: '#fff1e0',
    });

function makeAxis(title, tickangle) {
    return {
      title: title,
      titlefont: { size: 20 },
      tickangle: tickangle,
      tickfont: { size: 15 },
      tickcolor: 'rgba(0,0,0,0)',
      ticklen: 5,
      showline: true,
      showgrid: true
    };
    }
    },
    Cal_totalmeq:function(ec,liter){
        var convfactor=9.819;
        var offset=-1.462;
        var totalmeq=convfactor*ec+offset;
        return totalmeq;
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
  width: 600px;
  height: 700px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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