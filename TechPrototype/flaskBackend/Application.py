import torch
from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModel

model_dir = '/home/wcc/HuggingFace-Download-Accelerator/hf_hub/models--THUDM--codegeex2-6b'
tokenizer = AutoTokenizer.from_pretrained(model_dir, trust_remote_code = True)
model = AutoModel.from_pretrained(model_dir, trust_remote_code = True, device = 'cuda').half()
model = model.eval()

app = Flask(__name__)
CORS(app, resources=r'/*', supports_credentials=True)

@app.route('/conversation/agent', methods = ['POST'])
def agent():
    prompt = request.json["content"]
    inputs = tokenizer.encode(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(inputs, pad_token_id=tokenizer.eos_token_id, max_length = 400, top_k = 0, top_p = 0.95)
    response = tokenizer.decode(outputs[0])
    print(response)
    return jsonify({"reply": response}), 200



app.run()