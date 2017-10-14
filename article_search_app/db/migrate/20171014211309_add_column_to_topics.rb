class AddColumnToTopics < ActiveRecord::Migration[5.1]
  def change
    add_column :topics, :query_type, :integer
  end
end
