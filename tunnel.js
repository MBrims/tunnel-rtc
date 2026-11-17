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

    sender.

    sender.createOffer().then((v) =>{
        if(v.type == "offer")
        {
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