import nodemailer from 'nodemailer';

class EmailConfig {
  private static instance:EmailConfig;
  private constructor() {}

  static getInstance():EmailConfig {
    if (!EmailConfig.instance) EmailConfig.instance = new EmailConfig();

    return EmailConfig.instance;
  }

  public get transporter() {
    return nodemailer.createTransport("SMTP", {
      service: 'gmail',
      auth: { 
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
}

export default EmailConfig.getInstance();
