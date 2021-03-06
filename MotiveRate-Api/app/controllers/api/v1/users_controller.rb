require("byebug")

class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :index, :show]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET / users
  def index
    @users = User.order(:id)
    render json: UserSerializer.new(@users)
  end

  # GET / users / 1
  def show
    render json: UserSerializer.new(@user)
  end

  def profile
    render json: { user: UserSerializer.new(current_user) }, status: :accepted
  end

  # POST / users
  def create
    @user = User.create(user_params)
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
    else
      render json: { error: "failed to create user" }, status: :not_acceptable
    end
  end

  # PATCH / PUT / users / 1
  def update
    if @user.update(user_params)
        @token = encode_token(user_id: @user.id)
        render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
    else
        render json: @user.errors,
               status: :not_acceptable
    end
  end

  # DELETE / users / 1
  def destroy
    @user.destroy
    if @user.destroy
      head :no_content,
           status: :ok
    else
      render json: @user.errors,
             status: :not_acceptable
    end
  end

  private

  # # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params
      .require(:user)
      .permit(:username, :password, :email, :first_name, :last_name, :score, :tier)
  end
end
