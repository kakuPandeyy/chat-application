
const iceConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:a.relay.metered.ca:80",
        username: "650f76d9dd8224a9af1ba00c",
        credential: "yiemxruOaAmNMgOb",
      },
      // {
      //   urls: "turn:a.relay.metered.ca:80?transport=tcp",
      //   username: "650f76d9dd8224a9af1ba00c",
      //   credential: "yiemxruOaAmNMgOb",
      // },
      // {
      //   urls: "turn:a.relay.metered.ca:443",
      //   username: "650f76d9dd8224a9af1ba00c",
      //   credential: "yiemxruOaAmNMgOb",
      // },
      // {
      //   urls: "turn:a.relay.metered.ca:443?transport=tcp",
      //   username: "650f76d9dd8224a9af1ba00c",
      //   credential: "yiemxruOaAmNMgOb",
      // },
    ]
}


class PeerService {
    constructor() {
      if (!this.peer) {

        this.peer = new RTCPeerConnection(iceConfiguration);
      
      }
    }
  
    async getAnswer(offer) {
      try {
        if (this.peer) {
          await this.peer.setRemoteDescription(offer);
          const ans = await this.peer.createAnswer();
          await this.peer.setLocalDescription(new RTCSessionDescription(ans));
          return ans;
        }
      } catch (error) {
        console.log("getAnswer", error);
      }
     
    }
  
    async setLocalDescription(ans) {
      if (this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
    }
  
    async getOffer() {
      if (this.peer) {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      }
    }
  }
  
  export default new PeerService();