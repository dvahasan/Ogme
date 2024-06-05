const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.MAILSERVERADDRESS,
    port: process.env.MAILPORT,
    secure: process.env.MAILPORTSECURE,
    auth: {
        user: `${process.env.MAILEMAIL}`,
        pass: `${process.env.MAILEMAILPASSWORD}`
    }
});

module.exports.mailForm = (req, res) => {
    return res.render("sendEmail");
}


module.exports.sendMail =  async(req, res) => {

    const body = req.body;
    let r = [];

    //return res.send(body)

    //console.log(process.env.MAILEMAILPASSWORD);
    const data = {
        receiver: process.env.MAILEMAIL,
        customerEmail: body.email,
        customerName: body.name,
        customerPhone: body.phone,
        subject: 'Ogme Ask Us!',
        customerMessage: body.message,
    };
    //return res.render('email');
    const path = require('node:path');
    const ogmeEmail = (path.resolve('./views/email.ejs'));
    const customerEmail = (path.resolve('./views/customerEmail.ejs'));
    //console.log(ogmeEmail);


    const ejs = require('ejs');
    const ogmeTemp = await ejs.renderFile(ogmeEmail, {
        data
    });

    const customerTemp = await ejs.renderFile(customerEmail, {
        data
    });



    var ogmeOpt = {
        from: `${data.customerName} - ${data.customerEmail}`,
        to: data.receiver,
        subject: data.subject,
        html: ogmeTemp,
    };

    var customerOpt = {
        from: `Ogme Store - ${data.receiver}`,
        to: data.customerEmail,
        subject: "Ogme Store",
        html: customerTemp,
    };

    await transporter.sendMail(ogmeOpt, async function (error, info) {
        if (error) {
            //return res.redirect("/senior/profile")
            return res.send(error)
            //request_feedback = "Profile created successfully, but their is an error sending email!";
            //throw "Profile created successfully, but their is an error sending email!";
        } else {

            await transporter.sendMail(customerOpt, function (error, info) {
                if (error) {
                    //return res.redirect("/senior/profile")
                    return res.send(error)
                    //request_feedback = "Profile created successfully, but their is an error sending email!";
                    //throw "Profile created successfully, but their is an error sending email!";
                } else {
                    //return res.redirect("/senior/profile")
                    //console.log(info)
                    return  res.send({
                        status: 200,
                        message: "Emails sent successfully",
                    })
                    //request_feedback = "/senior/profile2";
                }
            });

        }
    });



}