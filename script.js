// Load saved data from localStorage on page load
window.onload = function () {
    document.getElementById("html-code").value = localStorage.getItem("htmlCode") || "";
    document.getElementById("css-code").value = localStorage.getItem("cssCode") || "";
    document.getElementById("js-code").value = localStorage.getItem("jsCode") || "";

    updateOutput(); // Show saved content immediately
};

function updateOutput() {
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code").value;
    let jsCode = document.getElementById("js-code").value;

    let output = document.getElementById("output").contentDocument;

    /* 
    output.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";

    output.contentWindow.eval(jsCode);
     */


    // Clear the iframe's content before writing
    output.open(); 
    output.write(`
        <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}<\/script>
            </body>
        </html>
    `);
    output.close();
    
    // Auto-save content to localStorage
    localStorage.setItem("htmlCode", htmlCode);
    localStorage.setItem("cssCode", cssCode);
    localStorage.setItem("jsCode", jsCode);
}