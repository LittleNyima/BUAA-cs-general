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
    attribute vec4 a_color;
    varying vec4 v_color;
    uniform vec3 u_theta;
    vec4 quaternionMultiply(vec4 a, vec4 b) {
        return vec4(a.x * b.x - dot(a.yzw, b.yzw), a.x * b.yzw + b.x * a.yzw + cross(b.yzw, a.yzw));    
    }
    vec4 quaternionInverse(vec4 a) {
        return (vec4(a.x, -a.yzw) / dot(a, a));
    }
    void main() {
        vec3 angles = radians(u_theta);
        vec3 c = cos(angles / 2.0), s = sin(angles / 2.0);
        vec4 rx = vec4(c.x, -s.x, 0.0, 0.0);
        vec4 ry = vec4(c.y, 0.0, s.y, 0.0);
        vec4 rz = vec4(c.z, 0.0, 0.0, s.z);
        vec4 r = quaternionMultiply(rx, quaternionMultiply(ry, rz));
        vec4 p = vec4(0.0, a_position.xyz);
        p = quaternionMultiply(r, quaternionMultiply(p, quaternionInverse(r)));
        gl_Position = vec4(p.yzw, 1.0);
        gl_Position.z = -gl_Position.z;
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
    let rotateAngle = [0.0, 0.0, 0.0], rotateSpeed = [1.0, 1.5, 2.0];
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
        let vertexColors = [
            [],
            [255.0 / 255.0, 140.0 / 255.0, 0.0 / 255.0, 1.0], // dark orange
            [250.0 / 255.0, 128.0 / 255.0, 114.0 / 255.0, 1.0],  // salmon
            [186.0 / 255.0, 85.0 / 255.0, 211.0 / 255.0, 1.0],  // medium orchid
            [0.0 / 255.0, 191.0 / 255.0, 255.0 / 255.0, 0.5], // deep sky blue
            [154.0 / 255.0, 205.0 / 255.0, 50.0 / 255.0, 0.5],  // olive
            [0.0 / 255.0, 0.0 / 255.0, 128.0 / 255.0, 0.5],  // navy
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
    })();

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

    let thetaUniform = gl.getUniformLocation(program, "u_theta");

    gl.clearColor(0.0, 0.0, 0.0, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_DST_ALPHA);
    (function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        rotateAngle.forEach((item, index) => {
            rotateAngle[index] += rotateSpeed[index];
            rotateAngle[index] %= 360;
        });
        gl.uniform3fv(thetaUniform, rotateAngle);
        gl.drawArrays(gl.TRIANGLES, 0, 18);
        gl.depthMask(false);
        gl.drawArrays(gl.TRIANGLES, 18, 18);
        gl.depthMask(true);
        requestAnimationFrame(render);
    })();
})();