# List of AIS messages
import serial
import time
import socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = ('117.1.29.217', 30052) 
client_socket.connect(server_address)
# datas = [
#     "!AIVDM,1,1,,B,C69DqeP0Ar8;JH3R6<4O7wWPl@:62L>jcaQgh0000000?104222P,0*32" 
#     # "!AIVDM,1,1,,B,38SK5`jP007b1:0<0OJk3wwV00:k,0*61"
# #     "!AIVDM,2,1,0,B,58SJ;b02<IE1QH=R2211A>0P4V10PtpN33:2221@9hF3<6LeN?j3k`1hB@00,0*4E",
# # "!AIVDM,2,2,0,B,00000000000,2*27"
# # "!AIVDM,1,1,,B,58SJ;b02<IE1QH=R2211A>0P4V10PtpN33:2221@9hF3<6LeN?j3k`1hB@0000000000000,0*4D"
# ]
# client_socket.sendall(datas[0].encode('utf-8'))


def calculate_checksum(data):
    checksum = 0
    for char in data:
        checksum ^= ord(char)
    return checksum

def combine_message(msgs):
    format1 = msgs[0].split(',')
    payload1 = msgs[0].split(',')[5]
    payload2 = msgs[1].split(',')[5]
    combined_payload = payload1 + payload2
    new_msg = f"AIVDM,1,1,,{format1[4]},{combined_payload},0"

    new_checksum = calculate_checksum(new_msg)
    new_checksum_hex = format(new_checksum, '02X')

    new_msg = "!" + new_msg +"*"+ str(new_checksum_hex)
    return new_msg

buffer = {}

# print(combine_message(datas))
# for data in datas:
#     print(f"Received: {data}")
#     with open("test.txt", "a") as file:
#         file.write(data)
#     msgs_format =  data.split(',')
#     print(msgs_format)
#     if(msgs_format[1] != '1'):
#         if(msgs_format[2] == '1'):
#             if msgs_format[3] not in buffer:
#                 buffer[msgs_format[3]] = []
#             buffer[msgs_format[3]].append(data)
#         elif(msgs_format[2] != msgs_format[1]):
#             buffer[msgs_format[3]].append(data)
#         elif(msgs_format[2] ==  msgs_format[1]):
#             buffer[msgs_format[3]].append(data)
#             new_msgs = combine_message(buffer[msgs_format[3]])
#             del buffer[msgs_format[3]]
#             client_socket.sendall(new_msgs.encode('utf-8'))
#             print(new_msgs)
#     else:
#         client_socket.sendall(data.encode('utf-8'))
#         print(data)
# Open the serial port
# ser = serial.Serial(
#     port='/dev/ttyUSB0',  # Change this to your specific COM port, e.g., 'COM3' on Windows or '/dev/ttyUSB0' on Linux
#     baudrate=38400,  # Set baud rate to 38400
#     bytesize=serial.EIGHTBITS,  # 8 data bits
#     parity=serial.PARITY_NONE,  # No parity
#     stopbits=serial.STOPBITS_ONE,  # 1 stop bit
#     timeout=1,  # Timeout for reading (in seconds)
#     xonxoff=False,  # Disable software flow control
#     rtscts=False,  # Disable hardware (RTS/CTS) flow control
#     dsrdtr=False   # Disable hardware (DSR/DTR) flow control
# )

# print("Reading from COM port...")

# try:
#     while True:
#         # Read a line from the serial port
#         data = ser.readline().decode('utf-8').strip()
        
#         if data:
#             print(f"Received: {data}")
#             with open("test.txt", "a") as file:
#                     file.write(data)
#             msgs_format =  data.split(',')
#             print(msgs_format)
#             if(msgs_format[1] != '1'):
#                 if(msgs_format[2] == '1'):
#                     if msgs_format[3] not in buffer:
#                         buffer[msgs_format[3]] = []
#                     buffer[msgs_format[3]].append(data)
#                 elif(msgs_format[2] != msgs_format[1]):
#                     buffer[msgs_format[3]].append(data)
#                 elif(msgs_format[2] ==  msgs_format[1]):
#                     buffer[msgs_format[3]].append(data)
#                     new_msgs = combine_message(buffer[msgs_format[3]])
#                     del buffer[msgs_format[3]]
#                     client_socket.sendall(new_msgs.encode('utf-8'))
#                     print(new_msgs)
#             else:
#                 client_socket.sendall(data.encode('utf-8'))
#                 print(data)


# except KeyboardInterrupt:
#     print("Stopped reading.")

# ser.close()


with open('nmea-sample.txt', 'r') as file:
    # Read each line in the file one by one
    
    data = file.readline()

    while data:
        time.sleep(1)

        # Process the line (print it in this case)
        data  = data.strip()
        print("data: ", data)
        with open("test.txt", "a") as file1:
            file1.write(data)
        msgs_format =  data.split(',')
        print(msgs_format)
        if(msgs_format[1] != '1'):
            if(msgs_format[2] == '1'):
                if msgs_format[3] not in buffer:
                    buffer[msgs_format[3]] = []
                buffer[msgs_format[3]].append(data)
            elif(msgs_format[2] != msgs_format[1]):
                buffer[msgs_format[3]].append(data)
            elif(msgs_format[2] ==  msgs_format[1]):
                buffer[msgs_format[3]].append(data)
                new_msgs = combine_message(buffer[msgs_format[3]])
                del buffer[msgs_format[3]]
                client_socket.sendall(new_msgs.encode('utf-8'))
                print(new_msgs)
        else:
            client_socket.sendall(data.encode('utf-8'))
            print(data)
        data = file.readline()



