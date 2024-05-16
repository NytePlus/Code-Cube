import config
from datetime import datetime
from sqlalchemy import BLOB, and_
from flask import Flask, jsonify, request
from flask_cors import CORS
from peft import AutoPeftModelForCausalLM, PeftModelForCausalLM
from transformers import AutoTokenizer, AutoModel
from flask_sqlalchemy import SQLAlchemy

def filter_utf8mb3(s):
    filtered_string = ''
    for char in s:
        codepoint = ord(char)
        if codepoint <= 0xFFFF:  # utf8mb3能表示的Unicode码点范围是U+0000到U+FFFF
            filtered_string += char
    return filtered_string
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

app = Flask(__name__)
app.config.from_object(config)
CORS(app, resources=r'/*', supports_credentials=True)
database = SQLAlchemy(app)
chatModel, chatTokenizer = chatModel_init()

class Message(database.Model):
    __tablename__ = 'messages'
    MessageID = database.Column(database.Integer, primary_key = True, autoincrement = True)
    Content = database.Column(database.String(2000), nullable=False)
    Date = database.Column(database.DateTime, default = datetime.now)  # 入库时间字段
    Conversation = database.Column(database.Integer, database.ForeignKey('conversations.id'), nullable = False)
    User = database.Column(database.Integer, database.ForeignKey('user.userid'), nullable = False)

    def __init__(self, content, date = None, user = None, conversation = None):
        self.Content = content
        self.Date = date
        self.User = user
        self.Conversation = conversation


class User(database.Model):
    __tablename__ = 'user'
    userid = database.Column(database.Integer, primary_key=True, autoincrement=True)
    username = database.Column(database.String(80), unique=True, nullable=False)
    messages = database.relationship("Message", backref="user", lazy='dynamic')
    part_conversations = database.relationship("Conversation", secondary="user_conversations",
                                         lazy='dynamic', backref="part_users")


class Conversation(database.Model):
    __tablename__ = 'conversations'
    id = database.Column(database.Integer, primary_key=True)
    messages = database.relationship("Message", backref="conversation", lazy='dynamic')
    def __init__(self, part_users):
        self.part_users = part_users

user_conversations = database.Table("user_conversations",
                                    database.Column('part_user', database.Integer, database.ForeignKey('user.userid')),
                                    database.Column('part_conv', database.Integer, database.ForeignKey('conversations.id')))

@app.route('/conversation/agent', methods = ['POST'])
def agentHandler():
    prompt, username = request.json["content"], request.json["user"]
    response, history = chatModel.chat(chatTokenizer, prompt, history = [])
    user = User.query.filter_by(username = username).first()
    agent = User.query.filter_by(username = 'Agent').first()
    if(agent is None):
        agent = User(username = 'Agent')
        database.session.add(agent)
        database.session.commit()
    conv = Conversation.query.filter(
        and_(Conversation.part_users.any(userid = user.userid),
             Conversation.part_users.any(userid = agent.userid))).first()
    if conv is None:
        conv = Conversation([user, agent])
        database.session.add(conv)
        database.session.commit()
    query = Message(filter_utf8mb3(prompt), datetime.now(), user.userid, conv.id)
    answer = Message(filter_utf8mb3(response), datetime.now(), agent.userid, conv.id)
    database.session.add(query)
    database.session.add(answer)
    database.session.commit()
    return jsonify({"reply": response}), 200

app.run()