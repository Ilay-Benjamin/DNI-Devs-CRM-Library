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
        var testResults = this.method({...data});
        console.log('Test -> run -> testResults : ' + JSON.stringify(testResults));
        response.merge(testResults);
        console.log('Test -> run -> response : ' + JSON.stringify(response));
        response.data = [];
        return response;
    }
}


class SubTest {
    constructor(name, type, subType, method) {
        this.name = name;
        this.method = method;
        this.type = type;
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


export class TestTypes {
    static ACTION_TYPE = 'actionTest';
    static SYSTEM_TYPE = 'systemTest';
    static INTERNAL_SERVER_TYPE = 'internalServerTest';
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
    static EMAIL_USAGE_TEST = 'emailUsageTest';
    static USER_EXISTIONS_TEST = 'userExistionsTest';
    static ACTION_NAME_TEST = 'actionNameTest';
}


export class Tests {
    static ALL_USERS_ACTION_TEST = 'allUsersActionTest';
    static LIST_USERS_ACTION_TEST = 'listUsersActionTest';
    static ADD_USER_ACTION_TEST = 'addUserActionTest';
    static DELETE_USER_ACTION_TEST = 'deleteUserActionTest';
    static UPDATE_USER_ACTION_TEST = 'updateUserActionTest';
    static FIND_USER_BY_ID_ACTION_TEST = 'findUserByIdActionTest';
    static FIND_USER_BY_EMAIL_ACTION_TEST = 'findUserByEmailActionTest';
    static CALL_ACTION_TEST = 'callActionTest';
    static TEST_EXISTIONS_TEST = 'testExistionsTest';
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


export class TestFactory {
    static GET (test) {
      
        switch (test) {
            case Tests.ALL_USERS_ACTION_TEST:
              return new AllUsersActionTest();
            case Tests.LIST_USERS_ACTION_TEST:
              return new ListUsersActionTest();
            case Tests.ADD_USER_ACTION_TEST:
              return new AddUserActionTest();
            case Tests.DELETE_USER_ACTION_TEST:
              return new DeleteUserActionTest();
            case Tests.UPDATE_USER_ACTION_TEST:
              return new UpdateUserActionTest();
            case Tests.FIND_USER_BY_EMAIL_ACTION_TEST:
              return new FindUserByIdActionTest();
            case Tests.FIND_USER_BY_EMAIL_ACTION_TEST:
              return new FindUserByEmailActionTest();
            case Tests.CALL_ACTION_TEST:
              return new CallActionTest();
        }
    }
}


class TestExistionsTest extends test {
    static testName() { return Tests.TEST_EXISTIONS_TEST; }
    static type() { return TestTypes.SYSTEM_SUB_TYPE; }

    static method({type, isSubTest}) {
        console.log('test -> AllUsersActionTest -> method : ()');
        var output = new Output();

        switch (test) {
            case Tests.ALL_USERS_ACTION_TEST:
              return new AllUsersActionTest();
            case Tests.LIST_USERS_ACTION_TEST:
              return new ListUsersActionTest();
            case Tests.ADD_USER_ACTION_TEST:
              return new AddUserActionTest();
            case Tests.DELETE_USER_ACTION_TEST:
              return new DeleteUserActionTest();
            case Tests.UPDATE_USER_ACTION_TEST:
              return new UpdateUserActionTest();
            case Tests.FIND_USER_BY_EMAIL_ACTION_TEST:
              return new FindUserByIdActionTest();
            case Tests.FIND_USER_BY_EMAIL_ACTION_TEST:
              return new FindUserByEmailActionTest();
            case Tests.CALL_ACTION_TEST:
              return new CallActionTest();
        }
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            console.log('test -> AllUsersActionTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        }
        console.log('test -> AllUsersActionTest -> method -> return output : ' + JSON.stringify(output));
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type();
        this.name = this.constructor.testName();
        this.method = this.constructor.method;
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


class ListUsersActionTest extends Test {
    static testName() { return Tests.LIST_USERS_ACTION_TEST; }
    static type() { return TestTypes.ACTION_TYPE; }

    static method({limit}) {
        console.log('test -> ListUsersActionTest -> method -> limit : ' + limit);
        var output = new Output();
        var dataFieldsTestResults = SubTestFactory.GET(SubTests.LIMIT_DATA_FIELD_TYPE).run({limit: limit});
        console.log('test -> ListUsersActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
        output.merge(dataFieldsTestResults);
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.merge(newOutput);
        }
        console.log('test -> ' + this.name() + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }



    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type();
        this.name = this.constructor.testName();
        this.method = this.constructor.method;
    }
}


class AddUserActionTest extends Test {
    static testName() { return Tests.ADD_USER_ACTION_TEST; }
    static type() { return TestTypes.ACTION_TYPE; }

    static method({fullname, email, phoneNumber}) {
        console.log('test -> AddUserActionTest -> method -> fullname : ' + fullname);
        var output = new Output();
        var dataFieldsTestResults = {
            fullname: SubTestFactory.GET(SubTests.FULLNAME_DATA_FIELD_TYPE).run({fullname: fullname}),
            email: SubTestFactory.GET(SubTests.EMAIL_DATA_FIELD_TYPE).run({email: email}),
            phoneNumber: SubTestFactory.GET(SubTests.PHONE_NUMBER_DATA_FIELD_TYPE).run({phoneNumber: phoneNumber})
        }
        console.log('test -> AddUserActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
        dataFieldsTestResults.array.forEach(testResults => {
            output.merge(testResults);
        });
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.merge(newOutput);
        }
        console.log('test -> ' + this.name() + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }


    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type();
        this.name = this.constructor.testName();
        this.method = this.constructor.method;
    }
}


class DeleteUserActionTest extends Test {
    static testName() { return Tests.DELETE_USER_ACTION_TEST; }
    static type() { return TestTypes.ACTION_TYPE; }
    static method({id}) {
        console.log('test -> DeleteUserActionTest -> method -> id : ' + id);
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
        console.log('test -> ' + this.name() + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }


    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type();
        this.name = this.constructor.testName();
        this.method = this.constructor.method;
    }
}


class UpdateUserActionTest extends Test {
    static testName() { return Tests.UPDATE_USER_ACTION_TEST; }
    static type() { return TestTypes.ACTION_TYPE; }

    static method({id, fullname, email, phoneNumber}) {
        console.log('test -> UpdateUserActionTest -> method -> id : ' + id);
        var output = new Output();
        var emptyInputErrorMessage = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.EMPTY_INPUT).messages[0];
        var dataFieldsTestResults = {
            id: SubTestFactory.GET(SubTests.ID_DATA_FIELD_TYPE).run({id: id}),
            fullname: SubTestFactory.GET(SubTests.FULLNAME_DATA_FIELD_TYPE).run({fullname: fullname}),
            email: SubTestFactory.GET(SubTests.EMAIL_DATA_FIELD_TYPE).run({email: email}),
            phoneNumber: SubTestFactory.GET(SubTests.PHONE_NUMBER_DATA_FIELD_TYPE).run({phoneNumber: phoneNumber})
        }
        console.log('test -> UpdateUserActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
        dataFieldsTestResults.array.forEach(testResults => {
            output.merge(testResults);
        });
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.merge(newOutput);
        }
        console.log('test -> ' + this.name() + ' -> method -> output : ' + JSON.stringify(output));
        return output;
    }


    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type();
        this.name = this.constructor.testName();
        this.method = this.constructor.method;
    }
}


class FindUserByIdActionTest extends Test {
    static testName() { return Tests.FIND_USER_BY_ID_ACTION_TEST; }
    static type() { return TestTypes.ACTION_TYPE; }

    static method({id}) {
        console.log('test -> FindUserActionTest -> method -> id : ' + id);
        var output = new Output();
        var dataFieldsTestResults = SubTestFactory.GET(SubTests.ID_DATA_FIELD_TYPE).run({id: id});
        console.log('test -> FindUserActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
        output.merge(dataFieldsTestResults);
        console.log('test -> FindUserActionTest -> method -> output : ' + JSON.stringify(output));
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type();
        this.name = this.constructor.testName();
        this.method = this.constructor.method;
    }
}


class FindUserByEmailActionTest extends Test {
    static testName() { return Tests.FIND_USER_BY_EMAIL_ACTION_TEST; }
    static type() { return TestTypes.ACTION_TYPE; }

    static method({email}) {
        console.log('test -> FindUserActionTest -> method -> email : ' + email);
        var output = new Output();
        var dataFieldsTestResults = SubTestFactory.GET(SubTests.ID_DATA_FIELD_TYPE).run({email: email});
        console.log('test -> FindUserActionTest -> method -> dataFieldsTestResults : ' + JSON.stringify(dataFieldsTestResults));
        output.merge(dataFieldsTestResults);
        console.log('test -> FindUserActionTest -> method -> output : ' + JSON.stringify(output));
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type();
        this.name = this.constructor.testName();
        this.method = this.constructor.method;
    }
}



class AllUsersActionTest extends Test {
    static testName() { return Tests.ALL_USERS_ACTION_TEST; }
    static type() { return TestTypes.ACTION_TYPE; }

    static method() {
        console.log('test -> AllUsersActionTest -> method : ()');
        var output = new Output();
        if (!output.hasErrorMessages()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            console.log('test -> AllUsersActionTest -> method -> newOutput : ' + JSON.stringify(newOutput));
            output.merge(newOutput);
        }
        console.log('test -> AllUsersActionTest -> method -> return output : ' + JSON.stringify(output));
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type();
        this.name = this.constructor.testName();
        this.method = this.constructor.method;
    }
}