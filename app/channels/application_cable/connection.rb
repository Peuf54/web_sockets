module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :ip_address

    def connect
      self.ip_address = request.env['HTTP_X_FORWARDED_FOR'] || request.remote_ip
    end
  end
end
