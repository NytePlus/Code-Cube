from datetime import datetime

import config
from flask import Flask, jsonify, request
from flask_cors import CORS
from peft import AutoPeftModelForCausalLM, PeftModelForCausalLM
from transformers import AutoTokenizer, AutoModel
from flask_sqlalchemy import SQLAlchemy

codeModel_dir = '/home/wcc/HuggingFace-Download-Accelerator/hf_hub/models--THUDM--codegeex2-6b'
codeTokenizer = AutoTokenizer.from_pretrained(codeModel_dir, trust_remote_code = True)
codeModel = AutoModel.from_pretrained(codeModel_dir, trust_remote_code = True, device = 'cpu').half()
codeModel = codeModel.eval()

chatModel_dir = '/home/wcc/ChatGLM3/finetune_demo/output/checkpoint-500'
chatModel = AutoPeftModelForCausalLM.from_pretrained(chatModel_dir, trust_remote_code=True, device ='cuda:1')
chatTokenizer_dir = chatModel.peft_config['default'].base_model_name_or_path
chatTokenizer = AutoTokenizer.from_pretrained(chatTokenizer_dir, trust_remote_code=True)

app = Flask(__name__)
app.config.from_object(config)
CORS(app, resources=r'/*', supports_credentials=True)
# database = SQLAlchemy(app)


# 创建表模型类对象
# class Message(database.Model):
#     __tablename__ = 'Message'
#     MessageID = database.Column(database.Integer, primary_key = True, autoincrement = True)
#     Path = database.Column(database.String(255), nullable = False)
#     UserID = database.Column(database.Integer, database.ForeignKey('user.id'), nullable = False)
#     ConversationID = database.Column(database.Integer, database.ForeignKey('conversation.id'), nullable = False)
#     Content = database.Column(database.String(2000), nullable = False)
#     MessageDate = database.Column(database.DateTime, default = datetime.now)  # 入库时间字段


@app.route('/conversation/agent', methods = ['POST'])
def agent():
    prompt = request.json["content"]
    # inputs = chatTokenizer.encode(prompt, return_tensors="pt").to(chatModel.device)
    # outputs = chatModel.generate(inputs, pad_token_id=chatTokenizer.eos_token_id, max_length = 400, top_k = 0, top_p = 0.95)
    # response = chatTokenizer.decode(outputs[0])
    response, history = chatModel.chat(chatTokenizer, prompt, history=[])
    print(response)
    # message = Message(None, '/~/Conversation/Agent', )
    # database.session.add()
    return jsonify({"reply": response}), 200

app.run()