class CreateTopics < ActiveRecord::Migration[5.1]
  def change
    create_table :topics do |t|
      t.integer :type
      t.string :name
      t.integer :user_id

      t.timestamps
    end
  end
end
