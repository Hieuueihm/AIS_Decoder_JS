from pyais.messages import MessageType5
from pyais.encode import encode_msg

def encode_ais_type5(mmsi, shipname, callsign, destination, dim_to_bow, dim_to_stern, dim_to_port, dim_to_starboard,ship_type  ):
    # Create an AIS message type 5 object with ship dimensions
    msg = MessageType5.create(
       mmsi=mmsi,
       shipname=shipname,
       callsign=callsign,
       destination=destination,
       to_bow=dim_to_bow,
       to_stern=dim_to_stern,
       to_port=dim_to_port,
       to_starboard=dim_to_starboard,
       ship_type = ship_type
    )
    
    # Encode the message
    encoded = encode_msg(msg)
    return encoded

# Example usage
# encoded_message = encode_ais_type5(
#     mmsi="123",
#     shipname="Titanic",
#     callsign="TITANIC",
#     destination="New York",
#     dim_to_bow=50,          # Example: 50 meters from bow
#     dim_to_stern=200,        # Example: 200 meters from stern
#     dim_to_port=20,          # Example: 20 meters to port
#     dim_to_starboard=20,      # Example: 20 meters to starboard,
#     ship_type = 40
# )

# print(encoded_message)
