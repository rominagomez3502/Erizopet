from flask import Flask, render_template, request, redirect, flash, url_for
from flask_mysqldb import MySQL
from config import config 
from werkzeug.security import generate_password_hash
from models.entities.User import User
from models.ModelUser import ModelUser
from flask_login import LoginManager, login_user, logout_user, login_required , current_user

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

        usuario = User(
            0,
            None,
            request.form['correo'],
            request.form['clave'],
            None
        )

        usuarioAutenticado = ModelUser.signin(db, usuario)

        if usuarioAutenticado is not None:

            login_user(usuarioAutenticado)

            if usuarioAutenticado.clave:

                if usuarioAutenticado.perfil == 'A':
                    return redirect(url_for('home_admin'))
                else:
                    return redirect(url_for('home_user'))

            flash('Contraseña Incorrecta')
            return redirect(url_for('home'))

        flash('Usuario Inexistente')
        return redirect(url_for('home'))

    return render_template('home.html')

@erizopetApp.route('/signout',methods =['GET','POST'])
def signout():
      logout_user()
      return redirect(url_for('home'))

@erizopetApp.route('/home_admin', methods =['GET', 'POST'])
def home_admin():
      return render_template('admin.html')

@erizopetApp.route('/home_user', methods=['GET', 'POST'])
def home_user():
      return render_template('user.html')


@erizopetApp.route('/sUsuario', methods=['GET', 'POST'])
@login_required
def sUsuario():
      if current_user.perfil == 'A':
           selUsuario = db.connection.cursor()
           selUsuario.execute("SELECT * FROM usuario")
           u=selUsuario.fetchall()
           selUsuario.close()
           return render_template('users.html', usuarios=u)
      else:
             flash('No tiene permisos para acceder a esta página')
             return redirect(url_for('home'))    

@erizopetApp.route('/iUsuario',methods=['GET','POST'])
@login_required
def iUsuario():
      if request.method == 'POST' and current_user.perfil == 'A':
            nombre = request.form['nombre']
            correo = request.form['correo']
            clave = request.form['clave']
            claveCifrada = generate_password_hash(clave)
            perfil = request.form['perfil']
            regUsuario = db.connection.cursor()
            regUsuario.execute("INSERT INTO usuario (nombre, correo, clave, perfil) VALUES (%s,%s,%s,%s)",(nombre, correo, claveCifrada))
            db.connection.commit()
            regUsuario.close()
            flash('Usuario Registrado Correctamente')
            return redirect(url_for('sUsuario'))
      else:
           return redirect (url_for('home'))

@erizopetApp.route('/uUsuario/<int:id>',methods=['GET','POST'])
@login_required
def uUsuario(id):
      if request.method == 'POST' and current_user.perfil == 'A':
            nombre = request.form['nombre']
            correo = request.form['correo']
            perfil = request.form['perfil']
            actUsuario = db.connection.cursor ()
            actUsuario.execute("UPDATE usuario SET nombre=%s, correo=%s, perfil=%s WHERE id=%s")
            db.connection.commit()
            actUsuario.close()
            flash("Usuario actualizado correctamente")
            return redirect(url_for('sUsuario'))
      else:
           return redirect(url_for('home'))

@erizopetApp.route('/dUsuario/<int:id>',methods=['GET','POST'])
@login_required
def dUsuario(id):
      if request.method == 'POST' and current_user.perfil == 'A':
           delUsuario = db.connection.cursor()
           delUsuario.execute("DELETE FROM usuario WHERE id=%s",(id))
           db.connection.commit()
           delUsuario.close()
           flash("Usuario eliminado correctamente")
           return redirect(url_for('sUsuario'))
      else:
           return redirect(url_for('home'))


      



if __name__ == '__main__':
     erizopetApp.run(debug=True,port=2062)


     