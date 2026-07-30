const emailVerification = ({ otp }) => {
  const appName = process.env.APP_NAME || retakeExam;
  const year = new Date().getFullYear();

  return `
    <body>
        <table>
            <tr><td><h1>verify your email</h1></td></tr>
            <tr><td><h1>Creating accout with ${appName}</h1><p>please use this otp : ${otp}</p></td></tr>
        </table>
    </body>
    
    `;
};
module.exports = { emailVerification };
