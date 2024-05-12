import HttpClient from "../services/HttpClient";

type LoginEmailType = {
    email: string;
    password: string;
}

type LoginPhoneType = {
    phone: string;
    otp: string;
    uuid: string;
}

type GetPhoneOtpType = {
    phone: string;
}

type VerifyPhoneOtpType = {
    phone: string;
    otp: string;
    uuid: string;
}

type GetEmailOtpType = {
    email: string;
}

type VerifyEmailOtpType = {
    email: string;
    otp: string;
    uuid: string;
}

type UserType = {
    id: number,
    name: string,
    email: string,
    phone: string,
    ttl: number,
    type: 'individual' | 'company',
    individual?: {
        birth_date: string,
        gender: 'M' | 'F',
    },
    company?: {
        tin_number: number,
    }
};

type RegisterType = {
    name: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string,
    phone_uuid?: string | null,
    email_uuid?: string | null,
    user_type: 'individual' | 'company',
    individual?: {
        birth_date: string,
        gender: 'M' | 'F',
    },
    company?: {
        tin_number: number,
    }
};

class User {
    static TTL = 2 * 60 * 60 * 1000; // 24 hours in milliseconds

    public static getCurrent = async () => {
        return HttpClient.get('/user');
    }

    public static loginWithPhone = async (data: LoginPhoneType) => {
        return HttpClient.post('/auth/login/phone', data);
    }

    public static loginWithEmail = async (data: LoginEmailType) => {
        return HttpClient.post('/auth/login/email', data);
    }

    public static validateRegisterData = async (data: RegisterType) => {
        return HttpClient.post('/auth/register/data-validation', data);
    }

    public static register = async (data: RegisterType) => {
        return HttpClient.post('/auth/register', data);
    }

    public static getPhoneOtp = async (data: GetPhoneOtpType) => {
        return HttpClient.post('/auth/temp-phone/store', data);
    }

    public static verifyPhoneOtp = async (data: VerifyPhoneOtpType) => {
        return HttpClient.post('/auth/temp-phone/verify', data);
    }

    public static getEmailOtp = async (data: GetEmailOtpType) => {
        return HttpClient.post('/auth/temp-email/store', data);
    }

    public static verifyEmailOtp = async (data: VerifyEmailOtpType) => {
        return HttpClient.post('/auth/temp-email/verify', data);
    }
}

export {
    type LoginEmailType,
    type LoginPhoneType,
    type UserType,
    type GetPhoneOtpType,
    type VerifyPhoneOtpType,
    type GetEmailOtpType,
    type VerifyEmailOtpType,
    type RegisterType,
};

export default User;