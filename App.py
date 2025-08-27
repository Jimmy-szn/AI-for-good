import ee
import geemap

# Initialize the Earth Engine API
ee.Initialize()

# Set the AOI to your farm location
farm_location = [36.5230, 0.1804]  # example farm location
aoi = ee.Geometry.Point(farm_location).buffer(1000)  # 1 km radius buffer

# Define the date range
start_year = 2024
start_month = 1
end_year = 2024
end_month = 2
dry_day_threshold = 0.1  # in mm

# Create date objects
start_date = ee.Date.fromYMD(start_year, start_month, 1)
end_date = ee.Date.fromYMD(end_year, end_month, 1).advance(1, 'month')

# Load the CHIRPS daily precipitation dataset
chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY') \
    .filterDate(start_date, end_date) \
    .filterBounds(aoi)


# Get the daily precipitation values for the AOI
def get_daily_precipitation(image):
    # Reduce the image to get a mean precipitation value for the AOI.
    # We use .get() with a default value of -1 to avoid nulls.
    value = image.reduceRegion(
        reducer=ee.Reducer.mean(),
        geometry=aoi,
        scale=5566,  # CHIRPS native resolution is ~5.5km
        tileScale=16
    ).get('precipitation', -1)

    # Return a feature with the value and date.
    return ee.Feature(None, {'precipitation': value, 'date': image.date().format('YYYY-MM-dd')})


# Map the function over the collection to get a FeatureCollection of daily values.
daily_features = chirps.map(get_daily_precipitation)

# Aggregate the precipitation values into a list.
daily_precipitation_list = daily_features.aggregate_array('precipitation').getInfo()

# Count the number of "dry days" from the list of values.
dry_days_count = sum(1 for p in daily_precipitation_list if p != -1 and p < dry_day_threshold)

# Print the results
total_images = chirps.size().getInfo()
print(f"Total days in the date range: {total_images}")
print(f"Number of dry days (mean precipitation < {dry_day_threshold} mm): {dry_days_count}")
print(f"Daily precipitation values (mm): {daily_precipitation_list}")