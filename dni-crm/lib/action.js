import $ from "../include/jquery.js";
window.jQuery = jQuery
window.$ = jQuery
import { Output, ErrorTypes, OutputFactory } from './output.js';
import { Tests, TesterFactory, TestTypes, Tester } from './test1.js';



class Action {
    constructor(name, method) {
        this.name = name;
        this.method = method;
    }
    async callWithData(data) {
        console.log('action -> callWithData() -> name : ' + JSON.stringify(this.name));
        console.log('data: ' + JSON.stringify(data));
        var response = new Output();
        var testResults = this.#getActionTestResults(data);
        console.log('action -> callWithData() -> testResults: ' + JSON.stringify(testResults));
        response.merge(testResults);
        response.data = [];
        console.log('action -> callWithData() -> new response: ' + JSON.stringify(response));
        if (!response.hasErrorMessages()) { 
            data.callback = () => {};
            data.output = response;
            var results = await this.method({ ...data});
            return results;
        } else {
            throw response;
        }
    }
    async call() {
        console.log('action -> callWithData() -> name : ' + JSON.stringify(this.name));
        var inputs = this.#requireInput();
        console.log('action -> call() -> inputs : ' + JSON.stringify(inputs));
        var response = new Output();
        var testResults = this.#getActionTestResults(inputs);
        console.log('action -> call() -> testResults : ' + JSON.stringify(testResults));
        response.merge(testResults);
        response.data = [];
        console.log('action -> call() -> response : ' + JSON.stringify(response));
        console.log('new response: ' + JSON.stringify(response));
        if (!response.hasErrorMessages()) { 
            inputs.callback = () => {};
            inputs.output = response;
            var results = await this.method({ ...inputs});
            console.log('action -> call() -> results : ' + JSON.stringify(results));
            return results;
        } else {
            return response;
        }
    }
    #getActionTestResults(data) {
        console.log('action -> #getActionTestResults() -> this.name : ' + JSON.stringify(this.name));
        console.log('action -> #getActionTestResults() -> data : ' + JSON.stringify(data));
        var actionTestOutput = this.#getActionTesterHanlers()[this.name](data);
        console.log('action -> #getActionTestResults() -> actionTestOutput : ' + JSON.stringify(actionTestOutput));
        if (!actionTestOutput.hasErrorMessages()) {
            actionTestOutput.merge(OutputFactory.GET_SUCCESS_OUTPUT([]));
        }
        console.log('action -> #getActionTestResults() -> return ( actionTestOutput ) : ' + JSON.stringify(actionTestOutput));
        return actionTestOutput;
    }
    #getActionTesterHanlers() {
        return {
            [Actions.USERS_LIST_ACTION]: function(data) {
                var testerType = TestTypes.ACTION_TYPE;
                var actionTestOutput = new Output();
                var tester = TesterFactory.GET(testerType);
                console.log('action -> #getActionTestResults() -> typeof ( tester ) : ' + tester.constructor.name);
                console.log('action -> #getActionTestResults() -> tester : ' + JSON.stringify(tester));
                var test = tester.build(Tests.LIST_USERS_ACTION);
                console.log('action -> #getActionTestResults() -> test : ' + JSON.stringify(test));
                var testResults = test.run(data);
                console.log('action -> #getActionTestResults() -> testResults: ' + JSON.stringify(testResults));
                actionTestOutput.merge(testResults);
                return actionTestOutput;
            },
            [Actions.ALL_USERS_ACTION]: function(data) {
                var testerType = TestTypes.ACTION_TYPE;
                var actionTestOutput = new Output();
                var tester = TesterFactory.GET(testerType);
                console.log('action -> #getActionTestResults() -> typeof ( tester ) : ' + tester.constructor.name);
                console.log('action -> #getActionTestResults() -> tester : ' + JSON.stringify(tester));  
                var test = tester.build(Tests.ALL_USERS_ACTION);
                console.log('action -> #getActionTestResults() -> test : ' + JSON.stringify(test));
                var testResults = test.run({});
                console.log('action -> #getActionTestResults() -> testResults: ' + JSON.stringify(testResults));
                actionTestOutput.merge(testResults);
                return actionTestOutput;
            },
            [Actions.FIND_USER_BY_ID_ACTION]: function(data) {
                var testerType = TestTypes.ACTION_TYPE;
                var actionTestOutput = new Output();
                var tester = TesterFactory.GET(testerType);
                console.log('action -> #getActionTestResults() -> typeof ( tester ) : ' + tester.constructor.name);
                console.log('action -> #getActionTestResults() -> tester : ' + JSON.stringify(tester));
                var test = tester.build(Tests.FIND_USER_BY_ID_ACTION);
                console.log('action -> #getActionTestResults() -> test : ' + JSON.stringify(test));
                var testResults = test.run(data);
                console.log('action -> #getActionTestResults() -> testResults: ' + JSON.stringify(testResults));
                actionTestOutput.merge(testResults);
                return actionTestOutput;
            },
            [Actions.FIND_USER_BY_EMAIL_ACTION]: function(data) {
                var testerType = TestTypes.ACTION_TYPE;
                var actionTestOutput = new Output();
                var tester = TesterFactory.GET(testerType);
                console.log('action -> #getActionTestResults() -> typeof ( tester ) : ' + tester.constructor.name);
                console.log('action -> #getActionTestResults() -> tester : ' + JSON.stringify(tester));
                var test = tester.build(Tests.FIND_USER_BY_EMAIL_ACTION);
                console.log('action -> #getActionTestResults() -> test : ' + JSON.stringify(test));
                var testResults = test.run(data);
                console.log('action -> #getActionTestResults() -> testResults: ' + JSON.stringify(testResults));
                actionTestOutput.merge(testResults);
                return actionTestOutput;
            },
            [Actions.ADD_USER_ACTION]: function(data) {
                var testerType = TestTypes.ACTION_TYPE;
                var actionTestOutput = new Output();
                var tester = TesterFactory.GET(testerType);
                console.log('action -> #getActionTestResults() -> typeof ( tester ) : ' + tester.constructor.name);
                console.log('action -> #getActionTestResults() -> tester : ' + JSON.stringify(tester));
                var test = tester.build(Tests.ADD_USER_ACTION);
                console.log('action -> #getActionTestResults() -> test : ' + JSON.stringify(test));
                var testResults = test.run(data);
                console.log('action -> #getActionTestResults() -> testResults: ' + JSON.stringify(testResults));
                actionTestOutput.merge(testResults);
                return actionTestOutput;
            },
            [Actions.DELETE_USER_ACTION]: function(data) {
                var testerType = TestTypes.ACTION_TYPE;
                var actionTestOutput = new Output();
                var tester = TesterFactory.GET(testerType);
                console.log('action -> #getActionTestResults() -> typeof ( tester ) : ' + tester.constructor.name);
                console.log('action -> #getActionTestResults() -> tester : ' + JSON.stringify(tester));
                var test = tester.build(Tests.DELETE_USER_ACTION);
                console.log('action -> #getActionTestResults() -> test : ' + JSON.stringify(test));
                var testResults = test.run(data);
                console.log('action -> #getActionTestResults() -> testResults: ' + JSON.stringify(testResults));
                actionTestOutput.merge(testResults);
                return actionTestOutput;
            },
            [Actions.UPDATE_USER_ACTION]: function(data) {
                var testerType = TestTypes.ACTION_TYPE;
                var actionTestOutput = new Output();
                var tester = TesterFactory.GET(testerType);
                console.log('action -> #getActionTestResults() -> typeof ( tester ) : ' + tester.constructor.name);
                console.log('action -> #getActionTestResults() -> tester : ' + JSON.stringify(tester));
                var test = tester.build(Tests.UPDATE_USER_ACTION);
                console.log('action -> #getActionTestResults() -> test : ' + JSON.stringify(test));
                var testResults = test.run(data);
                console.log('action -> #getActionTestResults() -> testResults: ' + JSON.stringify(testResults));
                actionTestOutput.merge(testResults);
                return actionTestOutput;
            }
        }
    }
    #requireInput() {
        var inputsNames = this.method.toString()
        .match(/\(([^)]+)\)/)[1]  // Extract the parameters string inside the parentheses
        .replace(/[{}]/g, '')     // Remove curly braces
        .split(',')               // Split the string into an array by commas
        .map(name => name.trim()) // Trim whitespace from each parameter name
        .filter(name => name !== 'callback' && name !== '' && name !== 'output'); // Remove 'callback' and empty strings    
        console.log('inputsNames: ' + JSON.stringify(inputsNames));
        console.log('action -> #requireInput() -> typeof ( inputsNames ) : ' + typeof(inputsNames));
        console.log('action -> #requireInput() -> inputsNames : ' + JSON.stringify(inputsNames));
        var translatedInputsNames = {
            id: "מס' מזהה",
            fullname: "שם מלא",
            phoneNumber: "מספר טלפון",
            email: "כתובת אימייל",
            limit: "מספר מקסימלי של משתמשים",
        };
        console.log('action -> #requireInputs() -> translatedInputsNames : ' + JSON.stringify(translatedInputsNames));
        var inputs = {};
        inputsNames.forEach(name => inputs[name] = prompt("אנא הכנס " + translatedInputsNames[name] + ": "));
        return inputs;
    }
}


class Actions {
    static USERS_LIST_ACTION = 'usersList';
    static ALL_USERS_ACTION = 'allUsers';
    static FIND_USER_BY_ID_ACTION = 'findByIdUser';
    static FIND_USER_BY_EMAIL_ACTION = 'findByEmailUser';
    static ADD_USER_ACTION = 'addUser';
    static DELETE_USER_ACTION = "deleteUser";
    static UPDATE_USER_ACTION = "updateUser";
    constructor(){}
}


class ActionFactory {
    static GET(action) {
        switch (action) {
            case Actions.USERS_LIST_ACTION:
                return new UsersListAction();
            case Actions.ALL_USERS_ACTION:
                return new AllUsersAction();
            case Actions.FIND_USER_BY_ID_ACTION:
                return new FindUserByIdAction();
            case Actions.FIND_USER_BY_EMAIL_ACTION:
                return new FindUserByEmailAction();
            case Actions.ADD_USER_ACTION:
                return new AddUserAction();
            case Actions.DELETE_USER_ACTION:
                return new DeleteUserAction();
            case Actions.UPDATE_USER_ACTION:
                return new UpdateUserAction();
            default:
                return null;
        }
    }
}


class UsersListAction extends Action {
    static name() { return Actions.USERS_LIST_ACTION; }

    static async method({limit, callback, output}) {
        var results = {};
        console.log('action -> ' + typeof this + ' -> method() -> output : ' + JSON.stringify(output));
        await $.ajax({
            url: 'https://ilay-apis.online/APIs/API-7/index.php/user/list?limit=' + limit,
            type: 'GET',
            success: function (data) {
                if (data.length == 0) {
                    //callback.error(OutputFactory.GET_SYSTEM_ERROR_OUTPUT(ErrorTypes.USER_NOT_FOUND));
                } else {
                    console.log('action -> UsersListAction -> output *WITH OUT DATA* : ' + JSON.stringify(output));
                    output.addData(data)
                    results = output;
                }
            }
        });
        return results;
    }

    constructor() {
        super('', () => {});
        this.name = this.constructor.name();
        this.method = this.constructor.method;
    }
}


class AllUsersAction extends Action {
    static name() { return Actions.ALL_USERS_ACTION; }

    static test({}) {
        return OutputFactory.GET_SUCCESS_OUTPUT([]);
    }

    static async method({callback, output}) {
        var results = {};
        console.log('action -> ' + typeof this + ' -> method() -> output : ' + JSON.stringify(output));
        var limit = 9999;
        await $.ajax({
            url: 'https://ilay-apis.online/APIs/API-7/index.php/user/list?limit=' + limit,
            type: 'GET',
            success: function (data)  {
                if (data.length == 0) {
                    //Nothing...
                } else {
                    console.log('action -> AllUsersAction -> method() -> output *WITH OUT DATA* : ' + JSON.stringify(output));
                    output.addData(data);
                    results = output;
                }
            },
            error: function (data) {
                //Nothing...
            }
        });
        return results;
    }

    constructor() {
        super('', () => {});
        this.name = this.constructor.name();
        this.method = this.constructor.method;
    }
}


class FindUserByIdAction extends Action {
    static name() { return Actions.FIND_USER_BY_ID_ACTION; }

    static async method({id, callback, output}) {
        var results = {};
        console.log('action -> ' + typeof this + ' -> method() -> output : ' + JSON.stringify(output));
        await $.ajax({url: 'https://ilay-apis.online/APIs/API-7/index.php/user/findById?id=' + id,
            type: 'GET', 
            success: function (data) {
                console.log('action -> FindUserByIdAction -> output *WITH OUT DATA* : ' + JSON.stringify(output));
                output.addData([data]);
                results = output;
            },
            error: function (data) {
                //Nothing...
            }
        });
        return results;
    }

    constructor() {
        super('', () => {}); // Dummy values for initialization
        this.name = this.constructor.name();
        this.method = this.constructor.method;
    }
}

class FindUserByEmailAction extends Action {
    static name() { return Actions.FIND_USER_BY_EMAIL_ACTION; }

    static async method({email, callback, output}) {
        var results = {};
        console.log('action -> ' + typeof this + ' -> method() -> output : ' + JSON.stringify(output));
        await $.ajax({url: 'https://ilay-apis.online/APIs/API-7/index.php/user/findByEmail?email=' + email,
            type: 'GET', 
            success: function (data) {
                console.log('action -> FindUserByEmailAction -> output *WITH OUT DATA* : ' + JSON.stringify(output));
                output.addData([data]);
                results = output;
            },
            error: function (data) {
                //Nothing...
            }
        });
        return results;
    }

    constructor() {
        super('', () => {}); // Dummy values for initialization
        this.name = this.constructor.name();
        this.method = this.constructor.method;
    }
}


class AddUserAction extends Action {
    static name() { return Actions.ADD_USER_ACTION; }

    static async method({fullname, phoneNumber, email, callback, output}) {
        var results = {};
        console.log('action -> ' + typeof this + ' -> method() -> output : ' + JSON.stringify(output));
        await $.ajax({
            url: 'https://ilay-apis.online/APIs/API-7/index.php/user/append?' +
                'fullname=' + fullname + '&phoneNumber=' + phoneNumber + '&email=' + email,
            type: 'GET',
            success: function (data) {
                console.log('action -> AddUserAction -> success : ' + JSON.stringify(data));
                console.log('action -> AddUserAction -> output *WITH OUT DATA* : ' + JSON.stringify(output));
                output.addData(data);
                results = output;
            },
            error: function (data) {
                console.log('action -> AddUserAction -> error : ' + JSON.stringify(data));
                console.log('action -> AddUserAction -> output *WITH OUT DATA* : ' + JSON.stringify(output));
                output.addData([]);
                results = output;
            }
        });
        return results;
    }

    constructor() {
        super('', () => {}); // Dummy values for initialization
        // Override the parent class properties with private values
        this.name = this.constructor.name();
        this.method = this.constructor.method;

    }

}


class DeleteUserAction extends Action {
    static name() { return Actions.DELETE_USER_ACTION }

    static async method({id, callback, output}) {
        var results = {};
        console.log('action -> ' + typeof this + ' -> method() -> output : ' + JSON.stringify(output));
        await $.ajax({
            url: 'https://ilay-apis.online/APIs/API-7/index.php/user/delete?id=' + id,
            type: 'GET',
            success: function (data) {
                console.log('action -> DeleteUserAction -> output *WITH OUT DATA* : ' + JSON.stringify(output));
                output.addData(data);
                results = output;
            }, 
            error: function (data) {
                //Nothing...
            } 
        });
        return results;
    }

    constructor() {
        super('', () => {}); // Dummy values for initialization
        this.name = this.constructor.name();
        this.method = this.constructor.method;
    }
}


class UpdateUserAction extends Action {
    static name() { return Actions.UPDATE_USER_ACTION; }

    static async method({id, fullname, email, phoneNumber, callback, output}) {
        var results = {};
        console.log('action -> ' + typeof this + ' -> method() -> output : ' + JSON.stringify(output));
        id = id;
        var path = 'https://ilay-apis.online/APIs/API-7/index.php';
        var query = '/user/update?id=' + id;
        if (fullname != null && fullname.toString().length != 0) {
            query = query + '&fullname=' + fullname;
        } else {
            fullname = "";
        }
        if (phoneNumber != null && phoneNumber.toString().length != 0) {
            query = query + '&phoneNumber=' + phoneNumber;
        } else {
            phoneNumber = "";
        }
        if (email != null && email.toString().length != 0) {
            query = query + '&email=' + email;
        } else {
            email = "";
        }
        var url = path + query;
        console.log('url: ' + url);
        await $.ajax({
            url: url,
            type: 'GET',
            success: async function (data) {
                console.log('data: ' + JSON.stringify(data));
                console.log('action -> UpdateUserAction -> output *WITH OUT DATA* : ' + JSON.stringify(output));
                output.addData(data);
                results = output;
            }, error: function (data) {
                var errorOutput = OutputFactory.GET_INTERNAL_SERVER_ERROR_OUTPUT(ErrorTypes.USER_NOT_FOUND);
                output.merge(errorOutput);
                results = output;
            }
        });
        return results;
    }

    constructor() {
        super('', () => {}); // Dummy values for initialization
        this.name = this.constructor.name();
        this.method = this.constructor.method;
    }
}


export { ActionFactory, Action, Actions};

/*




        for (const [key, value] of Object.entries(data)) {
            switch (key) {
                case 'id':
                    testResults.mergeStatus(TestFactory.GET(Tests.ID_DATA_FIELD_SUB).run(value));
                    break;
                case 'fullname':
                    testResults.mergeStatus(TestFactory.GET(Tests.FULLNAME_DATA_FIELD_SUB).run(value));
                    break;
                case 'email':
                    testResults.mergeStatus(TestFactory.GET(Tests.EMAIL_DATA_FIELD_SUB).run(value));
                    break;
                case 'phoneNumber':
                    testResults.mergeStatus(TestFactory.GET(Tests.PHONE_NUMBER_DATA_FIELD_SUB).run(value));
                    break;
                case 'limit':
                    testResults.mergeStatus(TestFactory.GET(Tests.LIMIT_DATA_FIELD_SUB).run(value));
                    break;
            }
        }

class  f{


    static callAction(action) {
        
    }


    
    _findUser() {
        var id = prompt("Enter Id: ");
        if (!isNaN(id)) {
            $.ajax({
                url: 'https://ilay-apis.online/APIs/API-7/index.php/user/find?id=' + id,
                type: 'GET',
                success: function (data) {
                    reloadTable([data]);
                }
            });
        } else {
            alert("Error. You must enter a valid id to get a specific user.");
        }
    }
    
    _addUser() {
        var fullname = prompt("Enter fullname: ");
        var phoneNumber = prompt("Enter phoneNumber: ");
        var email = prompt("Enter email: ");
        if (typeof fullname === "string" && typeof phoneNumber === "string" && typeof email === "string") {
            $.ajax({
                url: 'https://ilay-apis.online/APIs/API-7/index.php/user/append?' +
                    'fullname=' + fullname + '&phoneNumber=' + phoneNumber + '&email=' + email,
                type: 'GET',
                success: function (data) {
                    reloadTable(data);
                }
            });
        } else {
            alert("Error. You can only use letters (a-z, A-Z) , digits (0-9) , and symbols ('-', '_') .")
        }
    }
    
    
    _deleteUser() {
        var id = prompt("Enter Id: ");
        if (!isNaN(id)) {
            $.ajax({
                url: 'https://ilay-apis.online/APIs/API-7/index.php/user/delete?id=' + id,
                type: 'GET',
                success: function (data) {
                    reloadTable(data);
                }
            });
        } else {
            alert("Error. You must enter a valid id to delete a specific user.");
        }
    }
}
    
    
    function updateUser() {
        var id = prompt("Enter Id: ");
        if (!isNaN(id)) {
            var fullname = prompt("Enter fullname (Leave Empty For Not Changing): ");
            var phoneNumber = prompt("Enter phoneNumber(Leave Empty For Not Changing): ");
            var email = prompt("Enter email(Leave Empty For Not Changing): ");
            if (typeof fullname === "string" || typeof phoneNumber === "string" || typeof email === "string") {
                $.ajax({
                    url: 'https://ilay-apis.online/APIs/API-7/index.php/user/update?id=' + id +
                        (fullname != "" ? ('&fullname=' + fullname) :
                            (phoneNumber != "" ? ('&phoneNumber=' + phoneNumber) :
                                (email != "" ? ('&email=' + email) : ("")))),
                    type: 'GET',
                    success: function (data) {
                        reloadTable(data);
                    }
                });
            } else {
                alert("Error. You must enter a valid id to delete a specific user.");
            }
        }
}

*/