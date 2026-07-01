import fitz
import re
import glob

all_roll_numbers = set()
pattern = re.compile(r'\b\d{16}\b')

for pdf_path in glob.glob("*.pdf"):
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
