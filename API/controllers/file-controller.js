const fileService = require('../services/file-service');
const billService = require('../services/bill-service');

const userService = require('../services/user-service');




/**
 * Creating a new FIle
 */
exports.post = function (request, response, next) {

    let requestedUser, requestedBill;

    const resolve = (file) => {
        response.status(201);
        response.json(file);
    };

    const saveFile = () => {

        fileService.save(request, response, url, url)
            .then(resolve)
            .catch(renderErrorResponse(response, 500));
    };

    const validateFile = (file) => {
        if (file.length != 0) {
            response.status(400);
            response.json({ message: "File already exists for bill" });
        } else {
            saveFile();
        }
    };

    const getFile = () => {
        fileService.getFileForBill(request, response)
            .then(validateFile)
            .catch(renderErrorResponse(response, 500));
    }

    const getBillsForUserResolve = (bills) => {
        if (bills.length == 0) {
            response.status(404);
            response.json(bills);
        } else if (bills[0].owner_id != requestedUser.id) {
            response.status(401);
            response.json({ message: "UnAuthorized" });
        } else {
            requestedBill = bills[0];
            getFile();
        }
    };

    const validateGetOneResolve = () => {
        billService.getOneBillsForUser(request, response, requestedUser)
            .then(getBillsForUserResolve)
            .catch(renderErrorResponse(response, 500));
    }

    userService.validateCredentials(request, response)
        .then((user) => {
            requestedUser = user;
            validateGetOneResolve();
        })
        .catch(renderErrorResponse(response, 401, "Invalid user credentials"));



};


/**
 * Getting a particular file
 */
exports.getOne = function (request, response) {

    let requestedUser, requestedBill;

    const validateFileAndBill = (file) => {
        if (file.length == 0) {
            response.status(404);
            response.json(file);
        } else if(file[0].owner_id != requestedBill.owner_id){
            response.status(401);
            response.json({ message: "UnAuthorized" });
        } else if (file[0].bill_id != requestedBill.id) {
            response.status(400);
            response.json({ message: "Invalid file" });
        }  else {
            response.status(200);
            response.json(file);
        }
    };

    const getFile = () => {
        fileService.getOneFile(request, response)
            .then(validateFileAndBill)
            .catch(renderErrorResponse(response, 500));
    }

    const getBillsForUserResolve = (bills) => {
        if (bills.length == 0) {
            response.status(404);
            response.json(bills);
        } else if (bills[0].owner_id != requestedUser.id) {
            response.status(401);
            response.json({ message: "UnAuthorized" });
        } else {
            requestedBill = bills[0];
            getFile();
        }
    };

    const validateGetOneResolve = () => {
        billService.getOneBillsForUser(request, response, requestedUser)
            .then(getBillsForUserResolve)
            .catch(renderErrorResponse(response, 500));
    }

    userService.validateCredentials(request, response)
        .then((user) => {
            requestedUser = user;
            validateGetOneResolve();
        })
        .catch(renderErrorResponse(response, 401, "Invalid user credentials"));

};


exports.deleteOne = function (request, response) {

 
    let requestedUser, requestedBill;

    const resolve = () => {
        response.status(204);
        response.json({});
    };

    const deleteFile = () => {
        fileService.deleteOne(request, response)
            .then(resolve)
            .catch(renderErrorResponse(response, 500));
    };

    const validateFileAndBill = (file) => {
        if (file.length == 0) {
            response.status(404);
            response.json(file);
        } else if(file[0].owner_id != requestedBill.owner_id){
            response.status(401);
            response.json({ message: "UnAuthorized" });
        } else if (file[0].bill_id != requestedBill.id) {
            response.status(400);
            response.json({ message: "Invalid file" });
        }  else {
            deleteFile();
        }
    };

    const getFile = () => {
        fileService.getOneFile(request, response)
            .then(validateFileAndBill)
            .catch(renderErrorResponse(response, 500));
    }

    const getBillsForUserResolve = (bills) => {
        if (bills.length == 0) {
            response.status(404);
            response.json(bills);
        } else if (bills[0].owner_id != requestedUser.id) {
            response.status(401);
            response.json({ message: "UnAuthorized" });
        } else {
            requestedBill = bills[0];
            getFile();
        }
    };

    const validateGetOneResolve = () => {
        billService.getOneBillsForUser(request, response, requestedUser)
            .then(getBillsForUserResolve)
            .catch(renderErrorResponse(response, 500));
    }

    userService.validateCredentials(request, response)
        .then((user) => {
            requestedUser = user;
            validateGetOneResolve();
        })
        .catch(renderErrorResponse(response, 401, "Invalid user credentials"));


};


//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
/**
 * Function for rendering the error on the screen
 */
let renderErrorResponse = (response, code, message) => {

    const errorCallback = (error) => {
        console.log(error);
        if (error) {
            response.status(code);
            response.json({
                message: error.message
            });
        } else {
            response.status(code);
            response.json({
                message: message ? message : ""
            });
        }
    }
    return errorCallback;
};


