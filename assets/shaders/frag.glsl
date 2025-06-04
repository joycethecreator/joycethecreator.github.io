precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);

    float d = distance(st, u_mouse / u_resolution);
    color = mix(vec3(0.2, 0.8, 1.0), vec3(1.0, 0.2, 0.5), smoothstep(0.0, 0.5, d));
    
    gl_FragColor = vec4(color, 1.0);
}
