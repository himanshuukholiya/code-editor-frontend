let htmlEditor, cssEditor, jsEditor;

window.onload = function () {
    // Initialize CodeMirror instances for HTML, CSS, and JS editors
    htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-code"), {
        mode: "htmlmixed",
        theme: "dracula",
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        indentUnit: 4,
        lineWrapping: true,
    });

    cssEditor = CodeMirror.fromTextArea(document.getElementById("css-code"), {
        mode: "css",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        indentUnit: 4,
        lineWrapping: true
    });

    jsEditor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        indentUnit: 4,
        lineWrapping: true
    });

    // Load saved data from localStorage into CodeMirror editors
    htmlEditor.setValue(localStorage.getItem("htmlCode") || "");
    cssEditor.setValue(localStorage.getItem("cssCode") || "");
    jsEditor.setValue(localStorage.getItem("jsCode") || "");

    updateOutput(); // Show saved content immediately

    // Update output whenever any editor content changes
    htmlEditor.on("change", updateOutput);
    cssEditor.on("change", updateOutput);
    jsEditor.on("change", updateOutput);
};

function updateOutput() {
    // Get code from CodeMirror editors
    let htmlCode = htmlEditor.getValue();
    let cssCode = cssEditor.getValue();
    let jsCode = jsEditor.getValue();

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