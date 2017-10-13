class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable #,
          # :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
  has_many :users_articles
  has_many :articles, through: :users_articles
end
