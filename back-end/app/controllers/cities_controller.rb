class CitiesController < ApplicationController

  def create
    city = City.create(name: params[:name], population: params[:population], country_id: params[:country_id])
    render json: city
  end

end
