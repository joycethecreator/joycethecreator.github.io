---
layout: project
title: Ruled Surface Designer (2D Points → 3D Printable Mesh)
description: An interactive OpenGL tool that lets users sketch points on a 2D plane, generate a ruled-surface mesh with adjustable subdivisions, and export the result as a watertight .OBJ for 3D printing.
cover: /assets/images/3Dmodel.png
category: graphics
tags: [opengl, geometry, modeling, mesh-generation, obj, 3d-printing, interaction]
date: 2025-04-20
---

## TL;DR
Click points on a 2D plane → the tool lofts a **ruled surface** into a **triangle mesh** (controlled by `steps`) → export as **.OBJ** for printing.

---

## Purpose
I built this project to explore **interactive geometry modeling**: how to go from a minimal user input (a few points on a plane) to a structured 3D surface that is:
- visualized in real time (OpenGL)
- discretized into triangles (mesh)
- exportable for downstream pipelines (OBJ → slicer → 3D print)

---

## Workflow (what the user does)
1. **Add points on a 2D plane** (mouse input)
2. Adjust **subdivision resolution** (`steps`) to control surface smoothness / triangle density
3. Preview the generated surface in 3D (trackball camera)
4. **Export** the mesh to `geometry.obj`

---

## Methodology

### 1) Interaction + camera control
- A **trackball camera** (`TrackBallC trackball`) provides intuitive orbit/rotate viewing.
- Mouse states (`mouseLeft`, `mouseMid`, `mouseRight`) and cursor positions (`mouseX`, `mouseY`) support point placement and navigation.
- Points are collected into `objectPoints` (a list of `glm::vec3`), while a simple XY reference plane is drawn from `planePoints`.

---

### 2) Data model: from points to triangles
The core mesh is built as **triangles**:
- Vertex positions are generated into a float array `v`
- Triangles are also stored as structured data (`vector<TriangleC> tri`) so the geometry can be exported reliably

Key idea: the tool generates triangles as it builds the surface, then converts every 3 vertices into a `TriangleC`:

- Each triangle uses 3 vertices (9 floats total)
- These triangles are pushed into `tri` for later `.obj` writing

This keeps the rendering representation (GPU buffer) and the export representation (triangle list) consistent.

---

### 3) Surface generation: ruled surface + subdivision
The surface resolution is controlled by:

- `steps` = number of subdivisions per segment (default `12`)

There are two generation cases:

#### Case A: 1 point → “ruled circle” (revolution-style ring)
If the user provides a single point, the tool generates a circular ring using:

- `OpCreateRuledCircle(vv, n)`
- `circle(y, x, n)` mapping into 3D via sin/cos around 2π

This makes a simple “lathe-like” surface primitive.

#### Case B: 2+ points → ruled surface between consecutive points
For multiple points, the tool builds a surface strip between each consecutive pair:

- `OpCreateRuled(vv, n, u)` iterates through point pairs
- It linearly interpolates between two points along one parameter, and sweeps around with another parameter (`n3`, `n4`)

Each quad-like patch is tessellated into **two triangles** (“lower” and “upper”), producing a consistent triangle mesh.

---

### 4) OpenGL rendering pipeline (VAO/VBO)
Once vertices are generated:

- Create VAO/VBO
- Upload vertex array with `glBufferData`
- Configure position attribute (location 0)

This happens for:
- the surface mesh (`BuildObject`)
- the XY plane (`BuildPlane`)

So the user gets immediate visual feedback as they add points / adjust subdivisions.

---

### 5) Export for 3D printing (.OBJ)
Because every triangle is stored in `tri`, export becomes straightforward:
- Write out `v` entries
- Emit `f` indices for each triangle
- Save to `geometry.obj`

This is intentionally separated from GPU buffers so the exported mesh matches what’s on screen.

---

## Results
- Interactive point placement on a plane produces a valid 3D surface preview in real time
- Adjustable subdivisions (`steps`) let users trade off speed vs smoothness
- Generated triangle mesh is exportable as `.obj` for slicers / 3D printing

---

## Parameters (user-facing knobs)
- `steps`: subdivision level (mesh resolution)
- `pointSize`, `lineWidth`: visualization settings
- `addVertices`: toggle between editing and viewing modes

---

## Limitations
- Export quality depends on subdivision settings (low `steps` produces faceting)
- If consecutive points form vertical segments or degenerate slopes, the line-based computations can become unstable (division by near-zero when solving line equations)
- No automatic self-intersection prevention or watertightness validation (recommended before printing)

---

## Future work
- Robust handling for degenerate segments (vertical lines / near-zero slope)
- Surface preview modes: wireframe, normals, curvature shading
- Mesh post-process: welding, normal computation, manifold checks
- Add a “snap” system and a UI overlay for editing / deleting points
