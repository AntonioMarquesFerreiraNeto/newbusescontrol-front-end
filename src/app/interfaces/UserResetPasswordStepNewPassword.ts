export interface UserResetPasswordStepNewPassword
{
    userId: string;
    newPassword: string;
    confirmPassword: string;
    resetToken: string;
}