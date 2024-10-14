with open('encoder/output_ais.txt', 'r') as file:
    data = file.readline()
    i = 0
    while(data):
        data = data.strip()
        with open('test_2.txt', 'a') as file1:
            file1.write(data)
            file1.write(f'{i}')
            file1.write('\n')
        data = file.readline()
        i = i  + 1