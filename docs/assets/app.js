function ZipcodeHelp() {
  alert("in js")
  let redirect_uri = `${window.location.protocol}//${window.location.host}`;

  if (window.location.pathname) {
    redirect_uri += window.location.pathname;
  }
  return redirect_uri
}
function bindMeetingEvents(meeting) {
  alert("in bind meeting")
  alert(meeting)
  meeting.on('error', (err) => {
    console.error(err);
  });

  // Handle media streams changes to ready state
  meeting.on('media:ready', (media) => {
    if (!media) {
      return;
    }
    if (media.type === 'local') {
      alert("media ready")
      document.getElementById('self-view').srcObject = media.stream;
    }
    if (media.type === 'remoteVideo') {
      document.getElementById('remote-view-video').srcObject = media.stream;
    }
    if (media.type === 'remoteAudio') {
      document.getElementById('remote-view-audio').srcObject = media.stream;
    }
  });

  // Handle media streams stopping
  meeting.on('media:stopped', (media) => {
    // Remove media streams
    if (media.type === 'local') {
      document.getElementById('self-view').srcObject = null;
    }
    if (media.type === 'remoteVideo') {
      document.getElementById('remote-view-video').srcObject = null;
    }
    if (media.type === 'remoteAudio') {
      document.getElementById('remote-view-audio').srcObject = null;
    }
  });

  // Of course, we'd also like to be able to leave the meeting:
  document.getElementById('hangup').addEventListener('click', () => {
    meeting.leave();
  });
}
function joinMeeting(meeting) {
    return meeting.join()



  // return meeting.join().then(() => {
  //   const mediaSettings = {
  //     receiveVideo: true,
  //     receiveAudio: true,
  //     receiveShare: false,
  //     sendVideo: true,
  //     sendAudio: true,
  //     sendShare: false
  //   };

  //   // Get our local media stream and add it to the meeting
  //   return meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
  //     const [localStream, localShare] = mediaStreams;

  //     meeting.addMedia({
  //       localShare,
  //       localStream,
  //       mediaSettings
  //     });
  //   });
  // });
}
  // // Inititate the SDK
  // // IN A PRODUCTION APP YOU SHOULD NOT HARDCODE THESE VALUES BUT INSTEAD LOAD
  // // THEM FROM THE ENVIRONMENT AT BUILD TIME. SECRETS AND OTHER CREDENTIALS SHOULD
  // // NOT BE COMMITTED TO THE CODEBASE.
  // // eslint-disable-next-line no-multi-assign
  // const webex = window.webex = Webex.init({
  //   config: {
  //     credentials: {
  //       client_id: 'C7c3f1143a552d88d40b2afff87600c366c830850231597fb6c1c1e28a5110a4f',
  //       redirect_uri,
  //       scope: 'spark:all spark:kms'
  //     }
  //   }
  // });
  
  // webex.once('ready', () => {
  //   // Now, let's set up the event listener for the Authenticate Button
  //   document.getElementById('authorization').addEventListener('submit', (event) => {
  //     // let's make sure we don't reload the page when we submit the form
  //     event.preventDefault();
  
  //     // initiate the login sequence if not authenticated.
  //     webex.authorization.initiateLogin();
  //   });
  
  //   // Now, let's set up the event listener for the Authenticate Button
  //   document.getElementById('logout').addEventListener('submit', (event) => {
  //     // let's make sure we don't reload the page when we submit the form
  //     event.preventDefault();
  
  //     if (webex.canAuthorize) {
  //       // if already authenticated, logout on click
  //       webex.logout();
  //     }
  //     else {
  //       // No user is authenticated
  //       console.log('cannot logout when no user is authenticated');
  //     }
  //   });
  
  //   if (webex.canAuthorize) {
  //     // Authorization is successful
  
  //     // your app logic goes here
  
  //     // Change Authentication status to `Authenticated`
  //     const authStatus = document.getElementById('authentication-status');
  
  //     authStatus.innerHTML = 'Authenticated';
  //     authStatus.style = 'color: green';
  //   }
  // });
  // }
  function loop(obj){
    // var test = JSON.stringify(obj);
    var test = JSON.parse(obj);
    alert(test)
    // alert(test)
    // alert(obj)
    // alert(JSON.stringify(obj))
    // alert(obj.toString())
    Object.keys(obj).forEach(function(key) {
      alert("in loop")
      console.log(key, obj[key]);
    
    });
  }


  