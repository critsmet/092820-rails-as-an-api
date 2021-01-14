class AddCountryIdToCities < ActiveRecord::Migration[6.1]
  def change
    add_column :cities, :country_id, :integer
  end
end
