---
layout: project
title: Fluid Simulation with Smoothed Particle Hydrodynamics (SPH)
description: A Lagrangian, particle-based fluid simulator using SPH kernels and pressure/viscosity forces, with real-time collision handling and a live demo.
cover: /assets/images/projects/sph/cover.png
category: graphics
tags: [fluid-simulation, sph, physics, lagrangian, simulation, graphics]
date: 2025-05-01
---

## TL;DR
I implemented a **particle-based fluid simulator** using **Smoothed Particle Hydrodynamics (SPH)** to model incompressible fluid behavior.  
The system computes **density, pressure, and viscosity forces** from local neighborhoods and integrates them in real time, producing visually convincing fluid motion with collision handling and tunable physical parameters.

---

## Overview
This project implements **Smoothed Particle Hydrodynamics (SPH)**, a **mesh-free Lagrangian** approach to fluid simulation. Instead of solving fluid quantities on a grid (Eulerian), SPH represents the fluid as particles and computes density/pressure/forces using local neighborhood smoothing kernels.

**Why SPH?**
- Mesh-free and flexible for complex motion
- Naturally handles free surfaces and splashes
- Intuitive particle viewpoint for interactive demos

---

## Purpose
Realistic fluid motion is difficult because the system involves:
- many interacting elements (particles)
- forces that depend on local neighborhoods
- stability constraints (time step, pressure stiffness)

**Goal:** reproduce visually convincing fluid behavior by building a particle simulator with:
- density estimation
- pressure forces
- viscosity forces
- external forces (gravity)
- collision handling against obstacles

---

## Methodology

### 1) Eulerian vs Lagrangian framing
- **Eulerian:** sample velocity/pressure on a grid.
- **Lagrangian (SPH):** follow moving particles and compute fields from them.

This project uses **Lagrangian SPH**. :contentReference[oaicite:1]{index=1}

---

### 2) Core SPH idea: smoothing kernel + neighborhood
Each particle contributes to nearby particles through a **kernel function**. The kernel is used for:
- density estimation
- gradients (pressure direction)
- Laplacians (viscosity diffusion)

(Your slides mention the kernel and its default gradient/laplacian roles.) :contentReference[oaicite:2]{index=2}

---

### 3) Pipeline per simulation step
At each time step:

#### A) Density estimation
Compute each particle’s density from nearby particle masses.

Why this matters:
- density drives pressure
- pressure drives incompressibility-like behavior

(Your slides emphasize mass-density depending on particle mass and neighborhood.) :contentReference[oaicite:3]{index=3}

#### B) Pressure computation
Use a state relation (often inspired by ideal gas law forms) to convert density error into pressure. :contentReference[oaicite:4]{index=4}

#### C) Internal forces
Compute forces from neighbors:

- **Pressure force:** pushes particles from high pressure to low pressure  
- **Viscosity force:** resists relative motion, smoothing velocity differences :contentReference[oaicite:5]{index=5}

#### D) External forces
- Gravity (baseline external acceleration)
- (Optional extensions: buoyancy, surface tension) :contentReference[oaicite:6]{index=6}

#### E) Integrate
Update velocity and position using the net force.

---

### 4) Collision handling
The simulator resolves particle-obstacle interaction using:
- contact point
- penetration depth
- surface normal at contact point

This prevents particles from tunneling through obstacles and produces believable boundary behavior. :contentReference[oaicite:7]{index=7}

---

## Results

### What works (demo outcomes)
- Particle-based fluid motion with pressure-driven expansion/compression
- Visible viscosity effects (thicker vs runnier behavior)
- Stable gravity-driven flow under collisions

<video controls autoplay muted loop playsinline
       style="width:100%; border-radius:14px; margin-top:1rem;">
  <source src="/assets/videos/sph.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


---

## Parameters you can tune
SPH is very sensitive to physical parameters. The most important ones you can expose in UI:
- rest density
- stiffness (pressure coefficient)
- viscosity coefficient
- smoothing radius (kernel radius)
- time step

(Your slides include a “Physical Parameters” section.) :contentReference[oaicite:9]{index=9}

---

## Limitations
The primary limitation is **computational cost**, especially as particle count increases. SPH requires neighborhood queries and pairwise interactions, which scale poorly without acceleration structures. :contentReference[oaicite:10]{index=10}

Other common practical issues:
- stability constraints requiring small time steps
- clumping / jitter if parameters are poorly tuned
- boundary handling quality depends on collision model

---

## Future work
Concrete extensions that make this feel like a real graphics portfolio project:

- **Obstacle variety:** sphere, terrain, complex colliders :contentReference[oaicite:11]{index=11}  
- **Free surface rendering:** smoother surface extraction/meshing for visuals
- **Erosion / interaction:** fluid affecting terrain over time :contentReference[oaicite:12]{index=12}  
- **Acceleration:** spatial hashing / uniform grid neighbor search
- **GPU path:** compute shader implementation for higher particle counts

---

## References
- R.A. Gingold and J.J. Monaghan (1977), *Smoothed particle hydrodynamics: theory and application...* :contentReference[oaicite:13]{index=13}  
- Demo reference used in the project: kelager.06.pdf :contentReference[oaicite:14]{index=14}
