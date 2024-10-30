import time
import paho.mqtt.client as mqtt
from pyais import decode
file_path = 'nmea-sample.txt'  # Update this with the correct path to your file


broker =  '192.168.100.26'
port = 1883

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
unacked_publish = set()
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, reconnect_on_failure = True)
client.on_publish = on_publish
client.on_connect = on_connect
client.on_connect_fail = connect_fail_callback
client.user_data_set(unacked_publish)
client.connect_async(broker, port)
client.loop_start()

sentences = {}


with open(file_path, 'r') as file:
    for line in file:
        try:
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
                # Publish decoded data to MQTT broker
                msg_info = client.publish("dulieu", str(decoded_data), qos=2)
                with open('output.txt', 'a') as file:
                    file.write(f"Decoded AIS data: {decoded_data}\n")
                unacked_publish.add(msg_info.mid)
                # Wait until the message is published
                msg_info.wait_for_publish()
                print("Message published successfully.")
        except Exception as e:
            print(f"Error decoding or publishing AIS message: {e}")
            if "The client is not currently connected" in str(e):
                client.disconnect()
                client.connect_async(broker, port)
        time.sleep(2)
# while True:
#     msg_info = client.publish("dulieu", "tesst", qos=2)
#     unacked_publish.add(msg_info.mid)
#     while len(unacked_publish):
#         time.sleep(0.1)
#     msg_info.wait_for_publish()
#     time.sleep(30)