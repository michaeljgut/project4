class AddColumnsToUsersArticles < ActiveRecord::Migration[5.1]
  def change
    add_column :users_articles, :user_id, :integer
    add_column :users_articles, :article_id, :integer
  end
end
