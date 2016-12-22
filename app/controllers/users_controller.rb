class UsersController < ApplicationController

  def new
    render 'new.html.erb'
  end

  def create
    user = User.new(
    user_name: params[:user_name],
    password: params[:password],
    password_confirmation: params[:password_confirmation]
  )
    if user.save
      session[:user_id] = user.id
      flash[:success] = 'Successfully created account!'
      redirect_to '/'
  else
    flash[:warning] = 'Invalid email or password!'
    redirect_to '/signup'
    end
  end
end

