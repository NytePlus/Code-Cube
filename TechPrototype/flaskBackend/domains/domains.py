from app import database
from datetime import datetime
'''
foreign key中填写表的列名
实体类中的变量名应与表列名保持一致
'''

class User(database.Model):
    __tablename__ = 'user'

    userid = database.Column(database.Integer, primary_key=True, autoincrement=True)
    username = database.Column(database.String)
    avatar = database.Column(database.String)
    introduction = database.Column(database.String)

    # One-to-Many relationships
    init_repository_list = database.relationship('Repo', backref = 'init_user', lazy = True)
    message_list = database.relationship('Message', lazy = True)
    part_conversation_list = database.relationship('Conversation', secondary = 'user_conversations', backref = 'part_users')

    def __init__(self, username, avatar, introduction):
        self.username = username
        self.avatar = avatar
        self.introduction = introduction

class Message(database.Model):
    __tablename__ = 'messages'
    id = database.Column(database.Integer, primary_key = True, autoincrement = True)
    Content = database.Column(database.String(2000), nullable=False)
    Date = database.Column(database.DateTime, default = datetime.now)
    Conversation = database.Column(database.Integer, database.ForeignKey('conversations.id'), nullable = False)
    user = database.Column(database.Integer, database.ForeignKey('user.userid'), nullable = False)

    def __init__(self, content, date = None, user = None, conversation = None):
        self.Content = content
        self.Date = date
        self.user = user
        self.Conversation = conversation

class Conversation(database.Model):
    __tablename__ = 'conversations'
    id = database.Column(database.Integer, primary_key=True)
    messages = database.relationship("Message", backref="conversation", lazy='dynamic')
    def __init__(self, part_users):
        self.part_users = part_users

user_conversations = database.Table("user_conversations",
                                    database.Column('part_user', database.Integer, database.ForeignKey('user.userid')),
                                    database.Column('part_conv', database.Integer, database.ForeignKey('conversations.id')))

user_repositories = database.Table('user_repositories',
    database.Column('star_user', database.Integer, database.ForeignKey('user.userid')),
    database.Column('star_repo', database.String, database.ForeignKey('repositories.path')))

repo_tags = database.Table('repo_tags',
                           database.Column('repo', database.String, database.ForeignKey('repositories.path')),
                           database.Column('tag', database.String, database.ForeignKey('tags.name')))
class Folder(database.Model):
    __tablename__ = 'folders'

    path = database.Column(database.String, primary_key=True)
    name = database.Column(database.String)

    # One-to-Many relationship with itself (subfolders)
    folderList = database.relationship('Folder')

    # One-to-Many relationship with File model
    fileList = database.relationship('File', backref='folder')

    # Many-to-One relationship with itself (parent folder)
    parent_path = database.Column(database.String, database.ForeignKey('folders.path'))
    parent_folder = database.relationship('Folder')

    def __init__(self, path, name):
        self.path = path
        self.name = name

class File(database.Model):
    __tablename__ = 'files'

    path = database.Column(database.String, primary_key=True)
    name = database.Column(database.String)
    type = database.Column(database.String)
    size = database.Column(database.Integer)
    content = database.Column(database.LargeBinary)

    # Many-to-One relationship with Folder model
    parent_path = database.Column(database.String, database.ForeignKey('folders.path'))

    def __init__(self, path, name, type, size, content, parent_path):
        self.path = path
        self.name = name
        self.type = type
        self.size = size
        self.content = content
        self.parent_path = parent_path

class Tag(database.Model):
    __tablename__ = 'tags'
    name = database.Column(database.String, primary_key=True)
    # Many-to-Many relationship with Repo model (tagRepoList)
    tag_repo_list = database.relationship('Repo', secondary = 'repo_tags')
    def __init__(self, name):
        self.name = name

class Repo(database.Model):
    __tablename__ = 'repositories'

    path = database.Column(database.String, primary_key=True)
    name = database.Column(database.String)
    introduction = database.Column(database.String)
    star = database.Column(database.Integer)
    publish = database.Column(database.Boolean)
    date = database.Column(database.Date)

    # One-to-One relationship with Folder model
    folder_path = database.Column(database.String, database.ForeignKey('folders.path'))
    folder = database.relationship('Folder', backref='repo', uselist=False)

    # Many-to-One relationship with User model
    init_user_id = database.Column(database.Integer, database.ForeignKey('user.userid'))

    # Many-to-Many relationship with Tag model (repoTagList)
    repo_tag_list = database.relationship('Tag', secondary = 'repo_tags')

    def __init__(self, path, name, introduction, star, publish, date):
        self.path = path
        self.name = name
        self.introduction = introduction
        self.star = star
        self.publish = publish
        self.date = date
