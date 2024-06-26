import pandas as pd
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import numpy as np
import random
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import GPT2Tokenizer, GPT2LMHeadModel, AdamW, get_linear_schedule_with_warmup
from tqdm import tqdm, trange
import torch.nn.functional as F
import csv

emailData = pd.read_csv('C:\Aamir - Silverwing/BE - Study resources/EMailGPT/new_emailData.csv')

class emailDataClass(Dataset):  
    def __init__(self, control_code, truncate=False, gpt2_type="gpt2", max_length=1024):

        self.tokenizer = GPT2Tokenizer.from_pretrained(gpt2_type)
        self.emailTokens = []

        for row in emailData['extracted_content']:
          self.emailTokens.append(torch.tensor(
                self.tokenizer.encode(f"<|{control_code}|>{row[:max_length]}<|endoftext|>")
            ))               
        if truncate:
            self.emailTokens = self.emailTokens[:20000]
        self.emailTokens_count = len(self.emailTokens)
        
    def __len__(self):
        return self.emailTokens_count

    def __getitem__(self, item):
        return self.emailTokens[item]
    
dataset = emailDataClass(emailData['extracted_content'], truncate=True, gpt2_type="gpt2")  
