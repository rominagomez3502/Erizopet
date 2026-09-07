from flask import Flask, render_template, request, redirect 
from flask_mysqldb import MySQL
from config import config 
from werkzeug.security import generate_password_hash

erizopetApp = Flask(__name__)
erizopetApp.config.from_object(config['development'])
db = MySQL(erizopetApp)

@erizopetApp.route('/')
def home():
      return  render_template('home.html')

@erizopetApp.route('/signup',methods=['GET','POST'])
def signup():
      if request.method == 'POST':
            nombre = request.form['nombre']
            correo = request.form['correo']
            clave = request.form['clave']
            claveCifrada = generate_password_hash(clave)
            regUsuario = db.connection.cursor()
            regUsuario.execute("INSERT INTO usuario (nombre, correo, clave) VALUES(%s,%s,%s)",(nombre, correo, claveCifrada))
            db.connection.commit()
            return render_template('home.html')
      else:
            return render_template('home.html')
      








if __name__ == '__main__':
     erizopetApp.run(debug=True,port=2062)
     