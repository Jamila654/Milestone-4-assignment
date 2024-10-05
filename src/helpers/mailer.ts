// import User from "@/models/userModel";
// import nodemailer from "nodemailer";
// import bcryptjs from 'bcryptjs'

// export const sendEmail = async ({ email, emailType, userId }:any) => {
//   try {
//     const hashedToken = await bcryptjs.hash(userId.toString(),10)

//     if(emailType === "VERIFY"){
//       await User.findByIdAndUpdate
//       (userId,{
//         $set: {
//         verifyToken: hashedToken,
//         verifyTokenExpiry: new Date(Date.now() + 3600000),
//     }
//   })
//     }else if(emailType === "RESET"){
//       await User.findByIdAndUpdate(userId,{
//         $set:{
//         forgotPasswordToken: hashedToken,
//         forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
//       }
//     })


//     // Looking to send emails in production? Check out our Email API/SMTP product!
// var transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "d5911070226035",
//     pass: "9e2f9e3b609fd8"
//   }
// });

//     const mailOptions = {
//       from: 'nurjamila1@gmail.com',
//       to: email,
//       subject: emailType === 'VERIFY' ? "Verify Your email" : "Reset Your Password",
//       html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</> to ${emailType === "VERIFY"? "Verify your email": "reset your password"} or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
//     };

//     const mailResponse = await transport.sendMail(mailOptions)
//     return mailResponse

//   }
// }catch (error:any) {
//   throw new Error(error.message)
//   }
// }


import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d5911070226035",
              pass: "9e2f9e3b609fd8"
              //TODO: add these credentials to .env file
            }
          });


        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}
