import consumer from "channels/consumer"

let clientId = Math.random().toString(36).substring(2, 15);

consumer.subscriptions.create("ChannelTestChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log(`Connected to MyChannel as : ${clientId}`);
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    if (data.client_id !== clientId) {
      const audio = new Audio('messages_alert.mp3');
      audio.play();
    }
    document.getElementById('messages').insertAdjacentHTML('afterbegin', `<p><strong>${data.ip_address} :</strong> ${data.message}</p>`)
  }
});

function sendMessage(message) {
  consumer.subscriptions.subscriptions[0].send({ message: message, client_id: clientId });
}

document.getElementById('my-button').addEventListener('click', () => {
  const input = document.getElementById('input');
  sendMessage(input.value);
});
