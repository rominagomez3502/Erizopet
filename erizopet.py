from flask import Flask, render_template, request, redirect, flash, url_for
from flask_mysqldb import MySQL
from config import config 
from werkzeug.security import generate_password_hash
from models.entities.User import User
from models.ModelUser import ModelUser
from flask_login import LoginManager, login_user, logout_user, login_required

erizopetApp = Flask(__name__)
erizopetApp.config.from_object(config['development'])
db = MySQL(erizopetApp)
adminUsuarios = LoginManager(erizopetApp) 

@adminUsuarios.user_loader 
def agregarUsuario(id):
      return ModelUser.get_by_id(db, id)

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

      
@erizopetApp.route('/signin', methods=['GET', 'POST'])
def signin():
      if request.method == 'POST':
            usuario = User(0, None, request.form['correo'], request.form['clave'], None)
            usuarioAutenticado = ModelUser.signin(db, usuario)
            if usuarioAutenticado is not None: 
                  login_user(usuarioAutenticado)
                  if usuarioAutenticado.clave:
                        if usuarioAutenticado.perfil == 'A':
                              return render_template('admin.html')
                        else:
                              return render_template('user.html')
                  else: 
                        flash('Contraseña Incorrecta')
                        redirect(url_for('home'))
            else: 
                  flash('Usuario Inexistente')
                  redirect(url_for('home'))
      else:
            render_template('home.html')








if __name__ == '__main__':
     erizopetApp.run(debug=True,port=2062)


     