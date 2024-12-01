export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const bodyToJson = convertMultipartFormDataToJSON(body);

    console.log("Data Callback from toyyibPay: ", bodyToJson);

    // Update payment status in database based on status_id
    if (bodyToJson.status_id) {
      await prisma.payment.updateMany({
        where: {
          paymentBillCode: bodyToJson.billcode,
        },
        data: {
          paymentBillStatus: parseInt(bodyToJson.status_id),
          paymentStatus: getPaymentStatus(bodyToJson.status_id),
          paymentModifiedDate: new Date(),
          paymentFPXTransactionID: bodyToJson.fpx_transaction_id,
          paymentPaymentChannel: "FPX",
          paymentFlag: bodyToJson.status_id === "1" ? 1 : 0,
        },
      });
    }

    return {
      status: 200,
      message: "Callback processed successfully",
    };
  } catch (error) {
    console.error("Callback Error: ", error);
    return {
      status: 500,
      message: "Failed to process callback",
    };
  }
});

// Helper function to convert ToyyibPay's multipart form data to JSON
function convertMultipartFormDataToJSON(formData) {
  const lines = formData.split("\n");
  const json = {};

  lines.forEach((line) => {
    if (line.startsWith("Content-Disposition")) {
      const fieldName = line.match(/name="([^"]+)"/)[1];
      const value = lines[lines.indexOf(line) + 2];

      json[fieldName] = value.trim();
    }
  });

  return json;
}

// Helper function to map ToyyibPay status_id to payment status
function getPaymentStatus(statusId) {
  const statusMap = {
    1: "SUCCESS",
    2: "PENDING",
    3: "FAILED",
    4: "EXPIRED",
  };

  return statusMap[statusId] || "UNKNOWN";
}

/*
Example ToyyibPay Callback Data:
{
  refno: 'TP2307184927256954',
  status: '1',
  reason: 'Approved',
  billcode: 'p5q9m2jm',
  order_id: 'TP77501503',
  amount: '1000.00',
  status_id: '1',
  msg: 'ok',
  transaction_id: 'TP2307184927256954',
  fpx_transaction_id: '2307182033260003',
  hash: 'c25e475838d1e3cdc0776d849d2bfbec',
  transaction_time: '2023-07-18 20:33:26'
}

ToyyibPay Status Codes:
1 - Success
2 - Pending
3 - Failed
4 - Expired
*/
