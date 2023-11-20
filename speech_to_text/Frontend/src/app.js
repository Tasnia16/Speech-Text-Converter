const button = document.getElementById("button");
const result = document.getElementById("result");
const main = document.getElementsByTagName("main")[0];
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let listening = false;
const recognition = new SpeechRecognition();
const start = () => {
    recognition.start();
    button.textContent = "Stop listening";
    main.classList.add("speaking");
  };
const stop = () => {
    recognition.stop();
    button.textContent = "Start listening";
    main.classList.remove("speaking");
};

// const onResult = event => {
//     result.innerHTML = "";
//     for (const res of event.results) {
//         const text = document.createTextNode(res[0].transcript);
//         const p = document.createElement("p");
//         if (res.isFinal) {
//         p.classList.add("final");
//         }
//         p.appendChild(text);
//         result.appendChild(p);
//     }
// };

const onResult = event => {
    console.log('lllll');
    result.innerHTML = "";
    for (const res of event.results) {
        const text = res[0].transcript;
        const p = document.createElement("p");
        if (res.isFinal) {
            p.classList.add("final");
        }
        p.appendChild(document.createTextNode(text));
        result.appendChild(p);
        
        // Send the text to the Node.js server
        fetch("http://127.0.0.1:8080/saveText", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        })
        .then(response => {
            if (response.status === 200) {
                console.log("Text data sent successfully to the server.");
            } else {
                console.error("Failed to send text data to the server.");
            }
        })
        .catch(error => {
            console.error("Error sending text data:", error);
        });
    }
};


recognition.continuous = true;
recognition.interimResults = true;
recognition.addEventListener("result", onResult);

const toggleListening = () => {
    listening ? stop() : start();
    listening = !listening;
};