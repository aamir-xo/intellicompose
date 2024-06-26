from transformers import T5Tokenizer, T5ForConditionalGeneration
from emailprompt_gen import *

model_name = "t5-small"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

def generate_reply(replyInput, replyStyle):
    inputs = tokenizer.encode("summarize: " + replyInput, return_tensors="pt", max_length=1024, truncation=True)
    
    summary_ids = model.generate(inputs, max_length=15, min_length=5, length_penalty=2.0, num_beams=4, early_stopping=True)

    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    responseStyleName = "positive acknowledgement" if replyStyle == 1 else "negative acknowledgement"
    prompt = f'{summary} + {responseStyleName}'
    generate_response(f"{responseStyleName}for{summary}")