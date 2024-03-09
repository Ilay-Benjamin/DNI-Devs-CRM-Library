



class SubTest extends Test {
    constructor(name, type, subType, method) {
        super(type, name, method);
        this.subType = subType;
    }

    run(data) {
        var response = new Output();
        var testResults = this.method({...data});
        response.merge(testResults);
        response.data = [];
        return response;
    }
}


class SubTestsTypes {
    static DATA_FIELD_TYPE = 'dataFieldTest';
    static INTERNAL_SERVER_SUB_TYPE = 'internalServerTest';
    static SYSTEM_SUB_TYPE = 'systemTest';
}


class SubTests {
    static LIMIT_DATA_FIELD_TYPE = 'limitDataFieldTest';
    static ID_DATA_FIELD_TYPE = 'idDataFieldTest';
    static FULLNAME_DATA_FIELD_TYPE = 'fullnameDataFieldTest';
    static EMAIL_DATA_FIELD_TYPE = 'emailDataFieldTest';
    static PHONE_NUMBER_DATA_FIELD_TYPE = 'phoneNumberDataFieldTest';
    static EMAIL_USAGE = 'emailUsageTest';
    static USER_EXISTIONS = 'userExistionsTest';
    static ACTION_NAME = 'actionNameTest';
}


class SubTestFactory {
    static GET (SubTest) {
        switch (SubTest) {
            case SubTests.LIMIT_DATA_FIELD_TYPE:
                return new LimitDataFieldTest();
            case SubTests.ID_DATA_FIELD_TYPE:
                return new IdDataFieldTest();
            case SubTests.FULLNAME_DATA_FIELD_TYPE:
                return new FullnameDataFieldTest();
            case SubTests.EMAIL_DATA_FIELD_TYPE:
                return new EmailDataFieldTest();
            case SubTests.PHONE_NUMBER_DATA_FIELD_TYPE:
                return new PhoneNumberDataFieldTest();
        }
    }
}


class LimitDataFieldTest extends SubTest {
    static subTestType() { return SubTestsTypes.A; }
    static subTestName() { return SubTests.LIMIT_DATA_FIELD_TYPE; }
    static method({limit}) {
        console.log('test -> LimitDataFieldTest -> method -> limit : ' + JSON.stringify(limit));
        var output = new Output();
        if (limit == null || limit.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר מקסימלי של משתמשים", ErrorTypes.EMPTY_INPUT);
            console.log('test -> LimitDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (isNaN(limit)) {
            var newOutput =  OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר מקסימלי של משתמשים", ErrorTypes.INVALID_INPUT);
            console.log('test -> LimitDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (limit < 0) {
            var newOutput =  OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר מקסימלי של משתמשים", ErrorTypes.INVALID_INPUT);
            console.log('test -> LimitDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (limit > 9999) {
            var newOutput =  OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר מקסימלי של משתמשים", ErrorTypes.LONG_INPUT_LENGTH);
            output.merge(newOutput);
            console.log('test -> LimitDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
        }
        if (!output.hasErrorMessages()) {
            newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
        }
        console.log('test -> LimitDataFieldTest -> method -> output : ' + JSON.stringify(output));
        return output;
    }

    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.subTestType();
        this.subType = this.constructor.methodType();
        this.method = this.constructor.method;
    }
}


class IdDataFieldTest extends SubTest {
    static subTestType() { return SubTestsTypes.DATA_FIELD_TYPE; }
    static testType() { return TestTypes.ACTION_TYPE; }
    static subTestName() { return SubTests.ID_DATA_FIELD_TYPE; }
    static method({id}) {
        console.log('test -> IdDataFieldTest -> method -> id : ' + JSON.stringify(id));
        var output = new Output();
        if (id == null || id.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.EMPTY_INPUT);
            console.log('test -> IdDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (isNaN(id)) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.INVALID_INPUT);
            console.log('test -> IdDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (id < 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.INVALID_INPUT);
            console.log('test -> IdDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (id > 9999) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.LONG_INPUT_LENGTH);
            console.log('test -> IdDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        }
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.merge(newOutput);
        }
        console.log('test -> ' + this.name() + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }

    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.subTestType();
        this.subType = this.constructor.methodType();
        this.method = this.constructor.method;
    }
}


class FullnameDataFieldTest extends SubTest {
    static subTestType() { return SubTestsTypes.DATA_FIELD_TYPE; }
    static testType() { return TestTypes.ACTION_TYPE; }
    static subTestName() { return SubTests.FULLNAME_DATA_FIELD_TYPE; }
    static method({fullname}) {
        console.log('test -> FullnameDataFieldTest -> method -> fullname : ' + JSON.stringify(fullname));
        var output = new Output();
        if (fullname == null || fullname.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT('שם מלא', ErrorTypes.EMPTY_INPUT);
            console.log('test -> FullnameDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (/[^\u0590-\u05FFa-zA-Z\s]/.test(fullname)) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT('שם מלא', ErrorTypes.INVALID_INPUT);
            console.log('test -> FullnameDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        }
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.merge(newOutput);
        }
        console.log('test -> ' + this.name() + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }


    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.subTestType();
        this.subType = this.constructor.methodType();
        this.method = this.constructor.method;
    }

}


class EmailDataFieldTest extends SubTest {
    static subTestType() { return SubTestsTypes.DATA_FIELD_TYPE; }
    static testType() { return TestTypes.ACTION_TYPE; }
    static subTestName() { return SubTests.EMAIL_DATA_FIELD_TYPE; }
    static method({email}) {
        console.log('test -> EmailDataFieldTest -> method -> email : ' + JSON.stringify(email));
        var output = new Output();
        if (email == null || email.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("כתובת אימייל", ErrorTypes.EMPTY_INPUT);
            console.log('test -> EmailDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (!/^[a-zA-Z]+[a-zA-Z0-9]*@[a-zA-Z0-9]+\.[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(email) || !(email.match(/@/g) || []).length === 1) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("כתובת אימייל", ErrorTypes.INVALID_INPUT);
            console.log('test -> EmailDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (email.length > 255) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("כתובת אימייל", ErrorTypes.LONG_INPUT_LENGTH);
            console.log('test -> EmailDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        }
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.merge(newOutput);
        }
        console.log('test -> ' + this.name() + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }


    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.subTestType();
        this.subType = this.constructor.methodType();
        this.method = this.constructor.method;
    }

}


class PhoneNumberDataFieldTest extends SubTest {
    static subTestType() { return SubTestsTypes.DATA_FIELD_TYPE; }
    static TestType() { return TestTypes.ACTION_TYPE; }
    static subTestName() { return SubTests.PHONE_NUMBER_DATA_FIELD_TYPE; }

    static method({phoneNumber}) {
        console.log('test -> PhoneNumberDataFieldTest -> method -> phoneNumber : ' + JSON.stringify(phoneNumber));
        var output = new Output();
        if (phoneNumber == null || phoneNumber.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.EMPTY_INPUT);
            console.log('test -> PhoneNumberDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (!/^[0-9-]+$/.test(phoneNumber)) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.INVALID_INPUT);
            console.log('test -> PhoneNumberDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if ((phoneNumber.match(/-/g) || []).length) {
            var dashCount = (phoneNumber.match(/-/g) || []).length;
            if (dashCount > 1) {
                var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.INVALID_INPUT);
                console.log('test -> PhoneNumberDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
                output.merge(newOutput);
            }
            if (dashCount == 1 && phoneNumber[3] != '-') {
                var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.INVALID_INPUT);
                console.log('test -> PhoneNumberDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
                output.merge(newOutput);
            }
            phoneNumber = phoneNumber.replace(/-/g, '');
        } else if (phoneNumber.toString().length < 10) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.SHORT_INPUT_LENGTH);
            console.log('test -> PhoneNumberDataFieldTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        } else if (phoneNumber.toString().length > 10) {
            console.log('test -> PhoneNumberDataFieldTest -> method -> phoneNumber.toString().length : ' + phoneNumber.toString().length);
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.LONG_INPUT_LENGTH);
            output.merge(newOutput);
        }
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.merge(newOutput);
        }
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.merge(newOutput);
        }
        console.log('test -> ' + this.name() + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }


    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.subTestType();
        this.subType = this.constructor.methodType();
        this.method = this.constructor.method;
    }
}