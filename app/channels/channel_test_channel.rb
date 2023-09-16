class ChannelTestChannel < ApplicationCable::Channel
  def subscribed
    stream_from "channel_test"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    ActionCable.server.broadcast("my_channel", message: data["message"])
  end

  def receive(data)
    ip_address = connection.env['REMOTE_ADDR']
    data["ip_address"] = ip_address
    ActionCable.server.broadcast("channel_test", data)
  end
end
