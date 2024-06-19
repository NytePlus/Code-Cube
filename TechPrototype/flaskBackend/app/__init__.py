import subprocess
import threading

from app import config
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from peft import AutoPeftModelForCausalLM
from transformers import AutoTokenizer, AutoModel

def codeModel_init():
    codeModel_dir = '/home/wcc/HuggingFace-Download-Accelerator/hf_hub/models--THUDM--codegeex2-6b'
    codeTokenizer = AutoTokenizer.from_pretrained(codeModel_dir, trust_remote_code = True)
    codeModel = AutoModel.from_pretrained(codeModel_dir, trust_remote_code = True, device = 'cpu').half()
    codeModel = codeModel.eval()
    return codeModel, codeTokenizer

def chatModel_init():
    chatModel_dir = '/home/wcc/ChatGLM3/finetune_demo/output/checkpoint-500'
    chatModel = AutoPeftModelForCausalLM.from_pretrained(chatModel_dir, trust_remote_code=True, device ='cuda:1')
    chatTokenizer_dir = chatModel.peft_config['default'].base_model_name_or_path
    chatTokenizer = AutoTokenizer.from_pretrained(chatTokenizer_dir, trust_remote_code=True)
    return chatModel, chatTokenizer

def proxy_init():
    subprocess.run(['/home/wcc/miniconda3/envs/ChatGLM3/bin/aifd', 'run'])

app = Flask(__name__)
app.config.from_object(config)
CORS(app, resources ={r'/*'}, supports_credentials=True)
database = SQLAlchemy(app)
chatModel, chatTokenizer = chatModel_init()
thread = threading.Thread(target=proxy_init, daemon=True)
metagpt_workspace = '/tmp/pycharm_project_489/workspace/'