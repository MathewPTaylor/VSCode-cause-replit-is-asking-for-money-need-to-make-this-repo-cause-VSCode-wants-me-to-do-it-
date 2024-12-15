import sqlite3

class DB:
    def __init__(self, filename, tablename=""):
        self.file = filename
        self.table = tablename

    
    def add_record(self, *args):
        cx = sqlite3.connect(self.file)
        cs = cx.cursor()
        command = f"INSERT INTO {self.table} ({",".join(args)})"

        cs.execute(command)
        
        cx.commit()
        cx.close()

    def get_records(self, id):
        cx = sqlite3.connect(self.file)
        cs = cx.cursor()
        command = f"SELECT * FROM {self.table} WHERE id={id}"

        cs.execute(command)

        cx.commit()
        cx.close()

