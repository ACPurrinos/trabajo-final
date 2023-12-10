const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

async function enviarCorreo(destinatario, asunto, datos) {
    // Crear un transporte para nodemailer
    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Host SMTP de Hostinger
        port: 587, // Puerto SMTP (puede variar)
        secure: false, // true para 465, false para otros puertos
        auth: {
            user: process.env.EMAIL_USER, // Tu dirección de correo de Hostinger
            pass: process.env.EMAIL_PASSWORD, // Tu contraseña de Hostinger
        },
        tls: {
            rejectUnauthorized: false // Necesario si hay problemas con TLS
        }
    });

    // Leer el archivo de la plantilla Handlebars
    const templatePath = path.join(__dirname, '../templates/respuestaConsulta.hbs');
    const source = fs.readFileSync(templatePath, 'utf8');
 
    // Compilar la plantilla con Handlebars
    const template = handlebars.compile(source);

    // Asegúrate de que el objeto 'datos' contiene 'nombre', 'mensaje' y 'añoActual'
    const htmlToSend = template({
        nombre: datos.nombre,
        mensaje: datos.mensaje,
        añoActual: new Date().getFullYear() // Añadir el año actual automáticamente
    });

    // Configurar las opciones para el correo
    let mailOptions = {
        from: process.env.EMAIL_USER, // Dirección de correo del remitente
        to: `${destinatario}, contacto@bookfinder.site`, // Destinatario(s)
        subject: asunto, // Asunto del correo
        html: htmlToSend // HTML generado a partir de la plantilla
    };

    // Intentar enviar el correo
    try {
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado a:", destinatario);
    } catch (error) {
        console.error("Error al enviar correo:", error);
        throw error;
    }
}

async function procesarYEnviarFormulario(req, res) {
    const { nombre, email, mensaje } = req.body;

    try {
        await enviarCorreo(email, 'Respuesta a tu Consulta', { nombre, mensaje });
        res.json({ message: 'Mensaje enviado con éxito.' });
    } catch (error) {
        console.error('Error al enviar el mensaje:', error); 
        res.status(500).json({ error: 'Error al enviar el mensaje: ' + error.message });
    }
}

module.exports = { enviarCorreo, procesarYEnviarFormulario };