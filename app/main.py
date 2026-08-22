from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models.order import SalesOrder

from app.agents.validation_agent import ValidationAgent
from app.agents.inventory_agent import InventoryAgent
from app.agents.invoice_agent import InvoiceAgent
from app.agents.payment_risk_agent import PaymentRiskAgent
from app.agents.orchestrator import OrderOrchestrator


app = FastAPI(
    title="Order-to-Cash AI Orchestrator",
    description="AI-powered multi-agent order processing system",
    version="1.0.0"
)


# Allow frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create agents
validation_agent = ValidationAgent()
inventory_agent = InventoryAgent()
invoice_agent = InvoiceAgent()
payment_risk_agent = PaymentRiskAgent()

orchestrator = OrderOrchestrator()


@app.get("/")
def root():
    return {
        "message": "Order-to-Cash AI Orchestrator is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/validate-order")
def validate_order(order: SalesOrder):
    return validation_agent.validate(order)


@app.post("/check-inventory")
def check_inventory(order: SalesOrder):
    return inventory_agent.check_inventory(order)


@app.post("/generate-invoice")
def generate_invoice(order: SalesOrder):
    return invoice_agent.generate_invoice(order)


@app.post("/assess-payment-risk")
def assess_payment_risk(order: SalesOrder):
    return payment_risk_agent.assess_risk(order)


@app.post("/process-order")
def process_order(order: SalesOrder):
    return orchestrator.process_order(order)