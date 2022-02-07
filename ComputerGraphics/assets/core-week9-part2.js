"use strict";

(() => {
    let canvas = document.querySelector("#gl-canvas-fixed-size");
    let gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Failed to load webgl environment.");
        return;
    }

    const envmapProgramInfo = webglUtils.createProgramInfo(gl, ["envmap-vertex-shader", "envmap-fragment-shader"]);
    const skyboxProgramInfo = webglUtils.createProgramInfo(gl, ["skybox-vertex-shader", "skybox-fragment-shader"]);

    const cubeBufferInfo = primitives.createCubeBufferInfo(gl, 0.75);
    const quadBufferInfo = primitives.createXYQuadBufferInfo(gl);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    let textureImage = getResource("color-texture");
    let ballTextureImage = getResource("color-texture-ball");
    let revTextureImage = getResource("color-texture-rev");
    const faceInfos = [{
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: ballTextureImage,
    }, {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: textureImage,
    }, {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: revTextureImage,
    }, {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: revTextureImage,
    }, {
        target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: revTextureImage,
    }, {
        target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: revTextureImage,
    }];
    faceInfos.forEach((faceInfo) => {
        const {target, url} = faceInfo;

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 512;
        const height = 512;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);

        const image = new Image();
        image.src = url;
        image.addEventListener('load', function () {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
            gl.texImage2D(target, level, internalFormat, format, type, image);
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        });
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    function degToRad(d) {
        return d * Math.PI / 180;
    }

    let fieldOfViewRadians = degToRad(60);
    let then = 0;

    requestAnimationFrame(render);

    function render(time) {
        time *= 0.001;
        then = time;

        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        let projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

        let cameraPosition = [Math.cos(time * .1) * 2, 0, Math.sin(time * .1) * 2];
        let target = [0, 0, 0];
        let up = [0, 1, 0];
        let cameraMatrix = m4.lookAt(cameraPosition, target, up);
        let viewMatrix = m4.inverse(cameraMatrix);
        let worldMatrix = m4.xRotation(time * 0.11);

        let viewDirectionMatrix = m4.copy(viewMatrix);
        viewDirectionMatrix[12] = 0;
        viewDirectionMatrix[13] = 0;
        viewDirectionMatrix[14] = 0;

        let viewDirectionProjectionMatrix = m4.multiply(projectionMatrix, viewDirectionMatrix);
        let viewDirectionProjectionInverseMatrix = m4.inverse(viewDirectionProjectionMatrix);

        gl.depthFunc(gl.LESS);
        gl.useProgram(envmapProgramInfo.program);
        webglUtils.setBuffersAndAttributes(gl, envmapProgramInfo, cubeBufferInfo);
        webglUtils.setUniforms(envmapProgramInfo, {
            u_world: worldMatrix,
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_texture: texture,
            u_worldCameraPosition: cameraPosition,
        });
        webglUtils.drawBufferInfo(gl, cubeBufferInfo);

        gl.depthFunc(gl.LEQUAL);

        gl.useProgram(skyboxProgramInfo.program);
        webglUtils.setBuffersAndAttributes(gl, skyboxProgramInfo, quadBufferInfo);
        webglUtils.setUniforms(skyboxProgramInfo, {
            u_viewDirectionProjectionInverse: viewDirectionProjectionInverseMatrix,
            u_skybox: texture,
        });
        webglUtils.drawBufferInfo(gl, quadBufferInfo);
        requestAnimationFrame(render);
    }
})();