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
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    let vertexShaderSource = `attribute vec4 a_position;
        attribute vec2 a_texcoord;
        uniform mat4 matrix;
        uniform vec2 scale;
        varying vec2 v_texcoord;
        void main() {
            v_texcoord = a_texcoord * scale;
            gl_Position = matrix * a_position;
        }`;
    let fragmentShaderSource = `precision mediump float;
        varying vec2 v_texcoord;
        uniform vec2 scrolling;
        uniform sampler2D texture;
        uniform float theta;
        void main() {
            float radian = radians(theta);
            vec2 rotation = vec2(cos(radian) * (v_texcoord[0] - 0.5) - sin(radian) * (v_texcoord[1] - 0.5) + 0.5,
                sin(radian) * (v_texcoord[0] - 0.5) + cos(radian) * (v_texcoord[1] - 0.5) + 0.5);
            gl_FragColor = texture2D(texture, rotation + scrolling);
        }`;
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    let program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    let points = [], textureCoord = [];
    (() => {
        let vertices = [
            [-0.5, -0.5, 0.5, 1.0],
            [-0.5, 0.5, 0.5, 1.0],
            [0.5, 0.5, 0.5, 1.0],
            [0.5, -0.5, 0.5, 1.0],
            [-0.5, -0.5, -0.5, 1.0],
            [-0.5, 0.5, -0.5, 1.0],
            [0.5, 0.5, -0.5, 1.0],
            [0.5, -0.5, -0.5, 1.0]
        ];
        let texcoord = [
            [0, 0], [0, 1], [1, 1], [1, 0]
        ];

        function quad(a, b, c, d) {
            points.push(vertices[a]);
            textureCoord.push(texcoord[0]);
            points.push(vertices[b]);
            textureCoord.push(texcoord[1]);
            points.push(vertices[c]);
            textureCoord.push(texcoord[2]);
            points.push(vertices[a]);
            textureCoord.push(texcoord[0]);
            points.push(vertices[c]);
            textureCoord.push(texcoord[2]);
            points.push(vertices[d]);
            textureCoord.push(texcoord[3]);
        }

        quad(1, 0, 3, 2);
        quad(2, 3, 7, 6);
        quad(3, 0, 4, 7);
        quad(6, 5, 1, 2);
        quad(4, 5, 6, 7);
        quad(5, 4, 0, 1);
    })();

    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    let positionAttribLoc = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(positionAttribLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttribLoc);

    let textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoord), gl.STATIC_DRAW);
    let texcoordAttribLoc = gl.getAttribLocation(program, "a_texcoord");
    gl.vertexAttribPointer(texcoordAttribLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texcoordAttribLoc);

    (() => {
        let image = new Image();
        image.addEventListener("load", () => {
            gl.activeTexture(gl.TEXTURE0);
            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        });
        image.src = getResource("id-texture");
    })();

    let cubeTheta = 0.0;
    let fov = 45.0, aspect = 1.0, near = 0.1, far = 200;
    let coord = [0, 0, -3];
    gl.uniform1f(gl.getUniformLocation(program, "theta"), 0.0);
    gl.uniform2fv(gl.getUniformLocation(program, "scrolling"), [0.0, 0.0]);
    gl.uniform2fv(gl.getUniformLocation(program, "scale"), [1.0, 1.0]);
    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
    (function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        cubeTheta = (cubeTheta + 1.0) % 360;
        let pMatrix = perspective(fov, aspect, near, far);
        let tMatrix = translate(coord[0], coord[1], coord[2]);
        let matrix = mult(pMatrix, tMatrix);
        matrix = mult(matrix, rotate(cubeTheta, [1, 1, 1]));
        gl.uniformMatrix4fv(gl.getUniformLocation(program, "matrix"), false, flatten(matrix));
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        requestAnimationFrame(render);
    })();
})();