import ReactDOMServer from 'react-dom/server';
import EmailConfig from './EmailConfig';
import React, { FunctionComponent } from 'react';

interface SendConfig {
  to:string;
  subject:string;
  message:FunctionComponent;
}

class EmailService {
  private static instance:EmailService;
  private constructor() {}
  
  static getInstance():EmailService {
    if (!EmailService.instance) EmailService.instance = new EmailService();

    return EmailService.instance;
  }

  private render(element:FunctionComponent) {
    const Email = React.createElement(element)
    return ReactDOMServer.renderToStaticMarkup(Email);
  }

  public async send(options:SendConfig) {
    const { to, subject, message } = options;
    EmailConfig.transporter.sendMail({
      to,
      subject,
      html: this.render(message)
    });
  }
}

export default EmailService;
