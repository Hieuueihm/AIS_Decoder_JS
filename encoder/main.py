import csv
from type_1_encode import encode_ais_type1
from type_5_encode import encode_ais_type5
import pandas as pd
from collections import defaultdict


lengths = {}  # Initialize lengths as a dictionary
unique_rows_new = {}
def csv_preprocess(inputfile, outputfile, input_file_1):
    unique_rows={}
    with open(inputfile, mode='r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[1] not in unique_rows:
                unique_rows[row[1]] = []
            unique_rows[row[1]].append(row[3])  # Add the row if row[1] is not already in unique_rows
    for key, value in unique_rows.items():
        unique_rows[key] = sorted(value, reverse=True)[0]
    with open(input_file_1, mode='r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            unique_rows_new[row[1]] = row  # Add the row if row[1] is not already in unique_rows
    # Write the unique rows to a new CSV file
    with open(outputfile, mode='w', newline='') as new_file:
        csv_writer = csv.writer(new_file)
        print(unique_rows_new.__len__())
        for i, (key, value) in enumerate(unique_rows_new.items()):
            # csv_writer.writerow([lengths[key], value])
            # print(unique_rows[key])
            # pass
            combined_row = unique_rows_new[key] + [unique_rows[key]]
            csv_writer.writerow(combined_row)

# lengths = {}  # Initialize lengths as a dictionary
# unique_rows_new = {}
def csv_preprocess_1(inputfile, outputfile, input_file_1):
    unique_rows={}
    with open(inputfile, mode='r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[1] not in unique_rows:
                unique_rows[row[1]] = []
            unique_rows[row[1]].append(row[6])  # Add the row if row[1] is not already in unique_rows
    for key, value in unique_rows.items():
        unique_rows[key] = sorted(value, reverse=True)[0]
    with open(input_file_1, mode='r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            unique_rows_new[row[1]] = row  # Add the row if row[1] is not already in unique_rows
    # Write the unique rows to a new CSV file
    with open(outputfile, mode='w', newline='') as new_file:
        csv_writer = csv.writer(new_file)
        print(unique_rows_new.__len__())
        for i, (key, value) in enumerate(unique_rows_new.items()):
            # csv_writer.writerow([lengths[key], value])
            # print(unique_rows[key])
            # pass
            combined_row = unique_rows_new[key] + [unique_rows[key]]
            csv_writer.writerow(combined_row)
def encode_msg(inputfile, outputfile):
    with open(inputfile, mode='r') as file:
        csv_reader = csv.reader(file)  
        i = 0
        for row in csv_reader:
            if i == 0:
                i = i + 1
                continue
            ship_type = 70
            lat = row[10]
            if float(lat) < 0 or float(lat) > 90:
                continue
            lon = row[11]
            if float(lon) > 180 or float(lon) < 0:
                continue
            if int(row[12]) > 35:
                ship_type = 80
#             def encode_ais_type1(mmsi, nav_status, rot, sog, position_accuracy, lon, lat, cog, hdg, timestamp):
#def encode_ais_type5(mmsi, shipname, callsign, destination, dim_to_bow, dim_to_stern, dim_to_port, dim_to_starboard,ship_type  ):
            print(str(row[10]))
            msg_type_1 = encode_ais_type1(mmsi = int(row[1]), nav_status= 0, rot = 0, sog = 0, position_accuracy= 0, lon=str(lon ), lat =str(lat) , cog = 0, hdg = 0, timestamp=0)
            msg_type_5 = encode_ais_type5(mmsi = int(row[1]), shipname ='', callsign= '', destination = '', dim_to_bow = int(row[12]), dim_to_port=0, dim_to_stern=int(row[4]), dim_to_starboard=0, ship_type= ship_type)
            print(msg_type_1)
            print(msg_type_5)
            with open(outputfile, mode='a', newline='') as file:
                file.write(msg_type_5[0])
                file.write('\n')
                file.write(msg_type_5[1])
                file.write('\n')
                file.write(msg_type_1[0])
                file.write('\n')

def encode_msg_1(inputfile, outputfile):
    with open(inputfile, mode='r') as file:
        csv_reader = csv.reader(file)
        i = 0
        for row in csv_reader:

            if i == 0:
                i = i + 1
                continue
            ship_type = 30
            lat = row[9]
            if float(lat) < 0 or float(lat) > 90:
                continue
            lon = row[10]
            if float(lon) > 180 or float(lon) < 0:
                continue
            if float(row[11]) > 35:
                ship_type = 37
#             def encode_ais_type1(mmsi, nav_status, rot, sog, position_accuracy, lon, lat, cog, hdg, timestamp):
#def encode_ais_type5(mmsi, shipname, callsign, destination, dim_to_bow, dim_to_stern, dim_to_port, dim_to_starboard,ship_type  ):
            print(str(row[10]))
            msg_type_1 = encode_ais_type1(mmsi = int(row[1]), nav_status= 0, rot = 0, sog = 0, position_accuracy= 0, lon=str(lon ), lat =str(lat) , cog = 0, hdg = 0, timestamp=0)
            msg_type_5 = encode_ais_type5(mmsi = int(row[1]), shipname ='', callsign= '', destination = '', dim_to_bow = float(row[11]), dim_to_port=0, dim_to_stern=0, dim_to_starboard=0, ship_type= ship_type)
            print(msg_type_1)
            print(msg_type_5)
            with open(outputfile, mode='a', newline='') as file:
                file.write(msg_type_5[0])
                file.write('\n')
                file.write(msg_type_5[1])
                file.write('\n')
                file.write(msg_type_1[0])
                file.write('\n')        
input_file_name = 'AIS (1) (1).csv'
output_csv_file = 'unique_ais.csv'
output_file_name = 'output_ais.txt' 
input_rada_file = 'Radar (1) (1).csv'
output_csv_rada_file = 'output_radar.csv'
output_file_rada_name  = 'output_radar_1.txt'
# csv_preprocess(input_file_name, output_csv_file, 'output_ais_new.csv')
csv_preprocess_1(input_rada_file, output_csv_rada_file, 'output_radar_new.csv')

# encode_msg(output_csv_file, output_file_name)
encode_msg_1(output_csv_rada_file, output_file_rada_name)
# import pandas as pd

# # Đọc file Excel
# df = pd.read_csv('Radar (1) (1).csv')

# # Nhóm theo ID radar và tìm hàng có length lớn nhất
# result_df = df.loc[df.groupby('ID radar')['timestamp'].idxmax()]
# # print(result_df.loc[6])
# # Ghi vào file mới
# result_df.to_csv('output_radar_new.csv', index=False)
