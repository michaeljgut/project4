class TopicsController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :create, :show, :destroy]
  def create
    puts 'params = ', params
    @topic = Topic.find_by(name: params[:name])
    puts '@topic = ',@topic
    if @topic
    else
      @topic = Topic.create(
          name: params[:name],
          query_type: params[:type]
      )
    end
    @users_topic = UsersTopic.create(
      user_id: params[:user_id],
      topic_id: @topic.id
    )
    render json: { topic: @topic }
  end

  def show
    puts 'user id = ', current_user
    puts 'user id = ', params[:user_id]

    @topics = Topic.where(id: params[:id])
      render json: @topics
  end

  def index
    puts 'user id = ', current_user
    puts 'user id = ', params[:user_id]
    query = 'INNER JOIN users_topics ON users_topics.topic_id = topics.id
      WHERE users_topics.user_id = ' + params[:user_id]
    @topics = Topic.joins(query)
    render json: @topics
  end

  def destroy
    Topic.destroy(params[:id])
    # render json: Article.all
  end
end
