Rails.application.routes.draw do

  root 'main#home'
  get '/main/component_demo', to: 'main#component_demo'
  get '/main/todo', to: 'main#todo'
  get '/main/todo_nuclear', to: 'main#todo_nuclear'

  resources :tasks, only: [:create, :index] do
    collection do
      delete :destroy_all
    end
  end

end
