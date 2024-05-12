import { useDispatch } from 'react-redux';
import { userActions } from '../store/slices/user-slice';
import { User } from '../models/_index';
import { GetEmailOtpType, GetPhoneOtpType, LoginEmailType, LoginPhoneType, RegisterType, UserType, VerifyEmailOtpType, VerifyPhoneOtpType } from '../models/User';
import { toastActions } from '../store/slices/toast-slice';

const LoginToast = {
    title: "تم الاتصال بنجاح",
    message: "أنت الآن متصل.",
    status: "success",
};

const defaultErrorMessage = {
    title: "خطأ",
    message: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    status: "error",
};

type dataType = LoginPhoneType | LoginEmailType | VerifyPhoneOtpType | GetPhoneOtpType | GetEmailOtpType | VerifyEmailOtpType;
type AuthActionType = 'loginWithPhone' | 'loginWithEmail' | 'validateRegisterData' | 'register' | 'getPhoneOtp' | 'verifyPhoneOtp' | 'getEmailOtp' | 'verifyEmailOtp';
class UserViewModel {
    private dispatch = useDispatch();

    constructor() {
        this.loginWithPhone = this.loginWithPhone.bind(this);
        this.loginWithEmail = this.loginWithEmail.bind(this);
        this.validateRegisterData = this.validateRegisterData.bind(this);
        this.register = this.register.bind(this);
        this.getPhoneOtp = this.getPhoneOtp.bind(this);
        this.verifyPhoneOtp = this.verifyPhoneOtp.bind(this);
        this.getEmailOtp = this.getEmailOtp.bind(this);
        this.verifyEmailOtp = this.verifyEmailOtp.bind(this);
    }

    public getCurrent = async () => {
        const response = await User.getCurrent();

        if (response.status === 200) {
            this.dispatch(userActions.updateCurrent(response.data.data));
            return true;
        } else return false;
    }

    private async performAuthAction(data: dataType, authFunction: Function, authFunctionName: AuthActionType): Promise<boolean> {
        this.clearLoginErrors();

        const response = await authFunction(data);
        console.log(response);
        if (response.status === 200)
            return this.handleSuccessResponse(response, authFunctionName);
        else
            return this.handleError(response, authFunctionName);
    }

    private clearLoginErrors() {
        this.dispatch(userActions.updateEmailError(null));
        this.dispatch(userActions.updatePhoneError(null));
        this.dispatch(userActions.updateRegisterError(null));
    }

    private handleSuccessResponse(response: any, authFunctionName: AuthActionType): true {
        switch (authFunctionName) {
            case 'getPhoneOtp':
                this.dispatch(userActions.updatePhoneUUID(response.data.data.uuid));
                break;
            case 'verifyPhoneOtp':
                //
                break;
            case 'getEmailOtp':
                this.dispatch(userActions.updateEmailUUID(response.data.data.uuid));
                break;
            case 'verifyEmailOtp':
                //
                break;
            case 'validateRegisterData':
                this.dispatch(userActions.updateRegisterData(response.data.data));
                break;
            default:
                this.dispatch(userActions.updateCurrent(response.data.data));
                this.dispatch(toastActions.display(LoginToast));
        }
        return true;
    }

    private handleError(response: any, authFunctionName: AuthActionType): false {
        if (authFunctionName === 'validateRegisterData' || authFunctionName === 'register') {
            this.dispatch(userActions.updateRegisterError(response.data.message));
            return false;
        }
        const errorMessage = response.status === 422 ? response.data.message : defaultErrorMessage.message;
        const errorAction = (authFunctionName === 'loginWithEmail' || authFunctionName === 'getEmailOtp' || authFunctionName === 'verifyEmailOtp') ? userActions.updateEmailError : userActions.updatePhoneError;
        this.dispatch(errorAction(errorMessage));
        return false;
    }

    public loginWithPhone = async (data: LoginPhoneType): Promise<boolean> => {
        return this.performAuthAction(data, User.loginWithPhone, 'loginWithPhone');
    }

    public loginWithEmail = async (data: LoginEmailType): Promise<boolean> => {
        return this.performAuthAction(data, User.loginWithEmail, 'loginWithEmail');
    }

    public validateRegisterData = (data: RegisterType): Promise<boolean> => {
        return this.performAuthAction(data, User.validateRegisterData, 'validateRegisterData');
    }

    public register = (data: RegisterType): Promise<boolean> => {
        return this.performAuthAction(data, User.register, 'register');
    }

    public getPhoneOtp = async (data: GetPhoneOtpType): Promise<boolean> => {
        return this.performAuthAction(data, User.getPhoneOtp, 'getPhoneOtp');
    }

    public verifyPhoneOtp = async (data: VerifyPhoneOtpType): Promise<boolean> => {
        return this.performAuthAction(data, User.verifyPhoneOtp, 'verifyPhoneOtp');
    }

    public getEmailOtp = async (data: GetEmailOtpType): Promise<boolean> => {
        return this.performAuthAction(data, User.getEmailOtp, 'getEmailOtp');
    }

    public verifyEmailOtp = async (data: VerifyEmailOtpType): Promise<boolean> => {
        return this.performAuthAction(data, User.verifyEmailOtp, 'verifyEmailOtp');
    }
}

export default UserViewModel;
