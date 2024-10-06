# Đường dẫn file đầu vào và đầu ra
input_file = 'output.txt'
output_file = 'clean_output.txt'

# Đọc nội dung từ file input
with open(input_file, 'r') as f:
    lines = f.readlines()

# Loại bỏ các dòng trống và giữ lại các dòng có nội dung
cleaned_lines = [line for line in lines if line.strip()]

# Ghi kết quả vào file output
with open(output_file, 'w') as f:
    f.writelines(cleaned_lines)

print(f"Kết quả đã được ghi vào {output_file}")
