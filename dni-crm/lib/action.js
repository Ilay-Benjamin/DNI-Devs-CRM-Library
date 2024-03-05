import $ from "../include/jquery.js";
window.jQuery = jQuery
window.$ = jQuery
import { Output, ErrorTypes, OutputFactory } from './output.js';
import { Test, Tests, TestFactory } from './test.js';



class Action {

    constructor(name, method) {
        this.name = name;
        this.method = method;
    }

    async callWithData(data) {
        console.log('data: ' + JSON.stringify(data));

        var response = new Output();
        var testResults = this.#getActionTestResults(data);
        console.log('testResults: ' + JSON.stringify(testResults));

        response.mergeStatus(testResults);
        response.mergeMessages(testResults);
        response.data = [];
        console.log('new response: ' + JSON.stringify(response));

        if (response.status) { 
            data.callback = () => {};
            data.output = response;
            var results = await this.method({ ...data});
            return results;
        } else {
            //callback.error(response);
        }
    }

    async call() {
        var inputs = this.#requireInput();
        console.log('inputs: ' + JSON.stringify(inputs));

        var response = new Output();
        var testResults = this.#getActionTestResults(inputs);
        console.log('testResults: ' + JSON.stringify(testResults));

        response.mergeStatus(testResults);
        response.mergeMessages(testResults);
        response.data = [];
        console.log('new response: ' + JSON.stringify(response));

        if (response.status) { 
            inputs.callback = () => {};
            inputs.output = response;
            var results = await this.method({ ...inputs});
            return results;
        } else {
            //callback.error(response);
        }
    }

    #getActionTestResults(data) {
        var testResults = new Output();
        switch (this.name) {
            case Actions.USERS_LIST_ACTION:
                var test = TestFactory.GET(Tests.LIST_USERS_ACTION_TEST);
                testResults.mergeStatus(test.run(data.limit));
                break;
            case Actions.ALL_USERS_ACTION:
                var test = TestFactory.GET(Tests.ALL_USERS_ACTION_TEST);
                testResults.mergeStatus(test.run());
                break;
            case Actions.FIND_USER_ACTION:
                var test = TestFactory.GET(Tests.FIND_USER_ACTION_TEST);
                if (data.id == null && data.email != null) {
                    testResults.mergeStatus(TestFactory.GET(Tests.EMAIL_DATA_FIELD_SUB_TEST).run(data.email));
                } else if (data.id != null && data.email == null) {
                    testResults.mergeStatus(TestFactory.GET(Tests.ID_DATA_FIELD_SUB_TEST).run(data.id));
                }
                break;
            case Actions.ADD_USER_ACTION:
                var test = TestFactory.GET(Tests.ADD_USER_ACTION_TEST);
                testResults.mergeStatus(test.run(data.fullname, data.phoneNumber, data.email));
                break;
            case Actions.DELETE_USER_ACTION:
                var test = TestFactory.GET(Tests.DELETE_USER_ACTION_TEST);
                testResults.mergeStatus(test.run(data.id));
                break;
            case Actions.UPDATE_USER_ACTION:
                var test = TestFactory.GET(Tests.UPDATE_USER_ACTION_TEST);
                testResults.mergeStatus(test.run(data.id, data.fullname, data.phoneNumber, data.email));
                break;
        }
        return testResults;
    }

    #requireInput() {
        var inputsNames = this.method.toString()
        .match(/\(([^)]+)\)/)[1]  // Extract the parameters string inside the parentheses
        .replace(/[{}]/g, '')     // Remove curly braces
        .split(',')               // Split the string into an array by commas
        .map(name => name.trim()) // Trim whitespace from each parameter name
        .filter(name => name !== 'callback' && name !== '' && name !== 'output'); // Remove 'callback' and empty strings    
        var translatedInputsNames = {
            id: "מס' מזהה",
            fullname: "שם מלא",
            phoneNumber: "מספר טלפון",
            email: "כתובת אימייל",
            limit: "מספר מקסימלי של משתמשים",
        };
        console.log('inputsNames: ' + inputsNames);
        console.log('translatedInputsNames: ' + JSON.stringify(translatedInputsNames));
        var inputs = {};
        inputsNames.forEach(name => inputs[name] = prompt("אנא הכנס " + translatedInputsNames[name] + ": "));
        return inputs;
    }
    
}


class Actions {
    static USERS_LIST_ACTION = 'usersList';
    static ALL_USERS_ACTION = 'allUsers';
    static FIND_USER_ACTION = 'findUser';
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
            case Actions.FIND_USER_ACTION:
                return new FindUserAction();
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
    static name() { return "usersList"; }

    static async method({limit, callback, output}) {
        var results = [];
        await $.ajax({
            url: 'https://ilay-apis.online/APIs/API-7/index.php/user/list?limit=' + limit,
            type: 'GET',
            success: function (data) {
                if (data.length == 0) {
                    //callback.error(OutputFactory.GET_SYSTEM_ERROR_OUTPUT(ErrorTypes.USER_NOT_FOUND));
                } else {
                    console.log('data: ' + JSON.stringify(data));
                    console.log('output before addData(): ' + JSON.stringify(output));
                    output.addData(data);
                    results = data;
                }
            }
        });
        return results;
    }

    constructor() {
        super('', () => {});
        this.name = this.constructor.name;
        this.method = this.constructor.method;
    }
}


class AllUsersAction extends Action {
    static name() { return "usersList"; }

    static test({}) {
        return OutputFactory.GET_SUCCESS_OUTPUT([]);
    }

    static async method({callback, output}) {
        var results = [];
        var limit = 9999;
        await $.ajax({
            url: 'https://ilay-apis.online/APIs/API-7/index.php/user/list?limit=' + limit,
            type: 'GET',
            success: function (data)  {
                if (data.length == 0) {
                    //Nothing...
                } else {
                    console.log('data: ' + JSON.stringify(data));
                    output.addData(data);
                    results = data;
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
        this.name = this.constructor.name;
        this.method = this.constructor.method;
    }
}


class FindUserAction extends Action {
    static name() { return "findUser"; }

    static async method({id, callback, output}) {
        var results = [];
        await $.ajax({url: 'https://ilay-apis.online/APIs/API-7/index.php/user/find?id=' + id,
            type: 'GET', 
            success: function (data) {
                console.log('data: ' + JSON.stringify(data));
                output.addData([data]);
                results = data;
            },
            error: function (data) {
                //Nothing...
            }
        });
        return results;
    }

    constructor() {
        super('', () => {}); // Dummy values for initialization
        this.name = this.constructor.name;
        this.method = this.constructor.method;
    }
}


class AddUserAction extends Action {
    static name() { return "addUser"; }

    static async method({fullname, phoneNumber, email, callback, output}) {
        var results = [];
        await $.ajax({
            url: 'https://ilay-apis.online/APIs/API-7/index.php/user/append?' +
                'fullname=' + fullname + '&phoneNumber=' + phoneNumber + '&email=' + email,
            type: 'GET',
            success: function (data) {
                output.addData(data);
                results = data;
            },
            error: function (data) {
                //Nothing...
            }
        });
        return results;
    }

    constructor() {
        super('', () => {}); // Dummy values for initialization
        // Override the parent class properties with private values
        this.name = this.constructor.name;
        this.method = this.constructor.method;

    }

}


class DeleteUserAction extends Action {
    static name() { return "deleteUser"; }

    static async method({id, callback, output}) {
        var results = [];
        await $.ajax({
            url: 'https://ilay-apis.online/APIs/API-7/index.php/user/delete?id=' + id,
            type: 'GET',
            success: function (data) {
                output.addData(data);
                results = data;
            }, 
            error: function (data) {
                //Nothing...
            } 
        });
        alert('results: ' + JSON.stringify(results));
        return results;
    }

    constructor() {
        super('', () => {}); // Dummy values for initialization
        this.name = this.constructor.name;
        this.method = this.constructor.method;
    }
}


class UpdateUserAction extends Action {
    static name() { return "updateUser"; }

    static async method({id, fullname, phoneNumber, email, callback, output}) {
        var results = [];
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
            url: 'https://ilay-apis.online/APIs/API-7/index.php/user/find?id=' + id,
            type: 'GET', 
            success: async function (data) {
                console.log('data: ' + JSON.stringify(data));
                await $.ajax({
                    url: url,
                    type: 'GET',
                    success: function (data) {
                        output.addData(data);
                        results = data;
                    }
                });
            }, error: function (data) {
                //Nothing...
        }});
        return results;
    }

    constructor() {
        super('', () => {}); // Dummy values for initialization
        this.name = this.constructor.name;
        this.method = this.constructor.method;
    }
}


export { ActionFactory, Action, Actions};

/*




        for (const [key, value] of Object.entries(data)) {
            switch (key) {
                case 'id':
                    testResults.mergeStatus(TestFactory.GET(Tests.ID_DATA_FIELD_SUB_TEST).run(value));
                    break;
                case 'fullname':
                    testResults.mergeStatus(TestFactory.GET(Tests.FULLNAME_DATA_FIELD_SUB_TEST).run(value));
                    break;
                case 'email':
                    testResults.mergeStatus(TestFactory.GET(Tests.EMAIL_DATA_FIELD_SUB_TEST).run(value));
                    break;
                case 'phoneNumber':
                    testResults.mergeStatus(TestFactory.GET(Tests.PHONE_NUMBER_DATA_FIELD_SUB_TEST).run(value));
                    break;
                case 'limit':
                    testResults.mergeStatus(TestFactory.GET(Tests.LIMIT_DATA_FIELD_SUB_TEST).run(value));
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