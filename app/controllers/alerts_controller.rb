class AlertsController < ApplicationController
  rescue_from StandardError do |exception|
     trigger_sms_alerts(exception)
   end
 
   def trigger_sms_alerts(exception)
     alert_message = <<MSG
 [This is a test] ALERT!
 It appears the server is having issues.
 Exception: #{exception}.
 Go to: http://newrelic.com for more details."
 MSG
     image_url = 'http://howtodocs.s3.amazonaws.com/new-relic-monitor.png'
 
     admins = YAML.load_file('config/administrators.yml')
     admins.each do |admin|
       begin
         phone_number = admin['phone_number']
         send_message(phone_number, alert_message)
 
         flash[:success] = "Exception: #{exception}. Administrators will be notified."
       rescue
         flash[:alert] = 'Something when wrong.'
       end
     end
 
     redirect_to '/'
   end
end

 def server_error
    raise 'A test exception'
  end
 
  private
 
    def send_message(phone_number, alert_message)
      twilio_number = "+13126354511"
      @client = Twilio::REST::Client.new account_sid, auth_token

      @client.messages.create(
        from: twilio_number,
        to:   phone_number,
        body: alert_message)
        # US phone numbers can make use of an image as well
    end
 end
