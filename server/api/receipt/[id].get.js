export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    console.log("ID: ", id);

    const payment = await prisma.payment.findFirst({
      where: {
        paymentBillExternalInvoiceNo: id,
      },
    });

    if (!payment) {
      throw createError({
        statusCode: 404,
        message: "Payment not found",
      });
    }

    // Transform payment data to match receipt format
    const receiptData = {
      id: payment.paymentBillInvoiceNo,
      status: payment.paymentStatus.toLowerCase(),
      date: payment.paymentCreatedDate,
      campaign: {
        id: 1,
        title: "PEMADAM, Selangor",
        image:
          "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop",
      },
      donor: {
        name: payment.paymentPayorName,
        email: payment.paymentPayorEmail,
        phone: payment.paymentPayorPhone,
      },
      payment: {
        amount: payment.paymentAmount,
        method: payment.paymentPaymentChannel,
        transactionId: payment.paymentFPXTransactionID,
        status: payment.paymentStatus,
      },
    };

    return {
      status: 200,
      data: receiptData,
    };
  } catch (error) {
    console.error("Receipt Error:", error);
    return {
      status: error.statusCode || 500,
      message: error.message || "Failed to fetch receipt",
    };
  }
});
