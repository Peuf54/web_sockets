import consumer from "channels/consumer"

consumer.subscriptions.create("ChannelTestChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected to MyChannel");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log("Received data: ", data);
    document.getElementById('messages').insertAdjacentHTML('afterbegin', `<p><strong>${data.ip_address} :</strong> ${data.message}</p>`)
  }
});

function sendMessage(message) {
  consumer.subscriptions.subscriptions[0].send({ message: message });
}

document.getElementById('my-button').addEventListener('click', () => {
  const input = document.getElementById('input');
  sendMessage(input.value);
});
