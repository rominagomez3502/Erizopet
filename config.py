class Config: 
    SECRET_KEY = 'lalaeriza'
    DEBUG      = True

class DevelopmentConfig(Config):
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD ='mysql'
    MYSQL_DATEBASE = 'erizopet'

config = {
    'development': DevelopmentConfig
}
