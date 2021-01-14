Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :countries, only: [:index, :create]
  resources :cities, only: [:create]
end
