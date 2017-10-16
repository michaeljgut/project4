class TopicsController < ApplicationController
#  before_action :authenticate_user!, except: [ :index, :create, :show, :destroy]
  before_action :authenticate_user!
  def create
    puts 'params = ', params
    @topic = Topic.find_by(name: params[:name])
    puts '@topic = ',@topic
    if @topic
    else
      @topic = Topic.create(
          name: params[:name],
          user_id: params[:user_id],
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
    puts 'query = ', query
#    @topics = Topic.where(user_id: params[:user_id])
#      render json: @topics
    @topics = Topic.joins(query)
    render json: @topics
  end

  def update
    @topic = Topic.find(params[:id])
    if @topic.update(topic_params)
      puts "OK"
      render json: @topic
    else
      raise "Error!"
    end
  end

  def destroy
    # @topic = Topic.find(params[:id])
    # if @topic.destroy(topic_params)
    #   puts "OK"
    # else
    #   raise "Error!"
    # end
    Topic.destroy(params[:id])
  end

  def topic_params
    params.permit(:name, :id)
  end

end
