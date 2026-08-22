async function processOrder() {

    const orderId = document.getElementById("orderId").value.trim();
    const customerName = document.getElementById("customerName").value.trim();
    const customerEmail = document.getElementById("customerEmail").value.trim();

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!orderId || !customerName || !customerEmail) {
        alert("Please fill in Order ID, Customer Name, and Customer Email.");
        return;
    }

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

        // ==========================================
        // CALL DEPLOYED FASTAPI BACKEND
        // ==========================================

        const response = await fetch(
            "https://order-to-cash-orchestrator.onrender.com/process-order",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            }
        );

        if (!response.ok) {
            let errorMessage = "Backend returned HTTP " + response.status;

            try {
                const errorData = await response.json();

                if (errorData.detail) {
                    errorMessage = errorData.detail;
                }
            } catch (e) {
                // Ignore JSON parsing error
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();

        console.log("Backend response:", data);

        // ==========================================
        // SHOW RESULT SECTION
        // ==========================================

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


            // ==========================================
            // VALIDATION AGENT
            // ==========================================

            document.getElementById("validationIcon").textContent =
                "✓";

            document.getElementById("validationStatus").textContent =
                "PASSED";

            document.getElementById("validationStatus").className =
                "passed";


            // ==========================================
            // INVENTORY AGENT
            // ==========================================

            document.getElementById("inventoryIcon").textContent =
                "✓";

            document.getElementById("inventoryStatus").textContent =
                "PASSED";

            document.getElementById("inventoryStatus").className =
                "passed";


            // ==========================================
            // INVOICE AGENT
            // ==========================================

            document.getElementById("invoiceIcon").textContent =
                "✓";

            document.getElementById("invoiceStatus").textContent =
                "PASSED";

            document.getElementById("invoiceStatus").className =
                "passed";


            // ==========================================
            // PAYMENT RISK AGENT
            // ==========================================

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


            // ==========================================
            // AGENTS EXECUTED
            // ==========================================

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


            // ==========================================
            // VALIDATION PASSED
            // ==========================================

            document.getElementById("validationIcon").textContent =
                "✓";

            document.getElementById("validationStatus").textContent =
                "PASSED";

            document.getElementById("validationStatus").className =
                "passed";


            // ==========================================
            // INVENTORY FAILED
            // ==========================================

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


                // Agents executed

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
            "Please check the deployed backend:\n" +
            "https://order-to-cash-orchestrator.onrender.com"
        );

    }

    finally {

        button.disabled = false;

        button.innerHTML =
            "<span>▶</span> Process Order";
    }
}