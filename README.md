# 🚀 Order-to-Cash AI Orchestrator

An AI-powered multi-agent Order-to-Cash (O2C) automation platform that processes sales orders through a sequence of specialized agents.

The system demonstrates how multiple AI/business agents can work together through a central orchestrator to validate orders, check inventory, generate invoices, and assess payment risk.

---

## 🌐 Live Demo

### 🖥️ Frontend
https://order-to-cash-frontend.onrender.com

### 🔗 Backend API
https://order-to-cash-orchestrator.onrender.com

### 📚 API Documentation
https://order-to-cash-orchestrator.onrender.com/docs

---

# 📌 Project Overview

Order-to-Cash is a business process that starts when a customer places an order and continues until the order is successfully processed and the payment risk is evaluated.

This project automates the order-processing workflow using multiple specialized agents.

Instead of allowing one component to perform every operation, the system uses an:

**Order Orchestrator**

to coordinate multiple agents.

### Workflow

```text
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
