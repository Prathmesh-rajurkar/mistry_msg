import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from:"dsa0314319@gmail.com",
            to:email,
            subject: "Mistry Message Verification Code",
            react: VerificationEmail({username,otp:verifyCode}),
        });
        return {
            success: true,
            message: "Verification email sent successfully to " + email,
        };
    } catch (emailError) {
        console.error("Error sending email: ", emailError);
        return {
            success: false,
            message: "Error sending verification email",
        };
    }
}
