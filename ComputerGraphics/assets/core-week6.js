"use strict";

(() => {
    // Environment setup
    let canvas = document.querySelector("#gl-canvas-fixed-size");
    let gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Failed to load webgl environment.");
        return;
    }
    resizeCanvasToDisplaySize(gl.canvas);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1);

    let vertexShaderSource = `attribute vec4 a_position;
    attribute vec4 a_color;
    varying vec4 v_color;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * a_position;
        v_color = a_color;
    }`;
    let fragmentShaderSource = `precision mediump float;
    varying vec4 v_color;
    void main() {
        gl_FragColor = v_color;
    }`;
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    let program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    let points = [], colors = [];

    function createCube(x, y, z) {
        let len = 0.25;
        let vertices = [
            [x - len, y - len, z + len, 1.0],
            [x - len, y + len, z + len, 1.0],
            [x + len, y + len, z + len, 1.0],
            [x + len, y - len, z + len, 1.0],
            [x - len, y - len, z - len, 1.0],
            [x - len, y + len, z - len, 1.0],
            [x + len, y + len, z - len, 1.0],
            [x + len, y - len, z - len, 1.0]
        ];
        let vertexColors = [
            [],
            [255.0 / 255.0, 140.0 / 255.0, 0.0 / 255.0, 1.0], // dark orange
            [250.0 / 255.0, 128.0 / 255.0, 114.0 / 255.0, 1.0],  // salmon
            [186.0 / 255.0, 85.0 / 255.0, 211.0 / 255.0, 1.0],  // medium orchid
            [0.0 / 255.0, 191.0 / 255.0, 255.0 / 255.0, 1.0], // deep sky blue
            [154.0 / 255.0, 205.0 / 255.0, 50.0 / 255.0, 1.0],  // olive
            [0.0 / 255.0, 0.0 / 255.0, 128.0 / 255.0, 1.0],  // navy
        ];

        function quad(a, b, c, d) {
            let indices = [a, b, c, a, c, d];
            for (let i = 0; i < indices.length; i++) {
                for (let j = 0; j < 4; j++) {
                    points.push(vertices[indices[i]][j]);
                    colors.push(vertexColors[a][j]);
                }
            }
        }

        quad(1, 0, 3, 2);
        quad(2, 3, 7, 6);
        quad(3, 0, 4, 7);
        quad(6, 5, 1, 2);
        quad(4, 5, 6, 7);
        quad(5, 4, 0, 1);
    }

    createCube(0.0, 0.0, 0.0);

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    let colorAttrib = gl.getAttribLocation(program, "a_color");
    gl.vertexAttribPointer(colorAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttrib);
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    let vertexAttrib = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(vertexAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexAttrib);

    let mvMatrixUniform = gl.getUniformLocation(program, "modelViewMatrix");
    let projMatrixUniform = gl.getUniformLocation(program, "projectionMatrix");

    let identity = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    let mvMatrixIter = (function () {
        let theta = 0.0;
        let eye = [1.0, 1.0, 1.0];
        return function () {
            theta += 0.01;
            eye[0] = Math.sin(theta);
            eye[1] = Math.cos(theta);
            return new Float32Array(lookAt(eye,
                [0.0, 0.0, 0.0],
                [0.0, 1.0, 0.0]).flat());
        };
    })();

    function stringifyMat4(mat) {
        let r = "[";
        for (let i = 0; i < mat.length; i++) {
            r += mat[i].toFixed(2) + ", ";
        }
        return r + "]";
    }
    (function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        let mvMatrix = mvMatrixIter();
        document.querySelector("#matrix-text").innerHTML = stringifyMat4(mvMatrix);
        gl.uniformMatrix4fv(mvMatrixUniform, false, mvMatrix);
        gl.uniformMatrix4fv(projMatrixUniform, false, identity);
        gl.drawArrays(gl.TRIANGLES, 0,  36);
        requestAnimationFrame(render);
    })();
})();