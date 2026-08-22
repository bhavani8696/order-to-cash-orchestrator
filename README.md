# 🚀 Order-to-Cash AI Orchestrator

An AI-powered multi-agent order processing system that automates the complete Order-to-Cash workflow using specialized agents.

## 📌 Overview

The Order-to-Cash AI Orchestrator receives a sales order and routes it through multiple specialist agents.

Each agent performs a specific business operation and reports its result back to the central Orchestrator.

### 🔄 Workflow

Customer Order
       ↓
Order Orchestrator
       ↓
Validation Agent
       ↓
Inventory Agent
       ↓
Invoice Agent
       ↓
Payment Risk Agent
       ↓
Order Completed

If any critical agent fails, the Orchestrator stops the workflow and returns the failure point.

---

## 🤖 Multi-Agent Architecture

### 1. Order Orchestrator

Coordinates the complete order-processing workflow.

Responsibilities:

- Receives sales orders
- Coordinates specialist agents
- Tracks agent handoffs
- Handles failures
- Returns final order status

### 2. Validation Agent

Validates:

- Customer information
- Order information
- Product details
- Quantity
- Pricing information

### 3. Inventory Agent

Checks:

- Product availability
- Requested quantity
- Available inventory

Example:

P001 → Laptop → 10 available  
P002 → Wireless Mouse → 20 available  
P003 → Keyboard → 3 available

### 4. Invoice Agent

Generates invoice information after successful validation and inventory verification.

### 5. Payment Risk Agent

Evaluates payment risk and returns a risk level such as:

- LOW
- MEDIUM
- HIGH

---

## 🖥️ Dashboard

The project includes a web-based dashboard for processing orders.

Features:

- Order ID input
- Customer information
- Process Order button
- Real-time processing result
- Agent pipeline visualization
- Success/failure status
- Payment risk status
- Number of agents executed

Example successful workflow:

Validation Agent       ✅ PASSED
Inventory Agent        ✅ PASSED
Invoice Agent          ✅ PASSED
Payment Risk Agent     ✅ LOW RISK

Result:

🟢 ORDER COMPLETED

---

## ❌ Failure Handling

The system also supports agent failure scenarios.

For example, if a customer requests more products than available inventory:

Inventory Agent → ❌ FAILED

The Orchestrator stops further processing.

Example:

Validation Agent       ✅ PASSED
Inventory Agent        ❌ FAILED
Invoice Agent          — NOT EXECUTED
Payment Risk Agent     — NOT EXECUTED

Result:

🔴 ORDER FAILED

This demonstrates controlled multi-agent orchestration and failure handling.

---

## 🛠️ Technology Stack

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

### DevOps

- Docker
- Docker Compose
- Kubernetes
- Terraform
- Git
- GitHub

### Testing

- Pytest

---

## 📁 Project Structure

```text
order-to-cash-orchestrator/
│
├── app/
│   ├── agents/
│   │   ├── validation_agent.py
│   │   ├── inventory_agent.py
│   │   ├── invoice_agent.py
│   │   ├── payment_risk_agent.py
│   │   └── orchestrator.py
│   │
│   ├── models/
│   │   └── order.py
│   │
│   ├── services/
│   │   └── logger.py
│   │
│   ├── config.py
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── data/
│   └── orders.json
│
├── tests/
│   └── test_api.py
│
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
│
├── terraform/
│   └── main.tf
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
