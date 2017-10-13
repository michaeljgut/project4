class UsersArticle < ApplicationRecord
  belongs to :articles
  belongs to :users
end
