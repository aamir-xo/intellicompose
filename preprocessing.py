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

emailData = pd.read_csv('/kaggle/input/enron-email-dataset/emails.csv')

extracted_content = []

for message in emailData['message']:
    lines = message.split('\n')
    
    ignore = True
    
    content = ""
    
    for line in lines:
        if "X-FileName" in line:
            ignore = False
            continue  

        if not ignore:
            content += line + "\n"
    
    extracted_content.append(content)

emailData['extracted_content'] = extracted_content

for index, row in emailData.iterrows():
    emailData.at[index, 'extracted_content'] = row['extracted_content'].replace('\n', '')

columns_to_drop = ['file', 'message']

emailData.drop(columns=columns_to_drop, inplace=True)

emailData.to_csv('new_emailData.csv', index=False)

newEmailData = pd.read_csv('/kaggle/working/new_emailData.csv')

test_set = emailData.sample(n = 200)
emailData = emailData.loc[~emailData.index.isin(test_set.index)]

test_set = test_set.reset_index()
emailData = emailData.reset_index()

test_set['True_end_extracted_contents'] = test_set['extracted_content'].str.split().str[-20:].apply(' '.join)
test_set['extracted_content'] = test_set['extracted_content'].str.split().str[:-20].apply(' '.join)
