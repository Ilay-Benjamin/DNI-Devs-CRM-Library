import $ from "./include/jquery.js";
window.jQuery = jQuery
window.$ = jQuery
import { Output, ErrorTypes, OutputFactory } from './lib/output.js';
import { Action, Actions, ActionFactory } from './lib/action.js';
import { Test, Tests, TestFactory } from './lib/test1.js';

export { Output, ErrorTypes, OutputFactory, Action, Actions, ActionFactory, Test, Tests, TestFactory }
    
const myHeaders = new Headers();
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append('Access-Control-Allow-Credentials', 'true');
myHeaders.append("Access-Control-Allow-Headers", "X-Requested-With");
myHeaders.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');


export class Dni {

    constructor() {}

    async addUser(fullname, email, phoneNumber) {
        const action = ActionFactory.GET(Actions.ADD_USER_ACTION);
        const callback = () => {};
        const data = {
            fullname: fullname,
            phoneNumber: phoneNumber,
            email: email
        }
        const response =  await action.callWithData(data);
        return response;
    }

    async getUsersList(limit) {
        const action = ActionFactory.GET(Actions.USERS_LIST_ACTION);
        const callback = () => {};
        const data = {
            limit: limit
        }
        const response =  await action.callWithData(data);
        return response;
    }

    async getAllUsersList() {
        const action = ActionFactory.GET(Actions.ALL_USERS_ACTION);
        console.log('dni -> getAllUsersList: ' + JSON.stringify(action));
        const callback = () => {};
        const response =  await action.call();
        console.log('dni : getAllUsersList() -> response: ' + JSON.stringify(response));
        return response;
    }

    async findUserById(id) {
        const action = ActionFactory.GET(Actions.FIND_USER_BY_ID_ACTION);
        const callback = () => {};
        const data = {
            id: id
        }
        const response =  await action.callWithData(data);
        return response;
    }

    async findUserByEmail(email) {
        const action = ActionFactory.GET(Actions.FIND_USER_BY_EMAIL_ACTION);
        const callback = () => {};
        const data = {
            email: email
        }
        const response =  await action.callWithData(data);
        return response;
    }

    async deleteUserById(id) {
        const action = ActionFactory.GET(Actions.DELETE_USER_ACTION);
        const callback = () => {};
        const data = {
            id: id
        }
        const response =  await action.callWithData(data);
        return response;
    }

    async updateUserById(id, fullname, email, phoneNumber) {
        const action = ActionFactory.GET(Actions.UPDATE_USER_ACTION);
        const callback = () => {};
        const data = {
            id: id,
            fullname: fullname,
            phoneNumber: phoneNumber,
            email: email
        }
        const response =  await action.callWithData(data);
        return response;
    }

}