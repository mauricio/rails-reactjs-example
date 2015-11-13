class TasksController < ApplicationController

  def index
    render json: Task.all
  end

  def create
    @task = Task.new(task_params)
    if @task.save!
      render json: @task
    else
      render json: { message: 'Failed to save task' }, status: 400
    end
  end

  def destroy_all
    Task.where(name: params.slice(:tasks).permit!).destroy_all
    render json: Task.all
  end

  def task_params
    params.require(:task).slice(:name).permit!
  end

end