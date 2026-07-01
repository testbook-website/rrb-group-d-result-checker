import fitz  # PyMuPDF
import re
import json
import sys

def extract_roll_numbers(pdf_path):
    doc = fitz.open(pdf_path)
    roll_numbers = set()
    # Pattern for exactly 16 digits
    pattern = re.compile(r'\b\d{16}\b')
    
    for page in doc:
        text = page.get_text()
        matches = pattern.findall(text)
        for match in matches:
            roll_numbers.add(match)
            
    return sorted(list(roll_numbers))

if __name__ == "__main__":
    pdf_path = "RRB Bhubaneshwar.pdf"
    output_path = "roll_numbers.json"
    
    roll_nums = extract_roll_numbers(pdf_path)
    
    with open(output_path, "w") as f:
        json.dump(roll_nums, f)
        
    print(f"Extracted {len(roll_nums)} roll numbers to {output_path}")
