---
layout: project
title: Shader Playground
description: A live demo of an interactive GLSL shader running in the browser.
cover: 
category: graphics
tags: [graphics, shaders, glsl, webgl]
date: 2025-06-03
---

This project is a **real-time GLSL shader demo** rendered directly in the browser.
It explores fragment shading, color interpolation, and interactive parameters.

---

## Live Shader Demo

{% raw %}
<iframe
  src="/assets/my-shader.html"
  width="100%"
  height="500"
  frameborder="0"
  style="border:1px solid #ccc; border-radius: 12px;">
</iframe>
{% endraw %}

---

## Overview

- Built with **WebGL + GLSL**
- Interactive parameters controlled via JavaScript
- Designed for experimentation and rapid iteration

---

## Example Fragment Shader

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float color = 0.5 + 0.5 * sin(u_time + uv.x * 10.0);
    gl_FragColor = vec4(vec3(color), 1.0);
}
