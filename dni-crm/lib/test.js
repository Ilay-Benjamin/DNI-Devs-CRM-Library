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
        var response = new Output();
        var testResults = this.method(...data);
        response.mergeStatus(testResults);
        response.mergeMessages(testResults);
        response.data = [];
        return response;
    }
}


class SubTest {
    constructor(name, method) {
        this.name = name;
        this.method = method;
    }

    run(data) {
        var response = new Output();
        var testResults = this.method(...data);
        response.mergeStatus(testResults);
        response.mergeMessages(testResults);
        response.data = [];
        return response;
    }
}


export class TestTypes {
    static ACTION_TYPE = 'actionTest';
    static SYSTEM_TYPE = 'systemTest';
}


class SubTests {
    static LIMIT_DATA_FIELD_SUB_TEST = 'limitDataFieldTest';
    static ID_DATA_FIELD_SUB_TEST = 'idDataFieldTest';
    static FULLNAME_DATA_FIELD_SUB_TEST = 'fullnameDataFieldTest';
    static EMAIL_DATA_FIELD_SUB_TEST = 'emailDataFieldTest';
    static PHONE_NUMBER_DATA_FIELD_SUB_TEST = 'phoneNumberDataFieldTest';
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
    static FIND_USER_ACTION_TEST = 'findUserActionTest';
    static CALL_ACTION_TEST = 'callActionTest';
}


class SubTestFactory {
    static GET (SubTest) {
        switch (SubTest) {
            case SubTests.LIMIT_DATA_FIELD_SUB_TEST:
                return new LimitDataFieldTest();
            case SubTests.ID_DATA_FIELD_SUB_TEST:
                return new IdDataFieldTest();
            case SubTests.FULLNAME_DATA_FIELD_SUB_TEST:
                return new FullnameDataFieldTest();
            case SubTests.EMAIL_DATA_FIELD_SUB_TEST:
                return new EmailDataFieldTest();
            case SubTests.PHONE_NUMBER_DATA_FIELD_SUB_TEST:
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
            case Tests.FIND_USER_ACTION_TEST:
                return new FindUserActionTest();
            case Tests.CALL_ACTION_TEST:
                return new CallActionTest();
        }
    }
}


class LimitDataFieldTest extends SubTest {
    static subTestName() { return "limitDataFieldTest"; }

    static method(limit) {
        var output = new Output();
        if (limit == null || limit.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר מקסימלי של משתמשים", ErrorTypes.EMPTY_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (isNaN(limit)) {
            var newOutput =  OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר מקסימלי של משתמשים", ErrorTypes.INVALID_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (limit < 0) {
            var newOutput =  OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר מקסימלי של משתמשים", ErrorTypes.INVALID_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (limit > 9999) {
            var newOutput =  OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר מקסימלי של משתמשים", ErrorTypes.LONG_INPUT_LENGTH);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        if (!output.isError()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        return output;
    }

    constructor() {
        super('', () => {})
        this.name = this.constructor.subTestName;
        this.test = this.constructor.test;
    }
}


class IdDataFieldTest extends SubTest {
    static subTestName() { return "idDataFieldTest"; }

    static method({id}) {
        var output = new Output();
        if (id == null || id.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.EMPTY_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (isNaN(id)) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.INVALID_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (id < 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.INVALID_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (id > 9999) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.LONG_INPUT_LENGTH);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        if (!output.isError()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        return output;
    }

    constructor() {
        super('', () => {})
        this.name = this.constructor.subTestName;
        this.test = this.constructor.test;
    }
}


class FullnameDataFieldTest extends SubTest {
    static subTestName() { return "fullnameDataFieldTest"; }

    static method({fullname}) {
        var output = new Output();
        if (fullname == null || fullname.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT('שם מלא', ErrorTypes.EMPTY_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (/[^\u0590-\u05FFa-zA-Z\s]/.test(fullname)) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT('שם מלא', ErrorTypes.INVALID_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        if (!output.isError()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        return output;
    }

    constructor() {
        super('', () => {})
        this.name = this.constructor.subTestName;
        this.test = this.constructor.test;
    }

}


class EmailDataFieldTest extends SubTest {
    static subTestName() { return "emailDataFieldTest"; }

    static method({email}) {
        var output = new Output();
        if (email == null || email.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("כתובת אימייל", ErrorTypes.EMPTY_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (!/^[a-zA-Z]+[a-zA-Z0-9]*@[a-zA-Z0-9]+\.[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(email) || !(email.match(/@/g) || []).length === 1) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("כתובת אימייל", ErrorTypes.INVALID_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (email.length > 255) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("כתובת אימייל", ErrorTypes.LONG_INPUT_LENGTH);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        if (!output.isError()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        return output;
    }

    constructor() {
        super('', () => {})
        this.name = this.constructor.subTestName;
        this.test = this.constructor.test;
    }

}


class PhoneNumberDataFieldTest extends SubTest {
    static subTestName() { return "phoneNumberDataFieldTest"; }

    static method({phoneNumber}) {
        var output = new Output();
        if (phoneNumber == null || phoneNumber.toString().length == 0) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.EMPTY_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (!/^[0-9-]+$/.test(phoneNumber)) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.INVALID_INPUT);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if ((phoneNumber.match(/-/g) || []).length) {
            var dashCount = (phoneNumber.match(/-/g) || []).length;
            if (dashCount > 1) {
                var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.INVALID_INPUT);
                output.status = newOutput.status && output.status;
                output.messages.conact(newOutput.messages);
            }
            if (dashCount == 1 && phoneNumber[3] != '-') {
                var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.INVALID_INPUT);
                output.status = newOutput.status && output.status;
                output.messages.conact(newOutput.messages);
            }
            phoneNumber = phoneNumber.replace(/-/g, '');
        } else if (phoneNumber.toString().length < 10) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.SHORT_INPUT_LENGTH);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        } else if (phoneNumber.toString().length > 10) {
            var newOutput = OutputFactory.GET_INVALID_INPUT_OUTPUT("מספר טלפון", ErrorTypes.LONG_INPUT_LENGTH);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        if (!output.isError()) {
            var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
            output.mergeStatus(newOutput);
            output.mergeMessages(newOutput);
        }
        return output;
    }

    constructor() {
        super('', () => {})
        this.name = this.constructor.subTestName;
        this.test = this.constructor.test;
    }

}


class ListUsersActionTest extends Test {
    static testName() { return "listUsersActionTest"; }
    static type() { return "actionTest"; }

    static method({limit}) {
        var output = new Output();
        var dataFieldsTestResults = SubTestFactory.GET(SubTests.LIMIT_DATA_FIELD_SUB_TEST).run([limit]);
        output.mergeStatus(dataFieldsTestResults);
        output.mergeMessages(dataFieldsTestResults);
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type;
        this.name = this.constructor.testName;
        this.method = this.constructor.method;
    }
}


class AddUserActionTest extends Test {
    static testName() { return "listUsersActionTest"; }
    static type() { return "actionTest"; }

    static method({fullname, email, phoneNumber}) {
        var output = new Output();
        var dataFieldsTestResults = {
            fullname: SubTestFactory.GET(SubTests.FULLNAME_DATA_FIELD_SUB_TEST).run([fullname]),
            email: SubTestFactory.GET(SubTests.EMAIL_DATA_FIELD_SUB_TEST).run([email]),
            phoneNumber: SubTestFactory.GET(SubTests.PHONE_NUMBER_DATA_FIELD_SUB_TEST).run([phoneNumber])
        }
        dataFieldsTestResults.array.forEach(testResults => {
            if (testResults.isError()) {
                output.mergeMessages(testResults);
            }
            output.mergeStatus(testResults);
        });
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type;
        this.name = this.constructor.testName;
        this.method = this.constructor.method;
    }
}


class DeleteUserActionTest extends Test {
    static testName() { return "listUsersActionTest"; }
    static type() { return "actionTest"; }

    static method({id}) {
        var output = new Output();
        var dataFieldsTestResults = SubTestFactory.GET(SubTests.ID_DATA_FIELD_SUB_TEST).run([id]);
        output.mergeStatus(dataFieldsTestResults);
        output.mergeMessages(dataFieldsTestResults);
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type;
        this.name = this.constructor.testName;
        this.method = this.constructor.method;
    }
}


class UpdateUserActionTest extends Test {
    static testName() { return "listUsersActionTest"; }
    static type() { return "actionTest"; }

    static method({id, fullname, email, phoneNumber}) {
        var output = new Output();
        var emptyInputErrorMessage = OutputFactory.GET_INVALID_INPUT_OUTPUT("מס' מזהה", ErrorTypes.EMPTY_INPUT).messages[0];
        var dataFieldsTestResults = {
            id: SubTestFactory.GET(SubTests.ID_DATA_FIELD_SUB_TEST).run([id]),
            fullname: SubTestFactory.GET(SubTests.FULLNAME_DATA_FIELD_SUB_TEST).run([fullname]),
            email: SubTestFactory.GET(SubTests.EMAIL_DATA_FIELD_SUB_TEST).run([email]),
            phoneNumber: SubTestFactory.GET(SubTests.PHONE_NUMBER_DATA_FIELD_SUB_TEST).run([phoneNumber])
        }
        if (dataFieldsTestResults.id.isError()) {
            dataFieldsTestResults.array.forEach(testResults => {
                if (testResults.isError()) {
                    output.mergeMessages(testResults);
                    output.mergeStatus(testResults);
                }
            });
        } else {
            dataFieldsTestResults.array.forEach(testResults => {
                if (testResults.isError()) {
                    if (testResults.messages[0] != emptyInputErrorMessage) {
                        output.mergeMessages(testResults);
                        output.mergeStatus(testResults);
                    }
                } else {
                    output.mergeStatus(testResults);
                }
            });
            if (!output.isError()) {
                var newOutput = OutputFactory.GET_SUCCESS_OUTPUT([]);
                output.mergeStatus(newOutput);
                output.mergeMessages(newOutput);
            }
        }
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type;
        this.name = this.constructor.testName;
        this.method = this.constructor.method;
    }
}


class FindUserActionTest extends Test {
    static testName() { return "listUsersActionTest"; }
    static type() { return "actionTest"; }

    static method({data, field}) {
        var output = new Output();
        var dataFieldsTestResults = 
            field == id ? 
            SubTestFactory.GET(SubTests.ID_DATA_FIELD_SUB_TEST).run([data]) : 
            SubTestFactory.GET(SubTests.EMAIL_DATA_FIELD_SUB_TEST).run([data]);
        output.mergeStatus(dataFieldsTestResults);
        output.mergeMessages(dataFieldsTestResults);
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type;
        this.name = this.constructor.testName;
        this.method = this.constructor.method;
    }
}


class AllUsersActionTest extends Test {
    static testName() { return "allUsersActionTest"; }
    static type() { return "actionTest"; }

    static method() {
        var output = new Output();
        return output;
    }

    constructor() {
        super('', '', () => {})
        this.type = this.constructor.type;
        this.name = this.constructor.testName;
        this.method = this.constructor.method;
    }
}