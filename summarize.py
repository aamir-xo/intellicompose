from transformers import T5Tokenizer, T5ForConditionalGeneration

# Load pre-trained T5 model and tokenizer
model_name = "t5-small"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Input text to be summarized
input_text = """
Hey Pratik,

I just had to drop you a quick email to thank you for your help after hours. 

Your support and help helped us meet our deadline, and we are happy to have you as part of our company.

Please let us know if there’s anything we can do to return the favor. 

Thanks again for being awesome!

Warmest regards,
Vaishnavi
"""

# Tokenize and summarize the input text using T5
inputs = tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=1024, truncation=True)
summary_ids = model.generate(inputs, max_length=15, min_length=5, length_penalty=2.0, num_beams=4, early_stopping=True)

# Decode and output the summary
summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
print("Original Text:")
print(input_text)
print("\nSummary:")
print(summary)