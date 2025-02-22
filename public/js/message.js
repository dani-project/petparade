const token2 = localStorage.getItem("token");

if (token2) {
    const decodedToken2 = jwt_decode(token2);
    user_id2 = decodedToken2.userId;
    console.log(decodedToken2);
    console.log("messaging user id is " + user_id2);
    usernameX = decodedToken2.username
    console.log("messaging user name is " + usernameX);

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('messageForm');
        form.addEventListener('submit', handleFormSubmit); // handle form submissions 
    });
    
    function handleFormSubmit(event) {
        event.preventDefault();
        const messageInput = document.getElementById('messageInput');
        const messageText = messageInput.value //take input from the message input text box form
        
        const token = localStorage.getItem("token");
    
        const data = {
            message_text: messageText, // data to be posted in  
            username: usernameX
        };
    
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
    
            if (responseStatus == 201) {
                window.location.reload() //refreshes the page to show new messages added
                console.log("loaded")
            }
        }
    
        fetchMethod(currentUrl + '/api/message', callback, "POST", data, token);
    }
} else {
    // basically if not logged in, it will not show the enter message form
    const form = document.getElementById('messageForm');
    form.style.display = 'none';
}

// shows all the messages sent by every user 
const messageCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const messageBoard = document.getElementById("messageBoard");
    messageBoard.innerHTML = ''; 

    responseData.forEach((message) => {
        const displayItem = document.createElement("div");
        displayItem.className = "card";
        displayItem.innerHTML = ` 
            <div class="card-body"> 
            <form id="message-form-${message.id}"> 
            <div id="username">${message.username} </div> 
            <input type="text" id="message-text-${message.id}" name="message_text" value="${message.message_text}" disabled required> 
            <button type="submit" class="btn btn-primary d-none">Save Changes</button> 
            </form> 
            </div> 
            <div id="message" class="card-footer"> 
            <!-- Buttons for message by user --> 
            </div> 
        `;
        messageBoard.appendChild(displayItem);

        //if token -> logged in --> got user 
        if (localStorage.getItem("token")) {
            const callbackForUser = (responseStatus, responseData) => {

                if (responseData.userId == message.user_id) {

                    const messageFooter = displayItem.querySelector("#message");

                    const editMessage = document.createElement("button");
                    editMessage.className = "btn btn-primary";
                    editMessage.textContent = "Edit";
                    editMessage.id = `edit-${message.id}`;
                    messageFooter.appendChild(editMessage);

                    const deleteMessage = document.createElement("button");
                    deleteMessage.className = "btn btn-primary ms-5";
                    deleteMessage.textContent = "Delete";
                    deleteMessage.id = `delete-${message.id}`;
                    messageFooter.appendChild(deleteMessage);

                    // edit message event listener for the button
                    editMessage.addEventListener("click", function () {
                        messageInput = document.getElementById(`message-text-${message.id}`);

                        //show the text box 
                        messageInput.disabled = false;

                        const saveMessage = document.querySelector(`#message-form-${message.id} .btn-primary`);
                        saveMessage.classList.remove("d-none")
                        //show save button 

                        const messageForm = document.getElementById(`message-form-${message.id}`);

                        messageForm.addEventListener('submit', (event) => {
                            event.preventDefault();

                            const messageText = messageInput.value;

                            const data = {
                                message_text: messageText,
                                user_id: user_id2
                            } //the data to be put to the message to edit it

                            if (messageText == "") {
                                return;
                            }

                            const callbackForEdit = (responseStatusEdit, responseDataEdit) => {

                                if (responseStatusEdit == 200) {
                                    messageInput.disabled = true;
                                    saveMessage.classList.add("d-none");
                                }
                            }

                            fetchMethod(`${currentUrl}/api/message/${message.id}`, callbackForEdit, "PUT", data, localStorage.getItem("token"));
                        }) //endpoint to edit the message

                    })

                    ///////// Delete Button////////////////// 
                    deleteMessage.addEventListener("click", function () {

                        const data = {
                            messageId: message.id
                        }

                        const callbackForDelete = (responseStatusDelete, responseDataDelete) => {
                            if (responseStatusDelete == 200) {
                                // Reload the current page 
                                console.log("Test")
                                window.location.reload();
                            }
                        }// endpoint to delete message
                        fetchMethod(`${currentUrl}/api/message/${message.id}`, callbackForDelete, "DELETE", data, localStorage.getItem("token"))
                    });
                }
            }
            fetchMethod(currentUrl + "/api/jwt/verify", callbackForUser, "GET", null, localStorage.getItem("token"))
        }
    });
}; // fetches all the messages posted
fetchMethod(currentUrl + "/api/message", messageCallback);
