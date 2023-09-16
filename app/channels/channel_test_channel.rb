class ChannelTestChannel < ApplicationCable::Channel
  def subscribed
    stream_from "channel_test"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast("channel_test", data.merge(ip_address: ip_address))
  end
  
end
