# List of AIS messages
import serial
import time
import socket
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = ('171.251.89.96', 8912) 
client_socket.connect(server_address)
bu = []
data = [
    # "!AIVDM,1,1,,B,H8Sje5U60000000PPPPPPP7P?330,0*57"
    "!AIVDM,1,1,,B,B8SjbDP001q4vAS1<hf@ekuTSP06,0*69"
    # "!AIVDM,1,1,,A,H8SjaIE@00000008@Pjqop8h?550,0*01"
    # "!AIVDM,1,1,,A,H8SjbDPdTDr04pR3KJ222222220,2*39"
    ]
# client_socket.sendall(data[0].encode('utf-8'))

def reconnect_socket():
    global client_socket
    while True:
        try:
            client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client_socket.connect(('117.1.29.217', 30052))  # Replace with your server IP and port
            print("Reconnected to the server.")
            for data in bu:
                client_socket.sendall(data.encode('utf-8'))
            bu.clear()
            break
        except socket.error as e:
            print(f"Reconnection failed: {e}. Retrying in 5 seconds...")
            client_socket.close()
            time.sleep(5)
ais_data = ["!AIVDM,1,1,,B,H8Sje5U60000000PPPPPPP7P?330,0*57\r\n",
"!AIVDM,1,1,,B,B8SjaI@0EQpw2c31H6AH56H4SP06,0*73\r\n",
"!AIVDM,1,1,,A,H8SjaIE@00000008@Pjqop8h?550,0*01\r\n",
"!AIVDM,1,1,,B,B8SjaI@0Eipw>>S1FL1GE5aTSP06,0*4B\r\n",
"!AIVDM,1,1,,A,B8SjaI@0Fipwc031BbuDU3pTSP06,0*12\r\n",
"!AIVDM,1,1,,B,B8SjaI@0GQpwpnS1A6=CU2aTSP06,0*0D\r\n",
"!AIVDM,1,1,,B,H8SjaIA1A>3;B22222222222220,2*01\r\n",
"!AIVDM,1,1,,B,H8SjaIE@00000008@Pjqop8h?550,0*02\r\n",
"!AIVDM,1,1,,A,B8SjaI@0H1q03131@1AAi1:TSP06,0*47\r\n",
"!AIVDM,1,1,,B,B8SjaI@0H1q07v31?QiA90q4SP06,0*4A\r\n",
"!AIVDM,1,1,,A,B8SjaI@0H1q0=DS1?1E@U0:TSP06,0*1B\r\n",
"!AIVDM,1,1,,B,B8SjaI@0Giq0BO31>RE@=0ITSP06,0*22\r\n",
"!AIVDM,1,1,,B,B8SjaI@0GAq0Lm31=V1?8wITSP06,0*68\r\n",
"!AIVDM,1,1,,A,B8SjaI@0Eiq0c`31<Cq>Lvb4SP06,0*08\r\n",
"!AIVDM,1,1,,B,B8SjaI@0E1q0rV31;6=<luJ4SP06,0*43\r\n",
"!AIVDM,1,1,,B,B8SjaI@0DAq0w@S1:h1<<tbTSP06,0*0B\r\n",
"!AIVDM,1,1,,B,B8SjaI@0Ciq18vS1:5A:Tsc4SP06,0*79\r\n",
"!AIVDM,1,1,,B,B8SjaI@0CQq1BDS19Mu:HsbTSP06,0*3B\r\n",
"!AIVDM,1,1,,A,B8SjaI@0CQq1GA319:59Trr4SP06,0*01\r\n",
]


# Append \r\n to each message and store in a list
# ais_data_with_newline = [line + '\r\n' for line in ais_data]

# Print the result
# for line in ais_data_with_newline:
#     print(repr(line))

# data = "!AIVDM,1,1,,B,B8SjaI@0E1q0rV31;6=<luJ4SP06,0*43\r\n"
# for i  in range(0, 20):
#     time.sleep(1)
#     print(ais_data[i])
#     try:
#         client_socket.sendall(ais_data[i].encode('utf-8'))
#         print(f"Sent: {ais_data[i]}")
#     except socket.error as e:
#         print(f"Error sending message: {e}. Reconnecting...")
#         reconnect_socket()
# datas = [
#     # "!AIVDM,1,1,,B,C69DqeP0Ar8;JH3R6<4O7wWPl@:62L>jcaQgh0000000?104222P,0*32" 
#     "!AIVDM,1,1,,B,38SK5`jP007b1:0<0OJk3wwV00:k,0*61"
# #     "!AIVDM,2,1,0,B,58SJ;b02<IE1QH=R2211A>0P4V10PtpN33:2221@9hF3<6LeN?j3k`1hB@00,0*4E",
# # "!AIVDM,2,2,0,B,00000000000,2*27",
# # "!AIVDM,1,1,,B,18SJ;b00?w`PeaP>8HhOwwwp0000,0*2E",
# # "!AIVDM,1,1,,B,58SJ;b02<IE1QH=R2211A>0P4V10PtpN33:2221@9hF3<6LeN?j3k`1hB@0000000000000,0*4D"
# ]
# client_socket.sendall(datas[0].encode('utf-8'))

# datas  = [
#     "!AIVDM,2,2,0,B,00000000000,2*27",
# "!AIVDM,1,1,,B,18SJ;b00?w`PeaP>8HhOwwwp0000,0*2E",
# ]
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

# # Open the serial port
# ser = serial.Serial(
#     port='COM4',  # Change this to your specific COM port, e.g., 'COM3' on Windows or '/dev/ttyUSB0' on Linux
#     baudrate=38400,  # Set baud rate to 38400
#     bytesize=serial.EIGHTBITS,  # 8 data bits
#     parity=serial.PARITY_NONE,  # No parity
#     stopbits=serial.STOPBITS_ONE,  # 1 stop bit
#     timeout=1,  # Timeout for reading (in seconds)
#     xonxoff=False,  # Disable software flow control
#     rtscts=False,  # Disable hardware (RTS/CTS) flow control
#     dsrdtr=False   # Disable hardware (DSR/DTR) flow control
# )

# # # print("Reading from COM port...")
# try:
#     while True:
#         # Read a line from the serial port
#         data = ser.readline().decode('utf-8')
#         if data:
#             print(f"Received: {data}")
#             with open("test.txt", "a") as file:
#                 file.write(data)
#             msgs_format = data.split(',')
#             print(msgs_format)
            
#             if msgs_format[1] != '1':
#                 if msgs_format[2] == '1':
#                     if msgs_format[3] not in buffer:
#                         buffer[msgs_format[3]] = []
#                     buffer[msgs_format[3]].append(data)
#                 elif msgs_format[2] != msgs_format[1]:
#                     buffer[msgs_format[3]].append(data)
#                 elif msgs_format[2] == msgs_format[1]:
#                     buffer[msgs_format[3]].append(data)
#                     new_msgs = combine_message(buffer[msgs_format[3]])
#                     del buffer[msgs_format[3]]
#                     try:
#                         # client_socket.sendall(new_msgs.encode('utf-8'))
#                         print(f"Sent: {new_msgs}")
#                     except socket.error as e:
#                         bu.append(new_msgs)
#                         print(f"Error sending message: {e}. Reconnecting...")
#                         # reconnect_socket()
#             else:
#                 try:
#                     # client_socket.sendall(data.encode('utf-8'))
#                     print(f"Sent: {data}")
#                 except socket.error as e:
#                     bu.append(data)
#                     print(f"Error sending message: {e}. Reconnecting...")
#                     # reconnect_socket()

# except KeyboardInterrupt:
#     print("Stopped reading.")
# finally:
#     ser.close()
#     client_socket.close()
count= 0
try:
    with open('clean_output.txt', 'r') as file:
        # Read each line in the file one by one
        
        data = file.readline()
        print("data: ", data)

        while data:
            time.sleep(0.1)
            client_socket.sendall(data.encode('utf-8'))
            print(f"Sent: {data}")

            # Process the line (print it in this case)

            # msgs_format =  data.split(',')
            # print(msgs_format)
            # if(msgs_format[1] != '1'):
            #     if(msgs_format[2] == '1'):
            #         if msgs_format[3] not in buffer:
            #             buffer[msgs_format[3]] = []
            #         buffer[msgs_format[3]].append(data)
            #     elif(msgs_format[2] != msgs_format[1]):
            #         buffer[msgs_format[3]].append(data)
            #     elif(msgs_format[2] ==  msgs_format[1]):
            #         buffer[msgs_format[3]].append(data)
            #         new_msgs = combine_message(buffer[msgs_format[3]])
            #         del buffer[msgs_format[3]]
            #         new_msgs = new_msgs + '\r\n'
            #         try:
            #             count+=1
            #             client_socket.sendall(new_msgs.encode('utf-8'))                     
            #             print(f"Sent: {new_msgs}")
            #         except socket.error as e:
            #             bu.append(new_msgs)
            #             print(f"Error sending message: {e}. Reconnecting...")
            #             reconnect_socket()
            # else:
            #     try:
            #         count += 1
            #         client_socket.sendall(data.encode('utf-8'))
            #         print(count)
            #         print(f"Sent: {data}")
            #     except socket.error as e:
            #         bu.append(data)
            #         print(f"Error sending message: {e}. Reconnecting...")
            #         reconnect_socket()
            data = file.readline()
    print(count)

except KeyboardInterrupt:
    print("Stopped reading.")
    print(count)

finally:
    client_socket.close()

