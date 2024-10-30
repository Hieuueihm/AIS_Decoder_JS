import serial
import time
import paho.mqtt.client as mqtt
from pyais import decode

# Configuration
SERIAL_PORT = '/dev/ttyS0' 
MQTT_BROKER = '192.168.1.12'
MQTT_PORT = 1883
MQTT_TOPIC = 'dulieu'
BAUD_RATE = 38400
# MQTT Callbacks
def on_publish(client, userdata, mid, reason_code, properties=None):
    print(f"Message published: MID={mid}, Reason Code={reason_code}")

def on_connect(client, userdata, flags, reason_code, properties=None):
    print(f"Connected with result code {reason_code}")

# Configure MQTT client
client = mqtt.Client()
client.on_publish = on_publish
client.on_connect = on_connect
client.connect(MQTT_BROKER, MQTT_PORT)
client.loop_start()

# Configure Serial port -- connect with ais receiver
try:
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    print(f"Serial port {SERIAL_PORT} configured to {BAUD_RATE} baud.")
except serial.SerialException as e:
    print(f"Error opening serial port: {e}")
    exit(1)

try:
    while True:
        # if has new message
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8', errors='ignore').strip()
            if line:
                try:
                    # message decode
                    message = decode(line)
                    if message:
                        decoded_data = message.asdict()
                        print(f"Decoded AIS data: {decoded_data}")
                        msg_info = client.publish(MQTT_TOPIC, str(decoded_data), qos=2)
                        msg_info.wait_for_publish()
                        print("Message published successfully.")
                except Exception as e:
                    print(f"Error decoding or publishing AIS message: {e}")
except KeyboardInterrupt:
    print("\nStopping data reception.")
finally:
    ser.close()
    client.loop_stop()
    client.disconnect()
    print("Serial port closed and MQTT client disconnected.")
