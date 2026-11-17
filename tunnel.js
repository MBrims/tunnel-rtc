const localDescInput = document.getElementById("localDescInput");
const localDescSubBat = document.getElementById("localDescSubBut");


const remoteDescInput = document.getElementById("remoteDescInput");
const remoteDescSubBat = document.getElementById("remoteDescSubBut");

const senderDiv = document.getElementById("senderDiv");
const senderDivUrlOutput = document.getElementById("senderURLOutput");

const stunServers = ["STUN:stun.cloudflare.com:3478"];

// Setup a connection
// Generate the SDP info
// Serialise the offer
// Add to URL
// Print URL
// Handle connection (if possible).

const rcvheader = "rcv:"

// window.createHashURL = (sdp) => {
window.createHashURL = () => {
    const sdp = atob(localDescInput.value);
    senderDivUrlOutput.value = window.location.origin + window.location.pathname + "#" + btoa(rcvheader + sdp);
}

const config = { iceServers: [{ urls: stunServers }] };
let connection = new RTCPeerConnection(config);
let dataChannel = null;

function setLocalDescInputRead(readonly) {
    localDescInput.readOnly = readonly;
    localDescSubBat.disabled = readonly;
}

function setRemoteDescInputRead(readonly) {
    remoteDescInput.readOnly = readonly;
    remoteDescSubBat.disabled = readonly;
}

// This should only be called from the reciever.
function onLocalSubmit() {
    const sdp = atob(remoteDescInput.value);
    connection.setRemoteDescription({ type: "answer", sdp: sdp });
}

// This should only be called by the sender.
function onRemoteSubmit() {
    const sdp = atob(remoteDescInput.value);
    connection.setRemoteDescription({ type: "answer", sdp: sdp }).then(() => { console.log("Remote set: ", connection.remoteDescription); });
}

const foundHash = window.location.hash.slice(1);
if (foundHash) {
    senderDiv.hidden = true;

    let sdp = atob(foundHash);
    if (sdp.startsWith(rcvheader)) {

        sdp = sdp.slice(rcvheader.length);
        remoteDescInput.value = foundHash;

        setRemoteDescInputRead(true);

        connection.setRemoteDescription({ type: "offer", sdp: sdp });
        console.log("Found offer:", sdp);

        connection.createAnswer().then((v) => {
            if (v.type == "answer") {
                console.log("Found Answer:")
                console.log(v.sdp);

                connection.setLocalDescription(v);

                localDescInput.value = btoa(v.sdp);
                setLocalDescInputRead(true);
            }
        });
    }
}
else {
    senderDiv.hidden = false;

    connection.createDataChannel("tunnel-rtc");
    connection.onicecandidate = ic => {
        console.log("Found candidate: ", ic.candidate);
    };

    connection.createOffer().then((v) => {
        if (v.type == "offer") {
            console.log("Found offer:")
            console.log(v.sdp);

            connection.setLocalDescription(v);

            localDescInput.value = btoa(v.sdp);
            setLocalDescInputRead(true);
        }
    });
}




// var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [{ urls: stunServers }] });
// a.createDataChannel("");
// a.onicecandidate = c => {
//     console.log(c);
// }
// a.createOffer().then((c) => a.setLocalDescription(c));