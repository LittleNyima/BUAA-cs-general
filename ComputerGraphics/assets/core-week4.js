"use strict";

(() => {
    // Environment setup
    let canvas = document.querySelector("#gl-canvas");
    let gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Failed to load webgl environment.");
        return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 1);
    // Prepare shader program
    let vertexShaderSource = `attribute vec4 a_position;
        void main() {
            gl_Position = a_position;
        }`;
    let fragmentShaderSource = `precision mediump float;
        uniform vec4 u_fragColor;
        void main() {
            gl_FragColor = u_fragColor;
        }`;
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    let program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    let fragColorUniformLocation = gl.getUniformLocation(program, "u_fragColor");

    // Create a buffer
    let verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.enableVertexAttribArray(positionAttributeLocation);
    /* 2 components per iteration; gl.FLOAT data; don't normalize; stride is 0; start at the beginning; */
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Add callback to handle keyboard events
    let zoom = 1.0, rotate = 0.0;
    function setHtmlText() {
        document.querySelector("#zoom-text").innerHTML = zoom.toFixed(2);
        document.querySelector("#rotate-text").innerHTML = rotate.toFixed(2);
    }
    setHtmlText();
    document.addEventListener('keypress', function (event) {
        if (event.key === "W" || event.key === "w") zoom = Math.max(0.05, zoom - 0.05);
        else if (event.key === "S" || event.key === "s") zoom = Math.min(2.0, zoom + 0.05);
        else if (event.key === "A" || event.key === "a") rotate -= Math.PI / 24;
        else if (event.key === "D" || event.key === "d") rotate += Math.PI / 24;
        setHtmlText();
    }, false);

    function rotateVertices(vertices) {
        console.assert(vertices.length % 2 === 0);
        for (let i = 0; i < vertices.length; i += 2) {
            let x = vertices[i], y = vertices[i + 1];
            vertices[i] = x * Math.cos(rotate) + y * Math.sin(rotate);
            vertices[i + 1] = -x * Math.sin(rotate) + y * Math.cos(rotate);
        }
        return vertices;
    }

    function zoomVertices(vertices) {
        vertices.forEach((item, index) => {
            vertices[index] *= zoom;
        })
        return vertices;
    }

    // Render
    (function render() {
        // Prepare canvas for use
        resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        let ratio = gl.canvas.width / gl.canvas.height;
        // Draw a red triangle
        let triangleVertices = (function () {
            let vertices = [-0.33, 0.25, -0.66, 0.25, -0.5];
            vertices.push(Math.min(0.25 + 0.33 * 1.732 * ratio / 2.0, 0.9));
            return zoomVertices(rotateVertices(vertices));
        })();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
        gl.uniform4f(fragColorUniformLocation, 1.0, 0.0, 0.0, 1.0);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        // Draw a green rect
        let rectUpperBound = Math.min(0.8, 0.25 * (1 + ratio));
        let rectVertices = [0.375, 0.25, 0.625, 0.25, 0.375, rectUpperBound,
            0.375, rectUpperBound, 0.625, 0.25, 0.625, rectUpperBound];
        rectVertices = zoomVertices(rotateVertices(rectVertices));
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rectVertices), gl.STATIC_DRAW);
        gl.uniform4f(fragColorUniformLocation, 0.0, 1.0, 0.0, 1.0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        // Draw a blue sector
        let incision = 100;
        let sectorVertices = (function () {
            let vertices = [-0.5, -0.8];
            let radius = 0.33;
            let angle = Math.PI / 3.0, startAngle = -Math.PI / 6.0;
            for (let i = 0; i <= incision; i++) {
                vertices.push(vertices[0] + radius * Math.sin(startAngle + i * angle / incision));
                vertices.push(vertices[1] + ratio * radius * Math.cos(startAngle + i * angle / incision));
            }
            return zoomVertices(rotateVertices(vertices));
        })();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sectorVertices), gl.STATIC_DRAW);
        gl.uniform4f(fragColorUniformLocation, 0.0, 0.0, 1.0, 1.0);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, incision);
        // Draw a golden star
        let starVertices = (function () {
            let vertices = [0.5, -0.5];
            let radius = [0.2, 0.08];
            for (let i = 0; i < 11; i++) {
                let angle = Math.PI * 2.0 / 10.0 * i;
                vertices.push(vertices[0] + radius[i % 2] * Math.sin(angle));
                vertices.push(vertices[1] + ratio * radius[i % 2] * Math.cos(angle));
            }
            return zoomVertices(rotateVertices(vertices));
        })();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(starVertices), gl.STATIC_DRAW);
        gl.uniform4f(fragColorUniformLocation, 1.0, 215.0 / 255.0, 0.0, 1.0);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 12);
        requestAnimationFrame(render);
    })()
})();