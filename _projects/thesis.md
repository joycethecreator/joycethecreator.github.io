---
layout: project
title: Voxel Constraints for Parallel XPBD Simulation
description: A GPU-first methodology for building and editing soft-body XPBD models using voxel primitives, with LoD-enabled long-range constraints.
cover: /assets/images/projects/voxel-xpbd-cover.jpg
category: graphics
tags: [xpbd, pbd, gpu, compute-shaders, voxel, physics, constraints]
date: 2025-06-03
---

## Methodology (GPU-first)

This project investigates **efficient GPU implementation and interactive constraint editing** for large-scale XPBD soft-body simulation by treating a **voxel model as the primitive** rather than relying on general tetrahedral meshes. :contentReference[oaicite:3]{index=3}

The methodology has two parallel tracks:

1. A **baseline tetrahedralization pipeline** (traditional approach, used for comparison).
2. A **voxelization + voxel-constraint pipeline** (proposed approach designed for parallel compute shaders).

---

## Baseline: Tetrahedralization → XPBD constraints (comparison pipeline)

### 1) Generate tetrahedral mesh
- Use **TetGen** (Delaunay-based tetrahedralization) to subdivide triangle meshes into tetrahedra. :contentReference[oaicite:4]{index=4}  
- Practical issue: many real meshes need preprocessing and still fail due to **self-intersections** and **holes**; only a subset of meshes can be tetrahedralized successfully without heavy cleanup. :contentReference[oaicite:5]{index=5}

### 2) Reduce complexity to improve parallel partitioning
- Reduce tetrahedra count to reduce required partition count.
- Apply mesh simplification (e.g., Meshlab filters) to keep face count low (e.g., under ~1000 faces). :contentReference[oaicite:6]{index=6}

### 3) Initialize particles and constraints
From the tetrahedral mesh:
- Particles = tetrahedron vertices
- Constraints = **volume constraints** (per tetrahedron) + **distance constraints** (edges)

### 4) Partition constraints to avoid race conditions on GPU
To parallelize constraint solving, partition constraints so:
- “No two constraints in the same set share a common particle” (prevents write conflicts). :contentReference[oaicite:7]{index=7}  
This is the core GPU constraint-scheduling requirement.

### 5) Solve constraints (volume + distance)
During each substep/iteration:
- **Volume constraints**: compute current tetra volume vs target, compute a correction factor using the constraint gradient + inverse masses, apply position corrections. :contentReference[oaicite:8]{index=8}  
- **Distance constraints**: iteratively adjust endpoints to match a target rest length. :contentReference[oaicite:9]{index=9}  

### 6) Evaluate performance
Measure runtime cost per frame spent resolving constraints (volume + distance) and compute shader runtime with a fixed workgroup size (e.g., 1024 invocations/workgroup). :contentReference[oaicite:10]{index=10}

---

## Proposed: Voxelization → XPBD particles → Voxel constraints (primary pipeline)

The voxel pipeline is designed to remove fragile mesh preprocessing and to exploit **regular structure** (better for compute shaders and interactive editing). It also enables a straightforward **Level-of-Detail (LoD)** scheme for long-range constraints. :contentReference[oaicite:11]{index=11} :contentReference[oaicite:12]{index=12}

### 1) Voxelize the input triangle mesh
Key steps in the voxelization pipeline:

- **Dynamic projection axis selection** (geometry shader): choose the best axis per triangle to maximize voxel coverage and avoid missing axis-aligned triangles. :contentReference[oaicite:13]{index=13}  
- **Conservative rasterization**: enlarge the triangle’s projected footprint to guarantee coverage. :contentReference[oaicite:14]{index=14}  
- **Fragment evaluation**: identify which voxel cells are intersected by each triangle.
- **Atomic operations**: necessary due to overlapping triangle writes during parallel voxel marking. :contentReference[oaicite:15]{index=15}  

### 2) Generate XPBD particles from voxels
Convert occupied voxels into simulation particles (regular grid connectivity makes this predictable). :contentReference[oaicite:16]{index=16}

### 3) Partition voxel constraints (trivial scheduling)
Because voxel connectivity is regular, partitioning becomes simpler and more stable than irregular tetrahedral graphs. :contentReference[oaicite:17]{index=17}

### 4) Build “voxel constraints” as the fundamental constraint primitive
Each voxel constraint operates on a fixed local neighborhood of particles:

- **Building block**: a voxel constraint is composed of  
  - **5 tetrahedral volume constraints**, and  
  - **12 axis-aligned distance constraints**. :contentReference[oaicite:18]{index=18}  

This converts many small constraints into a higher-arithmetic-intensity unit that is more GPU-friendly.

### 5) Solver strategy: sequential within the voxel primitive
Even though the voxel constraint contains multiple sub-constraints, it can be treated as a single primitive and solved sequentially inside a compute shader (reducing scheduling complexity to “voxel grid scheduling”). :contentReference[oaicite:19]{index=19}

### 6) LoD scheme for long-range constraints (stiffness)
Connected systems can converge slowly because displacement propagates one iteration at a time; long-range constraints reduce the number of iterations needed for global effects. :contentReference[oaicite:20]{index=20}  
Voxels naturally support LoD (e.g., quadtree/octree / strided LoD), making long-range constraint generation more automatic. :contentReference[oaicite:21]{index=21} :contentReference[oaicite:22]{index=22}

### 7) Benefits expected from the voxel primitive
- **Regularity**: fixed/known partition patterns; better predictability for compute shaders. :contentReference[oaicite:23]{index=23}  
- **Higher arithmetic intensity**: read 8 particles and solve many constraints per voxel vs single distance constraint per edge. :contentReference[oaicite:24]{index=24}  
- **Shared memory opportunities**: voxel-local neighborhoods map well onto workgroup shared memory for speedups. :contentReference[oaicite:25]{index=25}  

---

## Limitations (scope boundaries)
This voxel-based method targets **deformable soft bodies**. Limitations include resolution-dependent detail loss, potential artifacts at low voxel resolutions, and challenges like over-constraint or self-collision under extreme deformation. :contentReference[oaicite:26]{index=26} :contentReference[oaicite:27]{index=27}

---

## Implementation Notes
- Compute-shader-oriented pipeline (constraint editing and solving designed around GPU parallelism). :contentReference[oaicite:28]{index=28}
- Partitioning focuses on preventing read/write conflicts (race conditions) by design. :contentReference[oaicite:29]{index=29}
- Performance evaluation centers on per-frame constraint solve time and shader runtime. :contentReference[oaicite:30]{index=30}
