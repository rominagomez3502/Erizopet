from flask import Flask, render_template 
from flask_mysqldb import MySQL
from config import config 

erizopetApp = Flask(__name__)
erizopetApp.config.from_object(config['development'])
db = MySQL(erizopetApp)

@erizopetApp.route('/')
def home():
      return  render_template('home.html')

if __name__ == '__main__':
     erizopetApp.run(debug=True,port=2062)
     