---
layout: project
title: Nuclear Engineering Lab Simulator
description: A high-fidelity Unity-based nuclear reactor simulator for operator training and research, featuring real-time interaction and physics-informed reactor kinetics.
cover: /assets/images/projects/nuclear-simulator/cover.jpg
category: unity
tags: [unity, simulation, nuclear-engineering, real-time, matlab, training, visualization]
date: 2024-06-01
---

## TL;DR
A **real-time nuclear reactor simulator** built in Unity for **operator training and research**, combining interactive 3D visualization with **physically accurate reactor kinetics** computed via MATLAB integration.

---

## Purpose
Traditional nuclear engineering education relies heavily on:
- static diagrams
- offline numerical simulations
- limited-access physical labs

This project aims to bridge that gap by providing an **interactive, real-time simulation environment** where users can:
- visualize reactor behavior
- manipulate operational parameters
- observe system response immediately

The simulator is designed for both **training** and **research analysis**.

---

## Project Context
This project was developed in collaboration with **nuclear engineering researchers** and deployed in two forms:

- **Desktop application (Windows)**
- **Web-based application**

It supports instructional use in academic environments and exploratory analysis by researchers.

---

## Methodology

### 1) Unity-based real-time simulation framework
Unity was used as the core platform to:
- render interactive 3D lab environments
- manage user input and UI
- synchronize simulation state with visual feedback

Real-time game development techniques ensure smooth interaction while maintaining responsiveness under continuous simulation updates.

---

### 2) Physics-informed reactor modeling
Accurate reactor behavior is critical. To achieve this:

- Complex numerical calculations (e.g., **point kinetics algorithms**) are handled via **MATLAB integration**
- MATLAB computes reactor state evolution based on control inputs
- Unity acts as the real-time visualization and interaction layer

This separation allows:
- high numerical accuracy
- rapid iteration on visualization and UI
- clean integration between scientific computation and interactive graphics

---

### 3) Interactive operator controls
Users can interact with the simulated reactor by:
- adjusting control parameters
- triggering operational changes
- observing immediate system response

This mirrors real operator workflows and reinforces cause–effect understanding.

---

### 4) Cross-platform deployment
The simulator was deployed as:
- a **Windows application** for local training and demonstrations
- a **web application** for broader accessibility

This dual-deployment approach increases adoption and lowers barriers for instructional use.

---

## Results
- Successfully delivered a **high-fidelity, interactive nuclear reactor simulator**
- Enabled real-time exploration of reactor dynamics with accurate physical behavior
- Supported both instructional and research use cases

The simulator was:
- demonstrated and discussed with domain experts
- adopted as a training and visualization tool in academic contexts

---

## Dissemination & Collaboration
This work was presented at:
- **NESTet**
- **ANS CONTE**

Presentations supported knowledge transfer, validation by subject-matter experts, and broader adoption of the simulator in professional training environments.

---

## Impact
- Enhances nuclear engineering education through interactive visualization
- Bridges game technology with scientific simulation
- Demonstrates the use of real-time graphics as a serious research and training tool

---

## Future Work
Potential extensions include:
- expanded reactor models
- additional safety and fault scenarios
- multi-user or instructor-led training modes
- deeper integration with external simulation tools

---

## Role
**Unity Programmer & Research Assistant**  
Responsible for:
- real-time simulation integration
- Unity implementation and deployment
- collaboration with nuclear engineering researchers
