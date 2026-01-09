---
layout: project
title: Time-Dependent Visualization of Ocean Surface Velocity and Vorticity
description: An interactive scientific visualization tool for exploring ocean surface velocity and vorticity in the Gulf of Mexico over a five-month period using animation, glyphs, and scalar fields.
cover: /assets/images/projects/ocean-viz/cover.jpg
category: graphics
tags: [scientific-visualization, data-visualization, oceanography, vector-fields, vorticity, animation]
date: 2023-05-02
---

## TL;DR
An **interactive, time-dependent visualization system** that lets users explore **ocean surface velocity and vorticity** in the Gulf of Mexico over five months using animated scalar fields, vector glyphs, and a video-streamer-style UI.

---

## Purpose
Ocean surface velocity and vorticity play a critical role in:
- global climate systems
- ocean circulation
- marine transportation and safety
- environmental monitoring

This project aims to make these complex, time-varying datasets **intuitive and explorable** through interactive visualization, allowing users to observe large-scale circulation patterns and temporal changes in the Gulf of Mexico.

---

## Dataset
We used two datasets from the **Gulf of Mexico Research Initiative**:

### 1) Velocity dataset
- 2D spatial grid (longitude × latitude)
- Time-dependent (306 timestamps)
- 12-hour sampling interval
- Grid resolution: **450 × 360**
- Represents **ocean surface velocity**

### 2) Vorticity dataset
- Same spatial resolution and time span
- Encodes **clockwise / counter-clockwise circulation**
- Stored as a separate dataset aligned in time

Together, these datasets cover **April 1 – August 31, 2013**.

---

## Methodology

### 1) Time-dependent visualization design
Because the data is time-varying, we designed the interface to behave like a **video streamer**:

- Play / pause animation
- Next / previous frame
- Jump to first / last frame
- Slider bar to scrub to any timestamp

This allows users to observe both:
- short-term motion
- long-term circulation trends

---

### 2) Visualization modes
We implemented **three complementary visualization modes**, each revealing different physical properties:

#### A) Velocity magnitude (scalar field)
- Velocity magnitude mapped to color
- Uses a **Turbo colormap**
- Highlights regions of strong vs weak flow

#### B) Velocity vectors (glyphs)
- Arrows encode direction and magnitude
- Helps users understand local flow direction
- Useful for tracing circulation paths

#### C) Vorticity visualization
- Visualizes rotational behavior of the flow
- **Warm colors** → positive (counter-clockwise)
- **Cool colors** → negative (clockwise)
- Makes swirling structures immediately visible

---

### 3) Color mapping strategy
Special care was taken when choosing color ranges:

- Turbo colormap with **8 discrete control points**
- Color ranges selected to maximize contrast
- Signed vorticity values clearly separated into warm/cool hues

This ensures circulation patterns remain readable even at small spatial scales.

---

## Results

### What the system enables
- Smooth animation of ocean circulation over five months
- Clear identification of large-scale structures such as:
  - **Loop Current**
  - **Loop Eddy**
- Side-by-side understanding of:
  - velocity magnitude
  - velocity direction
  - vorticity behavior

The animated visualization makes circulation phenomena far easier to understand than static plots.

---

## Discussion
The project met its original objectives and evolved during development:

- Initially planned to visualize only velocity magnitude and vectors
- Expanded to include **vorticity** after discovering a compatible dataset
- The combination of velocity and vorticity views provided a much deeper understanding of ocean dynamics

One limitation is that the dataset was **downsampled**, so the visualization emphasizes **global patterns** rather than fine-scale turbulence.

---

## Limitations
- Reduced spatial resolution limits local detail
- Performance constraints prevent extremely dense glyph fields
- Visualization is descriptive rather than predictive

---

## Future Work
Possible extensions include:
- Higher-resolution datasets over longer time spans
- GPU-accelerated rendering for denser vector fields
- Particle advection / streamlines for flow tracing
- Comparative visualization across different seasons or years

---

## Credits
- **Xinyi Zhou**
- **Michelle He**  
CS 530 — Final Project
