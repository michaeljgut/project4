class ArticlesController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :create, :show ]
  # def index
  #     @articles = Article.all()
  #     render json: @articles
  # end
  def create
      @article = Article.create(
          title: params[:title],
          url: params[:url],
          publication_date: params[:publication_date],
          user_id: params[:user_id]
      )
      render json: { article: @article }
  end

  def show
    puts 'user id = ', current_user
    puts 'user id = ', params[:user_id]
    @articles = Article.where(user_id: params[:id])
      render json: @articles
  end

  def index
    puts 'user id = ', current_user
    puts 'user id = ', params[:user_id]
    @articles = Article.where(user_id: 22)
      render json: @articles
  end
end
