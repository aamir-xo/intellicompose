import pandas as pd
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import numpy as np
import random
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import GPT2Tokenizer, GPT2LMHeadModel, AdamW, get_linear_schedule_with_warmup
from tqdm import tqdm, trange
from emailprompt import *
import torch.nn.functional as F
import csv

#prompt3 = "schedule meeting. 10 am. november 10. for design engineering team"
print("Enter a prompt: ")
prompt3 = str(input())
myNewResponse = generate_response(prompt3)

print(myNewResponse)