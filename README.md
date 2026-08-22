# 🚀 Order-to-Cash AI Orchestrator

An AI-powered multi-agent Order-to-Cash (O2C) automation platform that processes customer sales orders through a sequence of specialized agents.

The system demonstrates how multiple specialized business agents work together through a central Order Orchestrator to validate orders, check inventory, generate invoices, and assess payment risk.

---

## 🌐 Live Project Links

### 🖥️ Frontend

https://order-to-cash-frontend.onrender.com

### 🔗 Backend API

https://order-to-cash-orchestrator.onrender.com

### 📚 API Documentation

https://order-to-cash-orchestrator.onrender.com/docs

### 💻 GitHub Repository

https://github.com/bhavani8696/order-to-cash-orchestrator

---

# 📌 1. Project Introduction

Order-to-Cash (O2C) is a business process that begins when a customer places a sales order and continues through order validation, inventory checking, invoice generation, and payment-related risk evaluation.

In this project, the complete workflow is automated using a multi-agent architecture.

A central Order Orchestrator coordinates four specialized agents:

1. Validation Agent
2. Inventory Agent
3. Invoice Agent
4. Payment Risk Agent

The agents execute their tasks sequentially.

If all agents successfully complete their tasks, the order is marked as COMPLETED.

If a critical agent fails, the workflow stops and the system returns a failure response.

---

# 🎯 2. Project Objective

The main objective of this project is to automate a complete Order-to-Cash workflow using a multi-agent architecture.

The system is designed to:

- Accept customer sales orders
- Validate customer and order information
- Check product availability
- Generate invoice information
- Assess payment risk
- Coordinate multiple specialized agents
- Track agent handoffs
- Handle workflow failures
- Return success or failure responses
- Provide a web-based dashboard
- Provide REST APIs
- Deploy the application to the cloud

---

# 🔄 3. Complete Project Workflow

The complete workflow is:

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

The Order Orchestrator controls the complete sequence and ensures that each agent executes only when the previous step succeeds.

---

# 🤖 4. Multi-Agent Architecture

## Order Orchestrator

The Order Orchestrator is the central controller of the application.

It is responsible for:

- Receiving the sales order
- Starting the workflow
- Calling the Validation Agent
- Calling the Inventory Agent
- Calling the Invoice Agent
- Calling the Payment Risk Agent
- Tracking agent handoffs
- Handling failures
- Stopping the workflow when required
- Returning the final result

---

## Validation Agent

The Validation Agent verifies whether the submitted order contains valid information.

It validates information such as:

- Order ID
- Customer name
- Customer email
- Product information
- Product quantity
- Product price
- Payment information

If validation succeeds, the workflow continues.

If validation fails, the workflow stops.

---

## Inventory Agent

The Inventory Agent checks whether the requested product quantity is available.

For example:

Available quantity:

Laptop → 10

Requested quantity:

Laptop → 1

Result:

Inventory PASSED

If the requested quantity is greater than the available quantity, the Inventory Agent returns a failure.

Example:

Available quantity:

Laptop → 10

Requested quantity:

Laptop → 15

Result:

Inventory FAILED

When inventory fails, the remaining agents are not executed.

---

## Invoice Agent

The Invoice Agent is responsible for generating invoice-related information.

It executes after successful validation and inventory verification.

Workflow:

Validation PASSED

↓

Inventory PASSED

↓

Invoice Generated

---

## Payment Risk Agent

The Payment Risk Agent evaluates the payment risk associated with the order.

The system can classify payment risk as:

- LOW
- MEDIUM
- HIGH

For the successful test order, the system returned:

LOW RISK

---

# 🏗️ 5. System Architecture

The application follows a layered architecture.

Frontend

↓

HTTP Request

↓

FastAPI Backend

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

Final Response

↓

Frontend Dashboard

---

# 🛠️ 6. Technologies Used

## Backend Technologies

- Python
- FastAPI
- Pydantic
- Uvicorn

## Frontend Technologies

- HTML5
- CSS3
- JavaScript
- Fetch API

## Testing Technologies

- Pytest
- HTTPX

## DevOps Technologies

- Git
- GitHub
- Docker
- Docker Compose
- Kubernetes
- Terraform

## Deployment

- Render

---

# 📁 7. Project Structure

```text
order-to-cash-orchestrator/
│
├── .github/
│   └── workflows/
│
├── app/
│   │
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
├── README.md
└── .gitignore
