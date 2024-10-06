from pyais import decode
import time
def get_sentence_info(data):
    parts = data.split(',')
    if len(parts) > 1:
        return parts[1][0],parts[2][0],parts[3]
    return None
sentences = {}
def decode_ais_messages(input_file, output_file):
   with open(input_file, 'r') as file:
    for line in file:
        try:
            line = line
            max_fragments,current_fragments ,multisentence_id = get_sentence_info(line)
            # print(f'max_fragment: {max_fragments},current_fragment: {current_fragments} ,multisentence_id: {multisentence_id}')
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
     
                with open(output_file, 'a') as file:
                    file.write(f'{str(decoded_data)} - {line}')
               
        except Exception as e:
            print(f"Error decoding or publishing AIS message: {e}")
          
        time.sleep(2)

# Specify the input and output file names
input_file = 'clean_output.txt'
output_file = 'output.txt'

# Decode AIS messages and write to output file
decode_ais_messages(input_file, output_file)
