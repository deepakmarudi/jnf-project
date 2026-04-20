<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Inter', Roboto, -apple-system, blinkmacsystemfont, 'Segoe UI', helvetica, arial, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .header {
            background-color: #003366; /* Institution primary blue */
            color: #ffffff;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 40px;
            text-align: center;
            line-height: 1.6;
        }
        .otp-box {
            font-size: 36px;
            font-weight: 700;
            color: #003366;
            background: #f0f7ff;
            border: 1px solid #d0e7ff;
            letter-spacing: 12px;
            padding: 20px;
            border-radius: 6px;
            margin: 30px 0;
            display: inline-block;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            background: #fafafa;
            border-top: 1px solid #eeeeee;
        }
        .notice {
            color: #d9534f;
            font-weight: 500;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>IIT (ISM) DHANBAD</h1>
            <div style="font-size: 14px; margin-top: 5px; opacity: 0.9;">Recruiter Portal Registration</div>
        </div>
        <div class="content">
            <p style="margin-top: 0;">Hello,</p>
            <p>Thank you for initiating your registration on the <strong>IIT (ISM) Dhanbad Recruiter Portal</strong>. Please use the One-Time Password (OTP) below to verify your official email address.</p>
            
            <div class="otp-box">
                {{ $otpCode }}
            </div>
            
            <p class="notice">This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
            
            <p style="margin-top: 30px;">If you did not request this code, you can safely ignore this email.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Career Development Centre, IIT (ISM) Dhanbad.<br>
            For support, please contact CDC at placement@iitism.ac.in
        </div>
    </div>
</body>
</html>
