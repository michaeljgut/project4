class AddMoreColumnsToArticles < ActiveRecord::Migration[5.1]
  def change
    add_column :articles, :title, :string
    add_column :articles, :publication_date, :date
    add_column :articles, :url, :string
    add_column :articles, :user_id, :integer
  end
end
