import fitz
import re
import glob

all_roll_numbers = set()
pattern = re.compile(r'\b\d{16}\b')

import csv

for pdf_path in glob.glob("*.pdf"):
    if "Patna" in pdf_path:
        print(f"Skipping {pdf_path} for now")
        continue
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text = page.get_text()
            matches = pattern.findall(text)
            for match in matches:
                all_roll_numbers.add(match)
        print(f"Extracted from {pdf_path}")
    except Exception as e:
        print(f"Error processing {pdf_path}: {e}")

for csv_path in glob.glob("*.csv"):
    if "Patna" in csv_path:
        print(f"Skipping {csv_path} for now")
        continue
    try:
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            for row in reader:
                for cell in row:
                    matches = pattern.findall(cell)
                    for match in matches:
                        all_roll_numbers.add(match)
        print(f"Extracted from {csv_path}")
    except Exception as e:
        print(f"Error processing {csv_path}: {e}")


sorted_rolls = sorted(list(all_roll_numbers))

with open("data.js", "w") as f:
    f.write('const qualifiedRollNumbers = new Set([\n')
    for i, r in enumerate(sorted_rolls):
        if i < len(sorted_rolls) - 1:
            f.write(f'  "{r}",\n')
        else:
            f.write(f'  "{r}"\n')
    f.write(']);\n')

print(f"Total roll numbers extracted: {len(sorted_rolls)}")
