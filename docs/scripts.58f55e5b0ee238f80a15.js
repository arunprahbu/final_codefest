function ZipcodeHelp(){alert("in js");let e=`${window.location.protocol}//${window.location.host}`;return window.location.pathname&&(e+=window.location.pathname),e}function bindMeetingEvents(e){alert("in bind meeting"),alert(e),e.on("error",e=>{console.error(e)}),e.on("media:ready",e=>{e&&("local"===e.type&&(alert("media ready"),document.getElementById("self-view").srcObject=e.stream),"remoteVideo"===e.type&&(document.getElementById("remote-view-video").srcObject=e.stream),"remoteAudio"===e.type&&(document.getElementById("remote-view-audio").srcObject=e.stream))}),e.on("media:stopped",e=>{"local"===e.type&&(document.getElementById("self-view").srcObject=null),"remoteVideo"===e.type&&(document.getElementById("remote-view-video").srcObject=null),"remoteAudio"===e.type&&(document.getElementById("remote-view-audio").srcObject=null)}),document.getElementById("hangup").addEventListener("click",()=>{e.leave()})}function joinMeeting(e){return e.join()}function loop(e){var t=JSON.parse(e);alert(t),Object.keys(e).forEach(function(t){alert("in loop"),console.log(t,e[t])})}