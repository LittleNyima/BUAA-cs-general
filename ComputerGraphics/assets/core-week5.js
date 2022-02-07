"use strict";

(() => {
    // Environment setup
    let canvas = document.querySelector("#gl-canvas-fixed-size");
    let gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Failed to load webgl environment.");
        return;
    }
    gl.enable(gl.DEPTH_TEST);
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
            [250.0 / 255.0, 128.0 / 255.0, 114.0 / 255.0, 1.0],  // salmon
            [186.0 / 255.0, 85.0 / 255.0, 211.0 / 255.0, 1.0],  // medium orchid
            [],
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
        // quad(3, 0, 4, 7);
        // quad(6, 5, 1, 2);
        quad(4, 5, 6, 7);
        quad(5, 4, 0, 1);
    })();

    let trianglesPoints = 0, sectorPoints = 0, starPoints = 0;
    (() => {
        let simpleGeometries = [-0.33, 0.125, 0.0, 1.0, -0.165, 0.125, 0.0, 1.0, -0.25, 0.26789, 0.0, 1.0,
            0.125, 0.125, 0.0, 1.0, 0.125, 0.25, 0.0, 1.0, 0.25, 0.125, 0.0, 1.0,
            0.25, 0.25, 0.0, 1.0, 0.125, 0.25, 0.0, 1.0, 0.25, 0.125, 0.0, 1.0];
        let simpleColors = [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
            0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
        trianglesPoints = simpleGeometries.length >> 2;
        points = points.concat(simpleGeometries);
        colors = colors.concat(simpleColors);
    })();
    (() => {
        let incision = 100;
        let sectorVertices = [-0.25, -0.25, 0.0, 1.0], sectorColors = [[]], radius = 0.15;
        let angle = Math.PI / 3.0, startAngle = -Math.PI / 6.0;
        for (let i = 0; i <= incision; i++) {
            sectorVertices.push(sectorVertices[0] + radius * Math.sin(startAngle + i * angle / incision));
            sectorVertices.push(sectorVertices[1] + radius * Math.cos(startAngle + i * angle / incision));
            sectorVertices.push(0.0);
            sectorVertices.push(1.0);
            sectorColors.push([]);
        }
        sectorColors = sectorColors.fill([0.0, 0.0, 1.0, 1.0]).flat();
        sectorPoints = sectorVertices.length >> 2;
        points = points.concat(sectorVertices);
        colors = colors.concat(sectorColors);
        let starVertices = [0.2, -0.17, 0.0, 1.0], starColors = [[]], starRadius = [0.1, 0.04];
        for (let i = 0; i < 11; i++) {
            let starAngle = Math.PI * 2.0 / 10.0 * i;
            starVertices.push(starVertices[0] + starRadius[i % 2] * Math.sin(starAngle));
            starVertices.push(starVertices[1] + starRadius[i % 2] * Math.cos(starAngle));
            starVertices.push(0.0);
            starVertices.push(1.0);
            starColors.push([]);
        }
        starColors = starColors.fill([1.0, 215.0 / 255.0, 0.0, 1.0]).flat();
        starPoints = starVertices.length >> 2;
        points = points.concat(starVertices);
        colors = colors.concat(starColors);
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

    // Add callback to handle keyboard events
    function setHtmlText() {
        document.querySelector("#x-rotate").innerHTML = rotateSpeed[0].toFixed(2);
        document.querySelector("#y-rotate").innerHTML = rotateSpeed[1].toFixed(2);
        document.querySelector("#z-rotate").innerHTML = rotateSpeed[2].toFixed(2);
    }
    setHtmlText();
    document.addEventListener('keypress', function (event) {
        if (event.key === 'Q' || event.key === 'q') rotateSpeed[0] += 0.1;
        else if (event.key === 'A' || event.key === 'a') rotateSpeed[0] -= 0.1;
        else if (event.key === 'W' || event.key === 'w') rotateSpeed[1] += 0.1;
        else if (event.key === 'S' || event.key === 's') rotateSpeed[1] -= 0.1;
        else if (event.key === 'E' || event.key === 'e') rotateSpeed[2] += 0.1;
        else if (event.key === 'D' || event.key === 'd') rotateSpeed[2] -= 0.1;
        setHtmlText();
    }, false);

    gl.clearColor(0.0, 0.0, 0.0, 1);
    (function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        rotateAngle.forEach((item, index) => {
            rotateAngle[index] += rotateSpeed[index];
            rotateAngle[index] %= 360;
        })
        gl.uniform3fv(thetaUniform, rotateAngle);
        gl.drawArrays(gl.TRIANGLES, 0, 24);
        gl.uniform3f(thetaUniform, 0.0, 0.0, 0.0);
        gl.drawArrays(gl.TRIANGLES, 24, trianglesPoints);
        gl.drawArrays(gl.TRIANGLE_FAN, 24 + trianglesPoints, sectorPoints);
        gl.drawArrays(gl.TRIANGLE_FAN, 24 + trianglesPoints + sectorPoints, starPoints);
        requestAnimationFrame(render);
    })();
})();