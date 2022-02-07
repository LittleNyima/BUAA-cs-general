"use strict";

(function () {
    // Environment setup
    let canvas = document.querySelector("#gl-canvas-fixed-size");
    let gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Failed to load webgl environment.");
        return;
    }
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    function initArrayBufferForLaterUse(gl, data, size, type) {
        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        buffer.size = size;
        buffer.type = type;
        return buffer;
    }

    function initAttriVariable(gl, attrib, buffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(attrib, buffer.size, buffer.type, false, 0, 0);
        gl.enableVertexAttribArray(attrib);
    }

    let sphereProgram = (() => {
        let vertexShaderSource = `attribute vec4 vPosition;
            attribute vec4 vNormal;
            varying vec4 fColor;
            uniform vec4 ambientProduct, diffuseProduct, specularProduct;
            uniform mat4 modelViewMatrix, projectionMatrix, translate;
            uniform vec4 lightPosition;
            uniform float shininess;
            uniform vec3 eyePosition;
            void main() {
                vec3 L;
                if(lightPosition.w == 0.0)  L = normalize(lightPosition.xyz);
                else L = normalize((lightPosition - vPosition).xyz);
                vec3 E = normalize(eyePosition);
                vec3 H = normalize(L + E);
                vec3 N = normalize(vNormal.xyz);
                vec4 ambient = ambientProduct;
                float Kd = max(dot(L, N), 0.0);
                vec4 diffuse = Kd * diffuseProduct;
                float Ks = pow(max(dot(N, H), 0.0), shininess);
                vec4 specular = Ks * specularProduct;
                if(dot(L, N) < 0.0) {
                    specular = vec4(0.0, 0.0, 0.0, 1.0);
                }
                gl_Position = translate * projectionMatrix * modelViewMatrix * vPosition;
                fColor = ambient + diffuse + specular;
                fColor.a = 1.0;
            }`;
        let fragmentShaderSource = `precision mediump float;
            varying vec4 fColor;
            void main() {
                gl_FragColor = fColor;
            }`;
        let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        let program = createProgram(gl, vertexShader, fragmentShader);
        program.a_position = gl.getAttribLocation(program, "vPosition");
        program.a_normal = gl.getAttribLocation(program, "vNormal");
        program.u_ambientProduct = gl.getUniformLocation(program, "ambientProduct");
        program.u_diffuseProduct = gl.getUniformLocation(program, "diffuseProduct");
        program.u_specularProduct = gl.getUniformLocation(program, "specularProduct");
        program.u_modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
        program.u_projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");
        program.u_translate = gl.getUniformLocation(program, "translate");
        program.u_lightPosition = gl.getUniformLocation(program, "lightPosition");
        program.u_shininess = gl.getUniformLocation(program, "shininess");
        program.u_eyePosition = gl.getUniformLocation(program, "eyePosition");
        return program;
    })();
    let cubeProgram = (() => {
        let vertexShaderSource = `attribute vec4 a_position;
            attribute vec4 a_color;
            varying vec4 v_color;
            uniform vec3 u_theta;
            uniform mat4 u_matrix;
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
                gl_Position = u_matrix * gl_Position;
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
        program.a_position = gl.getAttribLocation(program, "a_position");
        program.a_color = gl.getAttribLocation(program, "a_color");
        program.u_theta = gl.getUniformLocation(program, "u_theta");
        program.u_matrix = gl.getUniformLocation(program, "u_matrix");
        return program;
    })();

    let index = 0;
    let sphereGeometry = (() => {
        let numTimesToSubdivide = 5;
        let pointsArray = [], normalsArray = [];

        let va = vec4(0.0, 0.0, -1.0, 1);
        let vb = vec4(0.0, 0.942809, 0.333333, 1);
        let vc = vec4(-0.816497, -0.471405, 0.333333, 1);
        let vd = vec4(0.816497, -0.471405, 0.333333, 1);

        function triangle(a, b, c) {
            normalsArray.push(a[0], a[1], a[2], 0.0);
            normalsArray.push(b[0], b[1], b[2], 0.0);
            normalsArray.push(c[0], c[1], c[2], 0.0);
            pointsArray.push(a);
            pointsArray.push(b);
            pointsArray.push(c);
            index += 3;
        }

        function divideTriangle(a, b, c, count) {
            if (count > 0) {
                let ab = mix(a, b, 0.5);
                let ac = mix(a, c, 0.5);
                let bc = mix(b, c, 0.5);
                ab = normalize(ab, true);
                ac = normalize(ac, true);
                bc = normalize(bc, true);
                divideTriangle(a, ab, ac, count - 1);
                divideTriangle(ab, b, bc, count - 1);
                divideTriangle(bc, c, ac, count - 1);
                divideTriangle(ab, bc, ac, count - 1);
            } else {
                triangle(a, b, c);
            }
        }

        (function tetrahedron(a, b, c, d, n) {
            divideTriangle(a, b, c, n);
            divideTriangle(d, c, b, n);
            divideTriangle(a, d, b, n);
            divideTriangle(a, c, d, n);
        })(va, vb, vc, vd, numTimesToSubdivide);

        let obj = {};
        obj.vertexBuffer = initArrayBufferForLaterUse(gl, flatten(pointsArray), 4, gl.FLOAT);
        obj.normalBuffer = initArrayBufferForLaterUse(gl, flatten(normalsArray), 4, gl.FLOAT);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return obj;
    })();
    let cubeGeometry = (() => {
        let points = [], colors = [];
        (() => {
            let vertices = [
                [-0.25, -0.25, 0.25, 1.0],
                [-0.25, 0.25, 0.25, 1.0],
                [0.25, 0.25, 0.25, 1.0],
                [0.25, -0.25, 0.25, 1.0],
                [-0.25, -0.25, -0.25, 1.0],
                [-0.25, 0.25, -0.25, 1.0],
                [0.25, 0.25, -0.25, 1.0],
                [0.25, -0.25, -0.25, 1.0]
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

        let obj = {};
        obj.vertexBuffer = initArrayBufferForLaterUse(gl, flatten(points), 4, gl.FLOAT);
        obj.colorBuffer = initArrayBufferForLaterUse(gl, flatten(colors), 4, gl.FLOAT);
        return obj;
    })();

    let materialAmbient = vec4(1.0, 0.5, 1.0, 1.0);
    let materialDiffuse = vec4(0.9, 0.5, 0.4, 1.0);
    let materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);
    let materialShininess = 20.0;

    function changeLight(id) {
        let lightPosition, lightAmbient, lightDiffuse, lightSpecular;
        if (id === 1) {
            lightPosition = vec4(1.0, 1.0, 1.0, 0.0);
            lightAmbient = vec4(0.3, 0.3, 0.3, 1.0);
            lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
            lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);
        } else if (id === 2) {
            lightPosition = vec4(1.0, -1.0, 1.0, 0.0);
            lightAmbient = vec4(0.3, 0.2, 0.1, 1.0);
            lightDiffuse = vec4(0.8, 0.6, 0.4, 1.0);
            lightSpecular = vec4(0.9, 0.8, 0.7, 1.0);
        }

        let ambientProduct = mult(lightAmbient, materialAmbient);
        let diffuseProduct = mult(lightDiffuse, materialDiffuse);
        let specularProduct = mult(lightSpecular, materialSpecular);

        gl.useProgram(sphereProgram);
        gl.uniform4fv(sphereProgram.u_ambientProduct, flatten(ambientProduct));
        gl.uniform4fv(sphereProgram.u_diffuseProduct, flatten(diffuseProduct));
        gl.uniform4fv(sphereProgram.u_specularProduct, flatten(specularProduct));
        gl.uniform4fv(sphereProgram.u_lightPosition, flatten(lightPosition));
        gl.uniform1f(sphereProgram.u_shininess, materialShininess);
        gl.useProgram(null);
    }

    changeLight(1);

    document.addEventListener('keypress', (event) => {
        if (event.key === 'Q' || event.key === 'q') {
            changeLight(1);
        } else if (event.key === 'W' || event.key === 'w') {
            changeLight(2);
        }
    })

    let rotateAngle = [0.0, 0.0, 0.0], rotateSpeed = [1.0, 1.5, 2.0];
    let theta = 0.0, phi = 0.0, radius = 2.0;
    (function render() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        theta = (theta + 0.01) % (Math.PI * 2);
        (() => {
            gl.useProgram(cubeProgram);
            rotateAngle.forEach((item, index) => {
                rotateAngle[index] += rotateSpeed[index];
                rotateAngle[index] %= 360;
            });
            initAttriVariable(gl, cubeProgram.a_position, cubeGeometry.vertexBuffer);
            initAttriVariable(gl, cubeProgram.a_color, cubeGeometry.colorBuffer);
            let matrix = translate(0.5, 0.0, 0.0);
            gl.bindBuffer(gl.ARRAY_BUFFER, cubeGeometry.vertexBuffer);
            gl.uniform3fv(cubeProgram.u_theta, rotateAngle);
            gl.uniformMatrix4fv(cubeProgram.u_matrix, false, flatten(matrix));
            gl.drawArrays(gl.TRIANGLES, 0, 36);
            gl.useProgram(null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        })();
        (() => {
            gl.useProgram(sphereProgram);
            initAttriVariable(gl, sphereProgram.a_position, sphereGeometry.vertexBuffer);
            initAttriVariable(gl, sphereProgram.a_normal, sphereGeometry.normalBuffer);
            gl.bindBuffer(gl.ARRAY_BUFFER, sphereGeometry.vertexBuffer);
            let eye = vec3(radius * Math.sin(theta) * Math.cos(phi),
                radius * Math.sin(theta) * Math.sin(phi),
                radius * Math.cos(theta));
            gl.uniform3fv(sphereProgram.u_eyePosition, flatten(eye));
            let modelViewMatrix = lookAt(eye, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);
            let projectionMatrix = ortho(-3.0, 3.0, -3.0, 3.0, -10, 10);
            let matrix = translate(-0.5, 0.0, 0.0);
            gl.uniformMatrix4fv(sphereProgram.u_modelViewMatrix, false, flatten(modelViewMatrix));
            gl.uniformMatrix4fv(sphereProgram.u_projectionMatrix, false, flatten(projectionMatrix));
            gl.uniformMatrix4fv(sphereProgram.u_translate, false, flatten(matrix));
            gl.drawArrays(gl.TRIANGLES, 0, index);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        })();
        requestAnimationFrame(render);
    })();
})();