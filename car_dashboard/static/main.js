/*    웹소켓   **/
let socket = io.connect('http://10.1.0.5:8052');

socket.on('connect',function(ret){
    console.log("dashboard socket connected");
});

socket.on('disconnect', function(ret) {
    console.log("dashboard socket disconnected");
});


socket.on('response', function(jsondata) {

    // 데이터 전송 delay 확인
    let getTime = new Date();
    let get_time = getTime.toISOString();
    let sendTime = new Date(jsondata.send_time);
    let delay = (getTime - sendTime) * 0.001;
    console.log(`send time: ${jsondata.send_time} get time: ${get_time}`);
    console.log(`delay: ${delay.toFixed(3)} 초`);

    task(jsondata);

});



//5-2.wheel_angle : 핸들 (-3276.8?3276.7 int)
const handle = document.querySelector('#handle');
//5-3.rpm : 엔진 회전수 (0?9766 int)
const rpm = document.querySelector('.rpm_needle');
const one = 6000 / 180;
//5-4.velocity : 자동차 현재 속도 (0?255 int)
const velocity = document.querySelector('.velocity_needle');
//5-6.warn_mdps : MDPS 경고등
const warn_mdps = document.querySelector('.warn_mdps');
//5-8.EPB : 주차 브레이크 체결여부
const epb = document.querySelector('.epb');
//5-9.warn_etc : 기타 경고등
const warn_etc = document.querySelector('.warn_etc');
//5-10.warn_battery : 배터리 경고등
const warn_battery = document.querySelector('.warn_battery');
//5-11.warn_engineoil : 엔진오일 경고등
const warn_engineoil = document.querySelector('.warn_engineoil');
//5-12.warn_engine : 엔진 경고등
const warn_engine = document.querySelector('.warn_engine');
//5-13.warn_EPB : 주차브레이크 경고등
const warn_epb = document.querySelector('.warn_epb');
//5-14.ABS 작동여부
const abs = document.querySelector('.abs');
//5-15.ABS 경고
const warn_abs = document.querySelector('.warn_abs');

// 동작 
function task(jsondata) {

    let data = JSON.parse(jsondata.data);
    console.log(data);
    console.log(`핸들각도: ${data.wheel_angle}`);

    // 핸들
    handle_angle = data.wheel_angle
    if (handle_angle > 360) {
    	handle_angle = handle_angle % 360;
    }else if(handle_angle < -360){
	temp = handle_angle * -1;
	handle_angle = (temp % 360) * -1;
    }	    
    handle.style.transform = `rotate(${handle_angle}deg)`;

    // 속도
    velocity.style.transform = `rotate(${data.velocity}deg)`;
    // rpm
    let rpm_angle = data.rpm / one;
    rpm.style.transform = `rotate(${rpm_angle}deg)`;

    // 경고등
    if (data.EPB) { epb.style.opacity = 1; } else { epb.style.opacity = 0; }
    if (data.ABS) { abs.style.opacity = 1; } else { abs.style.opacity = 0; }
    if (data.warn_mdps) { warn_mdps.style.opacity = 1; } else { warn_mdps.style.opacity = 0; }
    if (data.warn_etc) { warn_etc.style.opacity = 1; } else { warn_etc.style.opacity = 0; }
    if (data.warn_battery) { warn_battery.style.opacity = 1; } else { warn_battery.style.opacity = 0; }
    if (data.warn_engineoil) { warn_engineoil.style.opacity = 1; } else { warn_engineoil.style.opacity = 0; }
    if (data.warn_engine) { warn_engine.style.opacity = 1; } else { warn_engine.style.opacity = 0; }
    if (data.warn_EPB) { warn_epb.style.opacity = 1; } else { warn_epb.style.opacity = 0; }
    if (data.warn_ABS) { warn_abs.style.opacity = 1; } else { warn_abs.style.opacity = 0; }

}



/*      loading      **/
const video = document.querySelector('#road-video');
const loadingScreen = document.querySelector("#loading-screen");
video.addEventListener("loadeddata", (e) => {
    loadingScreen.classList.add("fade");
    setTimeout(function(){ loadingScreen.style.display = 'none'},2001);
});



/*      resize       **/
let delay = 300;
let timer = null;
window.addEventListener('resize', function() {

        clearTimeout(timer);
        timer = setTimeout(function(){
                console.log('resize!');
        }, delay);

});
