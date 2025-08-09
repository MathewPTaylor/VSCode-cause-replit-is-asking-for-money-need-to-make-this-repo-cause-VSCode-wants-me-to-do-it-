from battleshipapp import app, db
from battleshipapp.model import *

def create_all():
    with app.app_context():
        db.create_all()

def drop_all():
    with app.app_context():
        db.drop_all()

def create_table(table):
  with app.app_context():
    table.__table__.create(db.engine)

def drop_table(table):
  with app.app_context():
    table.__table__.drop(db.engine)


def print_db_instances(table):
  with app.app_context():
    instances = table.query.all()
    for instance in instances:
      print(instance)

  if len(instances) == 0:
    print("Empty Table")
    
  print(len(instances), "records")