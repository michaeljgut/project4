class AddColumnsToArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.date :publication_date
      t.string :url, unique: true
      t.integer :user_id

      t.timestamps
    end
  end
end
