

document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.getElementById("google");
    const logout =document.getElementById("logout");

    authBtn.addEventListener("click", () => {
        console.log("Google Auth button clicked");
        
        chrome.identity.launchWebAuthFlow(
            {
                url: "http://localhost:5000/genchat/login",
                interactive: true,
            },
            function (redirectUrl) {
                if (chrome.runtime.lastError) {
                    console.error("Google OAuth failed"+chrome.runtime.error+" "+redirectUrl);
                } 
                else if (redirectUrl.includes("error")){
                    console.log("from"+redirectUrl);
                }
                else {
                    console.log("Google OAuth successful");
                    
                }
            }
        );
    });


    logout.addEventListener("click", () => {
        chrome.storage.local.clear();
        chrome.runtime.sendMessage("close",(response)=>{
            console.log("sended");
            

        })
        /*
        fetch("http://localhost:5000/genchat/logout", {
            method: 'GET', // Use GET or POST depending on your server's implementation
           // credentials: 'include' // Include credentials (cookies) if your session is stored in cookies
        })
        .then(response => {
            if (response.ok) {
                console.log("Logged out successfully");
                
            } else {
                console.error("Logout failed");
            }
        })
        .catch(error => {
            console.error("Error during logout:", error);
        });

        */
    });
    
});
