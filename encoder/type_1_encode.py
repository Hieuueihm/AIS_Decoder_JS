from pyais.messages import MessageType1
from pyais.encode import encode_msg

def encode_ais_type1(mmsi, nav_status, rot, sog, position_accuracy, lon, lat, cog, hdg, timestamp):
    # Create an AIS message type 1 object
    msg = MessageType1.create(
        mmsi=mmsi,
        nav_status=nav_status,
        rot=rot,
        sog=sog,
        position_accuracy=position_accuracy,
        lon=lon,
        lat=lat,
        cog=cog,
        hdg=hdg,
        timestamp=timestamp,
        spare=0,
        raim_flag=False,
        sync_state=0,
        slot_timeout=0,
        sub_message=0
    )
    
    # Encode the message
    encoded = encode_msg(msg)
    return encoded

# # Example usage
# encoded_message = encode_ais_type1(
#     mmsi=123456789,
#     nav_status=0,
#     rot=0,
#     sog=102,  # Speed over ground (0.1 knots steps)
#     position_accuracy=1,
#     lon=102.3,  # Longitude in 1/10000 minutes
#     lat=24.1,  # Latitude in 1/10000 minutes
#     cog=3600,       # Course over ground (0.1 degrees steps)
#     hdg=511,        # True heading
#     timestamp=50    # Time stamp (0-59 seconds)
# )

# print(encoded_message)
