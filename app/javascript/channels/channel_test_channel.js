import consumer from "channels/consumer"

let clientId = Math.random().toString(36).substring(2, 15);
const input = document.getElementById('input');
const writingStatus = document.getElementById('writing-status');
let writingTimeout;

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

      if (data.status === 'writing') {
        writingStatus.innerHTML = `<p id="writing-status"><strong>${data.ip_address} is writing...</p>`;
      } else if (data.status === 'stopped_writing') {
        writingStatus.innerHTML = ``;
      }
    }
    if (data.message) {
      document.getElementById('messages').insertAdjacentHTML('afterbegin', `<p><strong>${data.ip_address} :</strong> ${data.message}</p>`)
      writingStatus.innerHTML = ``;
    }
  }
});

function sendMessage(message) {
  consumer.subscriptions.subscriptions[0].send({ message: message, client_id: clientId });
}

function sendWriting() {
  consumer.subscriptions.subscriptions[0].send({ status: 'writing', client_id: clientId });
}

document.getElementById('my-button').addEventListener('click', () => {
  sendMessage(input.value);
  input.value = '';
});

input.addEventListener('input', () => {
  clearTimeout(writingTimeout);  // annuler le précédent timeout
  sendWriting();
  writingTimeout = setTimeout(() => {
    consumer.subscriptions.subscriptions[0].send({ status: 'stopped_writing', client_id: clientId });
  }, 1500);
});