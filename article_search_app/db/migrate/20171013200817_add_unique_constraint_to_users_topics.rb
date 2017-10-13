class AddUniqueConstraintToUsersTopics < ActiveRecord::Migration[5.1]
  def change
    add_index :users_topics, [:user_id, :topic_id], :unique => true
  end
end
