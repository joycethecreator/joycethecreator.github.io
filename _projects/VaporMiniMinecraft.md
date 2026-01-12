---
layout: project
title: Vaporwave Mini Minecraft
description: A stylized OpenGL “mini Minecraft” scene featuring terrain rendering, multi-texture mapping, a skybox, and multi-viewport rendering.
cover: /assets/images/vaporWave.jpg
category: graphics
tags: [opengl, rendering, terrain, skybox, textures, viewport, vaporwave]
date: 2025-03-03
---

## TL;DR
A small “Minecraft-like” renderer with **first-person navigation**, **terrain**, **multi-texture materials**, a **skybox**, and **multiple viewports**, wrapped in a **vaporwave aesthetic**. 

---

## Purpose
This project was built to practice a complete **real-time rendering pipeline**—from asset loading and texture workflows to camera controls and scene presentation—while exploring a cohesive **vaporwave visual style**. 

---

## Methodology

### 1) Core rendering stack (OpenGL pipeline + utilities)
I implemented the scene using a typical modern OpenGL workflow, supported by:
- `stb_image` for texture loading
- `Assimp` for asset import
- `GLEW` + `GLFW` for OpenGL extensions + window/input
- `FreeImage` for additional image handling needs 

---

### 2) First-person camera + input handling
A **first-person camera** is driven by:
- mouse look (yaw/pitch)
- keyboard movement controls

This lets the scene read like a small “world” rather than a static render. 

---

### 3) Terrain rendering (world-building)
The world includes **terrain rendering**, with an explicit performance tradeoff:
- large terrain datasets were slow
- I used a smaller dataset to keep frame time stable

This was a practical decision to stay interactive while still demonstrating the technique. 

---

### 4) Texture mapping (material variety)
The scene supports **5+ distinct textures** to differentiate surfaces/objects and strengthen the “block world” readability (Minecraft-like material language). 

---

### 5) Skybox (mood + depth)
A **skybox** provides:
- environmental context
- stronger depth cues
- instant “world mood” (especially important for vaporwave palettes) 

---

### 6) Multiple viewports / windows (presentation)
I rendered the scene using **multiple viewports or windows** to explore alternate presentations (e.g., different camera angles or debug-like views). 

---

## Results
**Implemented features (current):**
- First-person camera (mouse + keyboard)
- Terrain rendering (with dataset scaled for performance) 
- Multi-texture mapping (5+ textures) 
- Skybox 
- Multiple viewports/windows 
- Vaporwave aesthetics (color/style direction) 

---

## Notes / Credits
Art support: Ilya Wang, Glen Xu. 

---

## Future work
Next features I scoped (but didn’t finalize yet):
- collision detection with treasure boxes for scoring
- cubemap reflections using the skybox (environment reflections) 
