const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl');
let startTime = Date.now();
let mouse = [0, 0];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('mousemove', e => {
    mouse = [e.clientX, canvas.height - e.clientY];
});

async function loadShader(gl, type, url) {
    const res = await fetch(url);
    const source = await res.text();
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

async function init() {
    const vert = await loadShader(gl, gl.VERTEX_SHADER, 'shaders/vert.glsl');
    const frag = await loadShader(gl, gl.FRAGMENT_SHADER, 'shaders/frag.glsl');

    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, 'position');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    function render() {
        const time = (Date.now() - startTime) * 0.001;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
        gl.uniform1f(timeLoc, time);
        gl.uniform2f(mouseLoc, mouse[0], mouse[1]);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }

    render();
}

init();
