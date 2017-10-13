class AddUniqueConstraintToArticles < ActiveRecord::Migration[5.1]
  def change
    add_index :articles, :url, :unique => true
  end
end
