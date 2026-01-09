---
layout: project
title: Vaporwave Mini Minecraft
description: A stylized OpenGL “mini Minecraft” scene featuring terrain rendering, multi-texture mapping, a skybox, and multi-viewport rendering.
cover: /assets/images/vaporWave.jpg
category: graphics
tags: [opengl, rendering, terrain, skybox, textures, viewport, vaporwave]
date: 2025-05-15
---

## TL;DR
A small “Minecraft-like” renderer with **first-person navigation**, **terrain**, **multi-texture materials**, a **skybox**, and **multiple viewports**, wrapped in a **vaporwave aesthetic**. :contentReference[oaicite:1]{index=1}

---

## Purpose
This project was built to practice a complete **real-time rendering pipeline**—from asset loading and texture workflows to camera controls and scene presentation—while exploring a cohesive **vaporwave visual style**. :contentReference[oaicite:2]{index=2}

---

## Methodology

### 1) Core rendering stack (OpenGL pipeline + utilities)
I implemented the scene using a typical modern OpenGL workflow, supported by:
- `stb_image` for texture loading
- `Assimp` for asset import
- `GLEW` + `GLFW` for OpenGL extensions + window/input
- `FreeImage` for additional image handling needs :contentReference[oaicite:3]{index=3}

---

### 2) First-person camera + input handling
A **first-person camera** is driven by:
- mouse look (yaw/pitch)
- keyboard movement controls

This lets the scene read like a small “world” rather than a static render. :contentReference[oaicite:4]{index=4}

---

### 3) Terrain rendering (world-building)
The world includes **terrain rendering**, with an explicit performance tradeoff:
- large terrain datasets were slow
- I used a smaller dataset to keep frame time stable

This was a practical decision to stay interactive while still demonstrating the technique. :contentReference[oaicite:5]{index=5}

---

### 4) Texture mapping (material variety)
The scene supports **5+ distinct textures** to differentiate surfaces/objects and strengthen the “block world” readability (Minecraft-like material language). :contentReference[oaicite:6]{index=6}

---

### 5) Skybox (mood + depth)
A **skybox** provides:
- environmental context
- stronger depth cues
- instant “world mood” (especially important for vaporwave palettes) :contentReference[oaicite:7]{index=7}

---

### 6) Multiple viewports / windows (presentation)
I rendered the scene using **multiple viewports or windows** to explore alternate presentations (e.g., different camera angles or debug-like views). :contentReference[oaicite:8]{index=8}

---

## Results
**Implemented features (current):**
- First-person camera (mouse + keyboard) :contentReference[oaicite:9]{index=9}
- Terrain rendering (with dataset scaled for performance) :contentReference[oaicite:10]{index=10}
- Multi-texture mapping (5+ textures) :contentReference[oaicite:11]{index=11}
- Skybox :contentReference[oaicite:12]{index=12}
- Multiple viewports/windows :contentReference[oaicite:13]{index=13}
- Vaporwave aesthetics (color/style direction) :contentReference[oaicite:14]{index=14}

---

## Notes / Credits
Art support: Ilya Wang, Glen Xu. :contentReference[oaicite:15]{index=15}

---

## Future work
Next features I scoped (but didn’t finalize yet):
- collision detection with treasure boxes for scoring
- cubemap reflections using the skybox (environment reflections) :contentReference[oaicite:16]{index=16}
