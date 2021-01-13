class CountriesController < ApplicationController

  def index
    countries = Country.all
    render({json: countries, except: [:created_at, :updated_at]})
  end

  def create
    country = Country.create(name: params[:name], description: params[:description])
    render({json: country})
  end

  private

end
