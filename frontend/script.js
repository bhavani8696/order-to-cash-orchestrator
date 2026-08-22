async function processOrder() {

    const orderId = document.getElementById("orderId").value;
    const customerName = document.getElementById("customerName").value;
    const customerEmail = document.getElementById("customerEmail").value;

    const orderData = {
        order_id: orderId,
        customer_name: customerName,
        customer_email: customerEmail,

        // SUCCESS TEST
        // P001 = Laptop
        // Available quantity = 10
        // Requested quantity = 1
        items: [
            {
                product_id: "P001",
                product_name: "Laptop",
                quantity: 1,
                unit_price: 50000
            }
        ],

        payment_method: "UPI"
    };

    const button = document.querySelector(".process-btn");

    button.disabled = true;
    button.innerHTML = "⏳ Processing...";

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/process-order",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            }
        );

        if (!response.ok) {
            throw new Error(
                "Backend returned HTTP " + response.status
            );
        }

        const data = await response.json();

        console.log("Backend response:", data);

        // Show result section
        document
            .getElementById("result")
            .classList
            .remove("hidden");


        // ==========================================
        // ORDER ID
        // ==========================================

        document.getElementById("displayOrderId").textContent =
            data.order_id || orderId;

        document.getElementById("summaryOrderId").textContent =
            data.order_id || orderId;


        // ==========================================
        // SUCCESS
        // ==========================================

        if (data.status === "completed") {

            document.getElementById("orderStatus").textContent =
                "🟢 ORDER COMPLETED";

            document.getElementById("orderMessage").textContent =
                data.message ||
                "Order processed successfully.";

            document.getElementById("summaryStatus").textContent =
                "COMPLETED";

            document.getElementById("summaryStatus").style.color =
                "#16a34a";


            // Validation
            document.getElementById("validationIcon").textContent =
                "✓";

            document.getElementById("validationStatus").textContent =
                "PASSED";

            document.getElementById("validationStatus").className =
                "passed";


            // Inventory
            document.getElementById("inventoryIcon").textContent =
                "✓";

            document.getElementById("inventoryStatus").textContent =
                "PASSED";

            document.getElementById("inventoryStatus").className =
                "passed";


            // Invoice
            document.getElementById("invoiceIcon").textContent =
                "✓";

            document.getElementById("invoiceStatus").textContent =
                "PASSED";

            document.getElementById("invoiceStatus").className =
                "passed";


            // Payment Risk
            document.getElementById("paymentIcon").textContent =
                "✓";


            let riskLevel = "LOW";

            if (
                data.steps &&
                data.steps.payment_risk &&
                data.steps.payment_risk.risk
            ) {
                riskLevel =
                    data.steps.payment_risk.risk.risk_level;
            }

            document.getElementById("risk").textContent =
                riskLevel + " RISK";

            document.getElementById("risk").className =
                "risk";

            document.getElementById("summaryRisk").textContent =
                riskLevel;


            // 4 agents completed
            document.getElementById("agentsExecuted").textContent =
                "4 / 4";
        }


        // ==========================================
        // FAILURE
        // ==========================================

        else {

            const failedAgent =
                data.failed_at || "Unknown Agent";

            document.getElementById("orderStatus").textContent =
                "🔴 ORDER FAILED";

            document.getElementById("orderMessage").textContent =
                "Order stopped at " +
                failedAgent +
                ".";

            document.getElementById("summaryStatus").textContent =
                "FAILED";

            document.getElementById("summaryStatus").style.color =
                "#dc2626";


            // --------------------------------------
            // VALIDATION PASSED
            // --------------------------------------

            document.getElementById("validationIcon").textContent =
                "✓";

            document.getElementById("validationStatus").textContent =
                "PASSED";

            document.getElementById("validationStatus").className =
                "passed";


            // --------------------------------------
            // INVENTORY FAILED
            // --------------------------------------

            if (failedAgent === "Inventory Agent") {

                document.getElementById("inventoryIcon").textContent =
                    "✕";

                document.getElementById("inventoryStatus").textContent =
                    "FAILED";

                document.getElementById("inventoryStatus").className =
                    "failed";


                // Invoice not executed
                document.getElementById("invoiceIcon").textContent =
                    "—";

                document.getElementById("invoiceStatus").textContent =
                    "NOT EXECUTED";

                document.getElementById("invoiceStatus").className =
                    "not-executed";


                // Payment not executed
                document.getElementById("paymentIcon").textContent =
                    "—";

                document.getElementById("risk").textContent =
                    "NOT EXECUTED";

                document.getElementById("risk").className =
                    "not-executed";


                document.getElementById("agentsExecuted").textContent =
                    "2 / 4";

                document.getElementById("summaryRisk").textContent =
                    "N/A";
            }
        }

    }

    catch (error) {

        console.error(
            "Order processing error:",
            error
        );

        alert(
            "Could not connect to backend.\n\n" +
            "Make sure FastAPI is running on:\n" +
            "http://127.0.0.1:8000"
        );

    }

    finally {

        button.disabled = false;

        button.innerHTML =
            "<span>▶</span> Process Order";
    }
}