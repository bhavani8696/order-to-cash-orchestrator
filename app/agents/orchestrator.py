from app.models.order import SalesOrder

from app.agents.validation_agent import ValidationAgent
from app.agents.inventory_agent import InventoryAgent
from app.agents.invoice_agent import InvoiceAgent
from app.agents.payment_risk_agent import PaymentRiskAgent
from app.services.logger import logger


class OrderOrchestrator:

    name = "Order Orchestrator"

    def __init__(self):
        self.validation_agent = ValidationAgent()
        self.inventory_agent = InventoryAgent()
        self.invoice_agent = InvoiceAgent()
        self.payment_risk_agent = PaymentRiskAgent()

    def process_order(self, order: SalesOrder) -> dict:

        logger.info(f"Order {order.order_id} started")

        handoffs = []

        # Validation
        logger.info("Orchestrator -> Validation Agent")

        handoffs.append({
            "from": self.name,
            "to": "Validation Agent",
            "action": "Validate sales order"
        })

        validation_result = self.validation_agent.validate(order)

        logger.info(
            f"Validation Agent -> {validation_result['status'].upper()}"
        )

        if validation_result["status"] == "failed":
            logger.error("Order stopped at Validation Agent")

            return {
                "order_id": order.order_id,
                "status": "failed",
                "failed_at": "Validation Agent",
                "handoffs": handoffs,
                "result": validation_result
            }

        # Inventory
        logger.info("Orchestrator -> Inventory Agent")

        handoffs.append({
            "from": self.name,
            "to": "Inventory Agent",
            "action": "Check product availability"
        })

        inventory_result = self.inventory_agent.check_inventory(order)

        logger.info(
            f"Inventory Agent -> {inventory_result['status'].upper()}"
        )

        if inventory_result["status"] == "failed":
            logger.error("Order stopped at Inventory Agent")

            return {
                "order_id": order.order_id,
                "status": "failed",
                "failed_at": "Inventory Agent",
                "handoffs": handoffs,
                "result": inventory_result
            }

        # Invoice
        logger.info("Orchestrator -> Invoice Agent")

        handoffs.append({
            "from": self.name,
            "to": "Invoice Agent",
            "action": "Generate invoice"
        })

        invoice_result = self.invoice_agent.generate_invoice(order)

        logger.info("Invoice Agent -> PASSED")

        # Payment Risk
        logger.info("Orchestrator -> Payment Risk Agent")

        handoffs.append({
            "from": self.name,
            "to": "Payment Risk Agent",
            "action": "Assess payment risk"
        })

        payment_risk_result = self.payment_risk_agent.assess_risk(order)

        logger.info(
            f"Payment Risk Agent -> "
            f"{payment_risk_result['risk']['risk_level']} RISK"
        )

        logger.info(f"Order {order.order_id} completed")

        return {
            "order_id": order.order_id,
            "status": "completed",
            "message": "Order processed successfully.",
            "handoffs": handoffs,
            "steps": {
                "validation": validation_result,
                "inventory": inventory_result,
                "invoice": invoice_result,
                "payment_risk": payment_risk_result
            }
        }