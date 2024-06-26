import mimetypes
import os
from flask_cors import cross_origin
from app import chatModel, chatTokenizer, app, metagpt_workspace
from domains.domains import *
from datetime import datetime
from sqlalchemy import and_
from flask import jsonify, request
from metagpt.software_company import generate_repo, ProjectRepo

def filter_utf8mb3(s):
    filtered_string = ''
    for char in s:
        codepoint = ord(char)
        if codepoint <= 0xFFFF:  # utf8mb3能表示的Unicode码点范围是U+0000到U+FFFF
            filtered_string += char
    return filtered_string

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

def findOrCreateFolder(path):
    folder = Folder.query.filter_by(path=path).first()
    if folder == None:
        parent_path = os.path.dirname(path)
        folder = Folder(path, os.path.basename(path), findOrCreateFolder(parent_path).path)
        database.session.add(folder)
    return folder

def createRepo(dir, user):
    sub_dirs = os.listdir(dir)
    for sub_dir in sub_dirs:
        real_path = os.path.join(dir, sub_dir)
        if os.path.isdir(real_path):
            createRepo(real_path, user)
        else:
            path = '/' + os.path.join(user, os.path.relpath(real_path, metagpt_workspace))
            parent_path = '/' + os.path.join(user, os.path.relpath(dir, metagpt_workspace))
            findOrCreateFolder(parent_path)
            type, _ = mimetypes.guess_type(sub_dir)
            size = os.path.getsize(real_path)
            with open(real_path, 'rb') as f:
                content = f.read()
            file = File(path, sub_dir, type, size, content, parent_path)
            database.session.add(file)

@app.route('/repoCreate/agent', methods = ['POST'])
def generateCodeHandler():
    username, path, publish, introduction, tagNameList = request.json["user"]["name"], request.json["path"], request.json["publish"], request.json["introduction"], request.json["tagNameList"]
    report: ProjectRepo = generate_repo(introduction)
    dir = report._git_repo.workdir
    user = User.query.filter_by(username = username).first()
    path = '/' + os.path.join(username, os.path.relpath(dir, metagpt_workspace))
    createRepo(dir, username)
    repo = Repo(path, os.path.basename(dir), introduction, 0, publish, datetime.now(), path, user.userid, tagNameList)
    database.session.add(repo)
    database.session.commit()
    return jsonify({"reply": str(report)}), 200

if __name__ == '__main__':
    app.run()