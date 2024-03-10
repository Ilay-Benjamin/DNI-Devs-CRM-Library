import $ from "../include/jquery.js";
window.jQuery = jQuery
window.$ = jQuery
import { Output, ErrorTypes, OutputFactory } from './output.js';


export class Test {
    constructor(type, name, method) {
        this.type = type;
        this.name = name;
        this.method = method;
    }

    run(data) {
        console.log('Test -> run -> this.name : ' + JSON.stringify(this.name));
        console.log('Test -> run -> data : ' + JSON.stringify(data));
        console.log('Test -> run -> this.method : ' + this.method.toString());
        var response = new Output();
        data.output = response;
        var testResults = this.method({...data});
        console.log('Test -> run -> testResults : ' + JSON.stringify(testResults));
        response.merge(testResults);
        console.log('Test -> run -> response : ' + JSON.stringify(response));
        response.data = [];
        return response;
    }
}


export class TestTypes {
    static ACTION_TYPE = 'actionTest';
    static SYSTEM_TYPE = 'systemTest';
    static INTERNAL_SERVER_TYPE = 'internalServerTest';
    static IS_TEST_TYPE(type) {
        var testTypes = Object.values(TestTypes);
        return testTypes.includes(type);
    }
    static GET_TYPES() {
        return Object.entries(TestTypes)
                     .filter(([key, value]) => typeof value !== 'function')
                     .map(([key, value]) => key);
    }
}


export class Tests {
    static ALL_USERS_ACTION = 'allUsersActionTest';
    static LIST_USERS_ACTION = 'listUsersActionTest';
    static ADD_USER_ACTION = 'addUserActionTest';
    static DELETE_USER_ACTION = 'deleteUserActionTest';
    static UPDATE_USER_ACTION = 'updateUserActionTest';
    static FIND_USER_BY_ID_ACTION = 'findUserByIdActionTest';
    static FIND_USER_BY_EMAIL_ACTION = 'findUserByEmailActionTest';
    //static CALL_ACTION = 'callActionTest';
    static IS_TEST(test) {
        var names = Object.entries(Tests)
        .filter(([key, value]) => typeof value !== 'function')
        .map(([key, value]) => key);
        return names.includes(test);
    }
    static GET_NAMES() {
        return Object.entries(Tests)
        .filter(([key, value]) => typeof value !== 'function')
        .map(([key, value]) => key);
    }
}



export class TestFactory {
    static GET(test) {  
        TestFactory.GET_CLASSES().forEach(([key, item]) => {
            var tester = new item();
            var results = test in tester.methods ? tester.methods[test] : null;
            if (results != null) {  
                return results;
            }
        });
        return null;
    }
}



export class TesterFactory {
    static GET (testType) {
        console.log('Test -> TesterFactory -> testType: ' + testType);
        console.log ('Test -> TesterFactory -> testType in GET_CLASSES' + testType in TesterFactory.GET_CLASSES());
        console.log ('Test -> TesterFactory -> typeof TesterFactory.GET_CLASSES()[testType]: ' + typeof TesterFactory.GET_CLASSES()[testType]);
        return testType in TesterFactory.GET_CLASSES() ? new (TesterFactory.GET_CLASSES()[testType]) : null; 
    }
    static GET_CLASSES () {
        return {
            [TestTypes.ACTION_TYPE]: ActionTester,
            [TestTypes.SYSTEM_TYPE]: null,
            [TestTypes.INTERNAL_SERVER_TYPE]: null,
        }
    }
}



export class Tester {
    constructor(type, methods) {
        this.type = type;
        this.methods = methods;
        console.log('Tester -> constructor -> this.methods : ' + JSON.stringify(this.methods()));
    }
    build(testName) {
        const method = this.methods()[testName];
        return method ? new Test(this.type, testName, method) : null;
    }
}



class ActionTester extends Tester {
    static type() { return TestTypes.ACTION_TYPE; }
    static tests() {
        return {
            [Tests.ALL_USERS_ACTION]: function({output}) {
                console.log('test -> AllUsersActionTest -> method : ()');
                var output = new Output();
                if (!output.hasErrorMessages()) {
                    var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
                    console.log('test -> AllUsersActionTest -> method -> newOutput : ' + JSON.stringify(newOutput));
                    output.merge(newOutput);
                }
                console.log('test -> AllUsersActionTest -> method -> return output : ' + JSON.stringify(output));
                return output;
            },
            [Tests.LIST_USERS_ACTION]: function({limit, output}) {
                console.log('test -> ListUsersActionTest -> method : ()');
                var output = new Output();
                var dataFieldsTestResults = SubTestFactory.GET(SubTests.LIMIT_DATA_FIELD_TYPE).run({limit: limit});
                console.log('test -> ListUsersActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
                output.merge(dataFieldsTestResults);
                if (!output.hasErrorMessages()) {
                    var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
                    output.merge(newOutput);
                }
                console.log('test -> ListUsersActionTest -> method -> return output : ' + JSON.stringify(output));
                return output;
            },
            [Tests.ADD_USER_ACTION]: function({fullname, email, phoneNumber, output}) {
                console.log('test -> AddUserActionTest -> method : ()');
                var output = new Output();
                var dataFieldsTestResults = {
                    fullname: SubTestFactory.GET(SubTests.FULLNAME_DATA_FIELD_TYPE).run({fullname: fullname}),
                    email: SubTestFactory.GET(SubTests.EMAIL_DATA_FIELD_TYPE).run({email: email}),
                    phoneNumber: SubTestFactory.GET(SubTests.PHONE_NUMBER_DATA_FIELD_TYPE).run({phoneNumber: phoneNumber})
                }
                console.log('test -> AddUserActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
                Object.entries(dataFieldsTestResults).forEach(([key, value]) => {
                    output.merge(value);
                });
                if (!output.hasErrorMessages()) {
                    var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
                    output.merge(newOutput);
                }
                console.log('test -> AddUserActionTest -> method -> return output : ' + JSON.stringify(output));
                return output;
            },
            [Tests.DELETE_USER_ACTION]: function({id, output}) {
                console.log('test -> DeleteUserActionTest -> method : ()');
                var output = new Output();
                var test = SubTestFactory.GET(SubTests.ID_DATA_FIELD_TYPE);
                console.log('test -> DeleteUserActionTest -> method -> test : ' + JSON.stringify(test));
                var dataFieldsTestResults = test.run({id: id});
                console.log('test -> DeleteUserActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
                output.merge(dataFieldsTestResults);
                if (!output.hasErrorMessages()) {
                    var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
                    output.merge(newOutput);
                }
                console.log('test -> DeleteUserActionTest -> method -> return output : ' + JSON.stringify(output));
                return output;
            },
            [Tests.UPDATE_USER_ACTION]: function({id, fullname, email, phoneNumber, output}) {
                console.log('test -> UpdateUserActionTest -> method : ()');
                var output = new Output();
                var emptyInputErrorMessage = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.EMPTY_INPUT).messages[0];
                var dataFieldsTestResults = {
                    id: SubTestFactory.GET(SubTests.ID_DATA_FIELD_TYPE).run({id: id}),
                    fullname: SubTestFactory.GET(SubTests.FULLNAME_DATA_FIELD_TYPE).run({fullname: fullname}),
                    email: SubTestFactory.GET(SubTests.EMAIL_DATA_FIELD_TYPE).run({email: email}),
                    phoneNumber: SubTestFactory.GET(SubTests.PHONE_NUMBER_DATA_FIELD_TYPE).run({phoneNumber: phoneNumber})
                }
                console.log('test -> UpdateUserActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
                Object.entries(dataFieldsTestResults).forEach(([key, value]) => {
                    if (key == 'id' && value.hasErrorMessages()) {
                        output.merge(value);
                    } else if (value.messages.includes(emptyInputErrorMessage) || 
                        !value.hasErrorMessages()) {
                        output.merge(value);
                    } 
                    
                });
                if (!output.hasErrorMessages()) {
                    var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
                    output.merge(newOutput);
                }
                console.log('test -> UpdateUserActionTest -> method -> return output : ' + JSON.stringify(output));
                return output;
            },
            [Tests.FIND_USER_BY_ID_ACTION]: function({id, output}) {
                console.log('test -> FindUserByUdActionTest -> method : ()');
                var output = new Output();
                var dataFieldsTestResults = SubTestFactory.GET(SubTests.ID_DATA_FIELD_TYPE).run({id: id});
                console.log('test -> FindUserActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
                output.merge(dataFieldsTestResults);
                console.log('test -> FindUserActionTest -> method -> return output : ' + JSON.stringify(output));
                return output;
            },
            [Tests.FIND_USER_BY_EMAIL_ACTION]: function({email, output}) {
                console.log('test -> FindUserByEmailActionTest -> method : ()');
                var output = new Output();
                var dataFieldsTestResults = SubTestFactory.GET(SubTests.EMAIL_DATA_FIELD_TYPE).run({email: email});
                console.log('test -> FindUserActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
                output.merge(dataFieldsTestResults);
                console.log('test -> FindUserActionTest -> method -> return output : ' + JSON.stringify(output));
                return output;
            },
        }
    }
    constructor () {
        super('', () => {});
        var x = Object.entries(this.constructor.tests()).filter(([key, item]) => typeof item === 'function')
            .reduce((acc, [key, item]) => {
                acc[key] = item;
                this[key] = item;
                return acc;
            }, {}
        );
        console.log('Tester -> constructor -> x : ' + x.toString() );
        this['methods'] = function () { return x; }; 
        console.log('Tester -> constructor -> this.methods : ' + this.methods);
        this['type'] = this.constructor.type();
    }
}



class SubTest extends Test {
    constructor(name, type, subType, method) {
        super(type, name, method);
        this.subType = subType;
    }
    run(data) {
        var response = new Output();
        var testResults = this.method({...data});
        response.merge(testResults);
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
    static subTestType() { return SubTestsTypes.DATA_FIELD_TYPE; }
    static testType() { return TestTypes.ACTION_TYPE; }
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
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.merge(newOutput);
        }
        console.log('test -> LimitDataFieldTest -> method -> output : ' + JSON.stringify(output));
        return output;
    }

    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.testType();
        this.subType = this.constructor.subTestType();
        this.method = this.constructor.method;
    }
}



class IdDataFieldTest extends SubTest {
    static subTestType() { return SubTestsTypes.DATA_FIELD_TYPE; }t
    static testType() { return TestTypes.ACTION_TYPE; }
    static subTestName() { return SubTests.ID_DATA_FIELD_TYPE; }
    static method({id}) {
        var output = new Output();
        console.log('test -> IdDataFieldTest -> method -> id : ' + JSON.stringify(id));
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
        console.log('test -> ' + this.name + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }
    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.testType();
        this.subType = this.constructor.subTestType();
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
        console.log('test -> ' + this.name + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }
    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.testType();
        this.subType = this.constructor.subTestType();
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
        console.log('test -> ' + this.name + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }

    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.testType();
        this.subType = this.constructor.subTestType();
        this.method = this.constructor.method;
    }
}



class PhoneNumberDataFieldTest extends SubTest {
    static subTestType() { return SubTestsTypes.DATA_FIELD_TYPE; }
    static testType() { return TestTypes.ACTION_TYPE; }
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
        console.log('test -> ' + this.name + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }
    constructor() {
        super('', '', '', () => {})
        this.name = this.constructor.subTestName();
        this.type = this.constructor.testType();
        this.subType = this.constructor.subTestType();
        this.method = this.constructor.method;
    }
}