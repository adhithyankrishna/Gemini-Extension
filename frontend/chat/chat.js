

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    let prompt = "";


    input.addEventListener("input", () => {
        prompt = input.value;

    });

    const sendbtn = document.getElementById("send");

    sendbtn.addEventListener("click", async () => {
        try {
            const response = await fetch("http://localhost:5000/genchat/getResponse",
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ "prompt": prompt })

                }
            )

            const reader = response.body.reader()
            const decoder = new TextDecoder();

            reader.read().then(function processText({ done, value }) {
                if (done) {
                    console.log("Stream completeed")
                    return;
                }

                const chunk = decoder.decode(value, { stream: true });
                console.log(JSON.parse(chunk).response);
                return reader.read().then(processText);
            })
        }
        catch (error) {
            console.log(error);
        }

    })


});
