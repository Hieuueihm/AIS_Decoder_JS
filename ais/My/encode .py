from pyais.encode import encode_dict
from pyais import decode
import random

output_file_path = 'sample_generated.txt'
# from pyais.messages import MessageType5
# from pyais.encode import encode_msg

msg_1 = {
    'type': 1,                     # Message type 1
    'repeat': 0,                   # Repeat indicator
    'mmsi': 574000030,             # Maritime Mobile Service Identity
    'status': 0,                   # Navigation status (0 = under way using engine)
    'turn': 0,                     # Rate of turn
    'speed': 1023,                 # Speed over ground (knots * 10, 1023 = not available)
    'accuracy': 1,                 # Position accuracy
    'lon': 117.99442666627	,                # Longitude (in 1/10000 minutes)
    'lat': 28.6957883333333,                # Latitude (in 1/10000 minutes)
    'course': 3600,                # Course over ground (in 1/10 degrees)
    'heading': 511,                # True heading (511 = not available)
    'second': 60,                  # Time stamp (0-59, 60 = not available)
    'maneuver': 0,                 # Maneuver indicator
    'raim': 0,                     # RAIM flag
    'radio': 0                     # Radio status
}
encoded = encode_dict(msg_1, radio_channel="A", talker_id="AIVDM")[0]
print(encoded)
with open(output_file_path, 'a') as file:
    file.write(encoded)
    file.write('\n')
# for i in range(0, 10):
#     msg_1 = {
#     'type': 1,                     # Message type 1
#     'repeat': 0,                   # Repeat indicator
#     'mmsi': int(f"5740000{random.randint(10, 99)}"),  # Append a random digit
#     'status': f'{i}',                   # Navigation status (0 = under way using engine)
#     'turn': 0,                     # Rate of turn
#     'speed': 1023,                 # Speed over ground (knots * 10, 1023 = not available)
#     'accuracy': 1,                 # Position accuracy
#     'lon': 118.32112 + i	,                # Longitude (in 1/10000 minutes)
#     'lat': 24.578833 + i,                # Latitude (in 1/10000 minutes)
#     'course': 3600,                # Course over ground (in 1/10 degrees)
#     'heading': 511,                # True heading (511 = not available)
#     'second': 60,                  # Time stamp (0-59, 60 = not available)
#     'maneuver': 0,                 # Maneuver indicator
#     'raim': 0,                     # RAIM flag
#     'radio': 0                     # Radio status
#     }
#     encoded = encode_dict(msg_1, radio_channel="A", talker_id="AIVDM")[0]
#     print(encoded)
#     with open(output_file_path, 'a') as file:
#          file.write(encoded)
#          file.write('\n')


# for i in range(200):
#     msg_1 = {
#         'type': 1,                     # Message type 1
#         'repeat': 0,                   # Repeat indicator
#         'mmsi': 574123456,             # Maritime Mobile Service Identity
#         'status': 0,                   # Navigation status (0 = under way using engine)
#         'turn': 0,                     # Rate of turn
#         'speed': 1023,                 # Speed over ground (knots * 10, 1023 = not available)
#         'accuracy': 1,                 # Position accuracy
#         'lon': 118.994426666667 +( i * 0.001)	,                # Longitude (in 1/10000 minutes)
#         'lat': 24.6957883333333 + (i * 0.001),                # Latitude (in 1/10000 minutes)
#         'course': 3600,                # Course over ground (in 1/10 degrees)
#         'heading': 120,                # True heading (511 = not available)
#         'second': 60,                  # Time stamp (0-59, 60 = not available)
#         'maneuver': 0,                 # Maneuver indicator
#         'raim': 0,                     # RAIM flag
#         'radio': 0                     # Radio status
#     }
#     encoded = encode_dict(msg_1, radio_channel="B", talker_id="AIVDM")[0]
#     with open(output_file_path, 'a') as file:
#         file.write(encoded)
#         file.write('\n')

# # Message type 5 fields

    # message_type_5 = {
    #     'mmsi': 123456789,  # Maritime Mobile Service Identity
    #     'ais_version': 2,   # AIS version
    #     'imo': 1234567,     # IMO number
    #     'callsign': 'ABCD123',   # Vessel's call sign
    #     'shipname': 'TEST VESSEL',   # Vessel name
    #     'shiptype': 70,     # Ship type (70 = Cargo ship)
    #     'to_bow': 50,       # Distance to bow
    #     'to_stern': 20,     # Distance to stern
    #     'to_port': 10,      # Distance to port side
    #     'to_starboard': 10, # Distance to starboard side
    #     'epfd': 1,          # Type of positioning device
    #     'eta_month': 10,    # Estimated Time of Arrival (month)
    #     'eta_day': 22,      # ETA (day)
    #     'eta_hour': 14,     # ETA (hour)
    #     'eta_minute': 30,   # ETA (minute)
    #     'draught': 5.2,     # Maximum draught
    #     'destination': 'HAMBURG', # Destination port
    #     'dte': 0            # DTE flag
    # }
# msg_5 = {
#     'msg_type': 5,
#     'repeat': 0
# }
# msg_type=5, repeat=0, mmsi=574000040, ais_version=0, imo=9200976, callsign='XVCX', shipname='PTS HAI PHONG 02', ship_type=<ShipType.Tanker: 80>, to_bow=78, to_stern=22, to_port=3, to_starboard=12, epfd=<EpfdType.GPS: 1>, 
# month=9, day=25, hour=13, minute=30, draught=6.3, destination='HON GAI', dte=False, spare_1=b'\x00'
# # Encode message type 5
# mmsis = ['574000030', '574000079', '574000089', '574000023', '574000050', '574000080', '574000071', '574000056', '574013035']
# shiptypes = [70, 80, 60, 30, 37, 51,  20, 35, 72]
# for i in range(0, 9):
#     msg_5 = {
#     'msg_type': 5,                # Message type (5 for Static and Voyage Data)
#     'repeat': 0,                  # Repeat indicator (default 0)
#     'mmsi': mmsis[i],            # Maritime Mobile Service Identity
#     'ais_version': 0,             # AIS version
#     'imo': 9200976,               # IMO number
#     'callsign': 'XVCX',           # Vessel's call sign
#     'shipname': 'PTS HAI PHONG 02',# Vessel name
#     'ship_type': shiptypes[i],              # Ship type (Tanker)
#     'to_bow': 78,                 # Distance to bow
#     'to_stern': 22,               # Distance to stern
#     'to_port': 3,                 # Distance to port side
#     'to_starboard': 12,           # Distance to starboard side
#     'epfd': 1,                    # Type of positioning device (GPS)
#     'month': 9,                   # ETA month
#     'day': 25,                    # ETA day
#     'hour': 13,                   # ETA hour
#     'minute': 30,                 # ETA minute
#     'draught': 6.3,               # Maximum draught
#     'destination': 'HON GAI',     # Destination port
#     'dte': 0,                     # Data terminal equipment (0 for False)
#     'spare_1': b'\x00'            # Spare bits
#     }
#     encoded = encode_dict(msg_5, radio_channel="B", talker_id="AIVDM")[0]
#     with open(output_file_path, 'a') as file:
#         file.write(encoded)
#         file.write('\n')
#     encoded = encode_dict(msg_5, radio_channel="B", talker_id="AIVDM")[1]
#     with open(output_file_path, 'a') as file:
#         file.write(encoded)
#         file.write('\n')
 
      


# msg = "!AIVDM,1,1,,B,58SJ;b02<IE1QH=R2211A>0P4V10PtpN33:2221@9hF3<6LeN?j3k`1hB@0000000000000,0*4D"
# print(decode(msg))