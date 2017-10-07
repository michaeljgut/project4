class QueryController < ApplicationController
  def index
    article_object = NYT_articles.new(params[:id])
    article = article_object.get_article()
    render json: article
  end
end
