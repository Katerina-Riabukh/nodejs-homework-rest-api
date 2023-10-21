const nodemailer = require("nodemailer");
const path = require("path");
const pug = require("pug");
const { convert } = require("html-to-text");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  _initTransport() {
    // if (process.env.NODE_env === "production") {
    //   // use SENDGRID, MAILGUN, etc..
    //   return nodemailer.createTransport({
    //     host: "",
    //     port: "",
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //   });
    // }
    // use MAILTRAP to test
    return nodemailer.createTransport({
      //   host: "sandbox.smtp.mailtrap.io",
      //   port: 2525,
      //   auth: {
      //     user: process.env.EMAIL_USER,
      //     pass: process.env.EMAIL_PASSWORD,
      //   },
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1b868e4bf9ec89",
        pass: "efb89bba8a54ff",
      },
    });
  }

  async _send(template, subject) {
    const html = pug.renderFile(
      path.join(__dirname, "..", "views", "emails", `${template}.pug`),
      {
        name: this.name,
        url: this.url,
        subject,
      }
    );

    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this._initTransport().sendMail(emailConfig);
  }

  async sendHello() {
    await this._send("verify", "Welcome email");
  }

  //   async sendRestorPassword() {
  //     await this._send("restorePassword", "Password reset instruction");
  //   }
}

module.exports = Email;
