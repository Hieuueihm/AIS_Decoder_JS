import time
from pyais import decode
import os
import socket
file_path = 'My/nmea-sample.txt'  # Update this with the correct path to your file

HOST = '192.168.235.128'  
PORT = 8001    

def get_sentence_info(data):
    parts = data.split(',')
    if len(parts) > 1:
        return parts[1][0],parts[2][0],parts[3]
    return None

def on_publish(client, userdata, mid, reason_code, properties):
    try:
        print(f"publish data {reason_code}")
        userdata.remove(mid)
    except KeyError:
        print("on_publish() is called with a mid not present in unacked_publish")
        print("This is due to an unavoidable race-condition:")
        print("* publish() return the mid of the message sent.")
        print("* mid from publish() is added to unacked_publish by the main thread")
        print("* on_publish() is called by the loop_start thread")
        print("While unlikely (because on_publish() will be called after a network round-trip),")
        print(" this is a race-condition that COULD happen")
        print("")
        print("The best solution to avoid race-condition is using the msg_info from publish()")
        print("We could also try using a list of acknowledged mid rather than removing from pending list,")
        print("but remember that mid could be re-used !")
def on_connect(client, userdata, flags, reason_code, properties):
    print(f"Connected with result code {reason_code}")
def connect_fail_callback(client, userdata):
    print(f"Connected failed")
    pass
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = (HOST, PORT)
print('connecting to %s port ' + str(server_address))
s.connect(server_address)

sentences = {}


try:
    while True:
        with open(file_path, 'r') as file:
            for line in file:
                max_fragments,current_fragments ,multisentence_id = get_sentence_info(line)
                print(f'max_fragment: {max_fragments},current_fragment: {current_fragments} ,multisentence_id: {multisentence_id}')
                    # multi fragments
                    # append the current sentence to the message[id] array
                    # if max_fragments == current_fragments => decode -> pub 
                if int(max_fragments) != 1 and int(current_fragments) == 1:
                    sentences[multisentence_id] = []
                if int(max_fragments) != 1 :
                    sentences[multisentence_id].append(line.strip())
                    if int(current_fragments) == int(max_fragments):
                        message = decode(*sentences[multisentence_id])
                        del sentences[multisentence_id]
                    else:
                        continue
                else :
                    message = decode(line.strip())
                if message:
                    # Convert decoded message to JSON format
                    decoded_data = message.asdict()
                    print(f"Decoded AIS data: {decoded_data}")
                    encoded_msg = str(line.strip())
                    
                    encoded_msg = encoded_msg.encode('utf-8','strict')
                    print(f"Message send {encoded_msg}")

                    s.sendall(encoded_msg) # utf8
                    with open('output.txt', 'a') as file:
                        file.write(f"Decoded AIS data: {decoded_data}\n")
                    # Wait until the message is published
                    print("Message published successfully.")                    
                time.sleep(2)
finally:
    s.close()


