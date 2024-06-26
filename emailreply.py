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

print("Enter an email: ")
replyInput = str(input())
print("Choose a response style:\n1. Positive acknowledgement\n2. Negative acknowledgement")
replyStyle = int(input())
#print(replyStyle)
myReply = generate_reply(replyInput, replyStyle)

print(myReply)