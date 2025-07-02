import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def enviarCorreo(asunto_nombre:str,mensaje_correo:str,correo_contacto:str):

    correo_origen = '' # Tu correo electrónico de origen
    contraseña = '' # Tu contraseña de correo electrónico de origen
    correo_destino = '' # Correo electrónico de destino

    mensaje = MIMEMultipart()
    mensaje['From'] = correo_origen
    mensaje['To'] = correo_destino
    mensaje['Subject'] = f'Correo recibido de nombre: {asunto_nombre} y correo electronico: {correo_contacto}'

    cuerpo = mensaje_correo
    mensaje.attach(MIMEText(cuerpo, 'plain'))

    try:
        servidor = smtplib.SMTP('mail.gmx.es', 587)
        servidor.starttls() 
        servidor.login(correo_origen, contraseña)
        servidor.send_message(mensaje)
        print("Correo enviado exitosamente.")
        servidor.quit()
    except Exception as e:
        print("Error al enviar el correo:", e)