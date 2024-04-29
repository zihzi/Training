import json
import pandas as pd
df1 = pd.read_csv('data.csv')

# Read JSON file and extract properties
with open('rstatp_jpn.json') as file:
    data = json.load(file)
    f_code = [feature['properties']["f_code"] for feature in data['features']]
    properties = [feature['properties']["nam"] for feature in data['features']]
    test=[feature['geometry']['coordinates'] for feature in data['features']]
    
# Convert properties to DataFrame
df_properties = pd.DataFrame(f_code)
df_properties['Station_Name'] = properties
df_properties['coordinates'] = test


# Convert the values in the "Station_Name" column of df1 to uppercase
df1['Station_Name'] = df1['Station_Name'].str.upper()

# # Merge df1 and df_properties by the column "station name"
merged_df = pd.merge(df1, df_properties, on='Station_Name', how='left')
# Print merged DataFrame
print(merged_df)

# Save merged DataFrame to CSV
merged_df.to_csv('merged_data.csv', index=False)