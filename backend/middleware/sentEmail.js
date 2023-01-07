const nodeMailer = require("nodemailer")

//options contains: email, subject and message
exports.sendEmail = async (options) => {

    // const transporter = nodeMailer.createTransport({
    //     host:process.env.SMPT_HOST,
    //     port:process.env.SMPT_PORT,
    //     auth:{
    //         user:process.env.SMPT_MAIL,
    //         pass:process.env.SMPT_PASSWORD,
    //     },
    //     // debug: false,
    //     // secure: true,
    //     service:process.env.SMPT_SERVICE,
    //     // logger: true, //recommended for yahoo
    // })

    // If Google email won't work
    var transporter = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f486a33f693fc0",
          pass: "f970475ace6160"
        }
      });

    const mailOptions = {
        // from: "f486a33f693fc0",
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject:options.subject,
        text:options.message,        
    }

    await transporter.sendMail(mailOptions)

}