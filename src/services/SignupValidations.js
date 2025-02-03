import Validations from "./Validations";

export default class SignupValidations{
    constructor(email,password){
        this.email=email;
        this.password=password;
    }
    checkValidations(){
        let errors=[];
      /*  if(!Validations.checkEmail(this.email)){
            errors['email']='Invalid email'
        }*/
        if(!Validations.minLength(this.password,6)){
            errors['password']='password should at least be 6 charecters'
        }
        return errors;
    }
    static getErrorMessagesFromCode(errorCode){
        if(errorCode==="The email is already registered"){
            return "Email already exists";
        }
        else if(errorCode==="Incorrect email or password"){
            return "Incorrect email or password";
        }
        else if(errorCode==="INVALID_PASSWORD"){
            return "Invalid password"
        }
        else return "Unexpected error! please try again"
    }
}