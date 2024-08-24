document.addEventListener("DOMContentLoaded", () => {
    authCheck();
});

function authCheck() {
    const content = document.getElementById("content");
    
    chrome.storage.local.get("isAuth", (result) => {
        
        if (true) {
            content.innerHTML = `<iframe src="../chat/chat.html" style="width:100%; height:100%; border:none;"></iframe>`;
        } else {
           
            content.innerHTML = `<iframe src="../login/login.html" style="width:100%; height:100%; border:none;"></iframe>`;
           
           
        }
    });
};
