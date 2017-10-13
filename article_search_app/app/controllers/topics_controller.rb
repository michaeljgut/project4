class TopicsController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :create, :show, :destroy]
  def create
      @topic = Topic.create(
          name: params[:name]
      )
      render json: { topic: @topic }
  end

  def show
    puts 'user id = ', current_user
    puts 'user id = ', params[:user_id]

    @topics = Topic.where(user_id: params[:id])
      render json: @topics
  end

  def index
    puts 'user id = ', current_user
    puts 'user id = ', params[:user_id]
    @articles = Article.where(user_id: params[:user_id])
      render json: @topics
  end

  def destroy
    Topic.destroy(params[:id])
    # render json: Article.all
  end
end
