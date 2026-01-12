---
layout: project
title: Voxel Constraints for Parallel XPBD Simulation
description: GPU-first soft-body simulation using voxel primitives for stable parallel constraint solving and LoD long-range stiffness.
cover: /assets/images/thesis.jpg
category: graphics
tags: [xpbd, pbd, gpu, compute-shaders, voxel, physics, constraints]
date: 2025-03-06
---

## TL;DR
A GPU-oriented XPBD soft-body pipeline that uses **voxels as the simulation primitive**. This makes constraint scheduling more regular and enables **LoD long-range constraints** for stiffness and faster convergence.

<div class="columns is-variable is-5">
  <div class="column">
    <div class="box">
      <p class="has-text-grey is-size-7">Focus</p>
      <p><strong>Purpose:</strong> scalable GPU XPBD</p>
      <p><strong>Method:</strong> voxel constraints + LoD</p>
      <p><strong>Outcome:</strong> improved stiffness and practical authoring</p>
    </div>
  </div>
  <div class="column">
    <div class="box">
      <p class="has-text-grey is-size-7">Stack</p>
      <p>Compute shaders, GPU memory model, XPBD constraint solving</p>
      <p>Voxelization + partition scheduling</p>
    </div>
  </div>
</div>

---

## Purpose

### Problem
Parallel XPBD on the GPU runs into two common issues:
- **Race conditions:** constraints can update the same particle concurrently.
- **Brittle preprocessing:** tetrahedralization often requires mesh cleanup and yields irregular constraint graphs.
- **Stiffness/convergence cost:** global motion propagates slowly without long-range constraints.

### Goal
Design a pipeline that is:
- GPU-friendly (predictable scheduling, good memory behavior)
- practical for real meshes (less fragile preprocessing)
- stiff with fewer iterations (LoD long-range constraints)

---

## Methodology


### Baseline pipeline (comparison): tetrahedralization -> XPBD constraints

**Step 1: tetrahedralize mesh**
- Convert triangle surface mesh into tetrahedra (often requires cleanup).

**Step 2: build constraints**
- Volume constraints per tetrahedron
- Distance constraints along edges

**Step 3: partition constraints**
- Schedule constraint sets so no two constraints in the same set write to the same particle.

**Step 4: XPBD solve**
- Iterate partitions per substep.


---

### Proposed pipeline (primary): voxelization -> voxel particles -> voxel constraints

**Step 1: voxelize mesh on GPU**
- Project triangles to a dominant axis
- Conservative rasterization to avoid missing voxels
- Atomics to resolve overlapping writes

**Step 2: generate particles from occupied voxels**
- Regular grid positions simplify neighborhood queries.

**Step 3: deterministic partitioning**
- Grid structure makes scheduling more stable than irregular tetra graphs.

---

### Voxel constraint primitive (the core idea)
Instead of treating "edge distance constraint" as the primitive, I treat a **voxel cell neighborhood** as the primitive.

A single voxel constraint aggregates multiple sub-constraints:
- several local volume constraints
- several axis-aligned distance constraints

This increases arithmetic intensity (more math per memory fetch) and maps well to GPU workgroups.

---

### LoD long-range constraints
Local constraints alone converge slowly for global stiffness. Voxels support multi-resolution structure naturally.

LoD helps by:
- adding longer-range constraints for stiffness
- reducing the number of iterations required for global effects

---

## Results

### Qualitative results (stiffness / behavior)
Show side-by-side captures or short clips:
- without LoD: droops/collapses more
- with LoD: holds shape better


### Performance evaluation
Key metrics to report (use your slides/tables):
- constraint solving time per frame
- partition count / number of phases
- cost breakdown: voxelization vs solve


---

## Takeaways

- Regular voxel structure makes **parallel scheduling** simpler and more predictable.
- Voxel constraints are a GPU-friendly work unit (fixed neighborhood, shared memory potential).
- LoD long-range constraints provide stiffness without relying purely on high iteration counts.

---

## Limitations

- Resolution-dependent detail loss (voxel grid tradeoff).
- Extreme deformation can introduce self-collision / over-constraint challenges.
- Best suited for deformable soft-body behavior (scope-defined).

---

## What I would do next

- Adaptive resolution (octree / sparse structures) for scale
- Better self-collision handling
- Authoring tools: interactive editing + profiling view for constraints
