class NYT_articles

  def initialize(query)
    @query = query
  end

  def get_article
    get_string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + ENV['ARTICLES_API_KEY']
    response = HTTParty.get(get_string)
    puts response
#    response["main"]["humidity"]
  end
end
