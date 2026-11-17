const localDescInput = document.getElementById("localDescInput");
const remoteDescInput = document.getElementById("remoteDescInput");

const stunServers = ["STUN:stun.cloudflare.com:3478"];

// Setup a connection
// Generate the SDP info
// Serialise the offer
// Add to URL
// Print URL
// Handle connection (if possible).

function handleLocal() {
}

function handleRemote() {

}

window.onload = () => {
    // const appBody = document.getElementById("appbody");

    const foundHash = window.location.hash.slice(1);
    if (foundHash) {
        remoteDescInput.value = foundHash;
        remoteDescInput.readOnly = true;

        console.log("Found offer:")
        console.log(atob(foundHash))
        return;
    }

    const config = { iceServers: [{ urls: stunServers }] };
    const sender = new RTCPeerConnection(config);


    sender.createOffer().then((v) => {
        if (v.type == "offer") {
            console.log("Found offer:")
            console.log(v.sdp);

            localDescInput.value = btoa(v.sdp);
            localDescInput.readOnly = true;
        }
    });

    // new RTCRtpSender().setParameters({encodings})

    // connection.setRemoteDescription({sdp})

    // new RTCSessionDescription({sdp})
}

// var findIP = new Promise(
//     r => {
//         var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] });
//         a.createDataChannel("");
//         a.onicecandidate = c => {
//             try {
//                 c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)
//             } catch (e) { }
//         }

//         a.createOffer().then((c) => a.setLocalDescription(c));

//     }
// )

// findIP().then(ip => console.log(ip));

var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] });
a.createDataChannel("");
a.onicecandidate = c => {
    console.log(c);

    // try {
    //     c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g)
    // } catch (e) { }
}
a.createOffer().then((c) => a.setLocalDescription(c));