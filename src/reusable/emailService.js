// emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'radicaya@gmail.com',
        pass: 'yvoq codk sgco hnrl'
    }
});

/**
 * Envía un correo electrónico usando Nodemailer
 * @param {string} to - Dirección de destino
 * @param {string} subject - Asunto del correo
 * @param {string} text - Texto plano o cuerpo del correo
 * @returns {Promise<Object>} Resultado del envío
 */
export const sendEmail = async ({ to, subject, text }) => {
    try {
        const info = await transporter.sendMail({
            from: 'radicaya@gmail.com',
            to,
            subject,
            text,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #2196F3;">📨 ¡Correo enviado desde Radicaya!</h2>
                    <p>${text}</p>
                    <p style="color: #888; font-size: 0.9em;">Este mensaje fue generado automáticamente.</p>
                </div>
            `
        });

        return { success: true, info };
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return { success: false, error };
    }
};
