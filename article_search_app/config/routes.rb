Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :articles

  root to: 'query#index'

  get '/query/:id', to: 'query#index'
end
