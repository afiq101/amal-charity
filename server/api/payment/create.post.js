const ENV = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const { amount } = await readBody(event);

    if (!amount)
      throw createError({
        statusCode: 400,
        statusMessage: "Amount is required",
      });

    //   Check if amount is number
    if (isNaN(amount))
      throw createError({
        statusCode: 400,
        statusMessage: "Amount is not a number",
      });

    //   Check if amount is greater than minimum amount
    const getConfiguration = await getConfiguration("MIN_AMOUNT");

    if (!getConfiguration)
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });

    if (amount < parseFloat(getConfiguration.value))
      throw createError({
        statusCode: 400,
        statusMessage: "Amount is less than minimum amount",
      });

    const billCode = await createPayment(amount);

    return {
      status: 200,
      message: "Payment created successfully",
      data: billCode,
    };
  } catch (error) {
    console.log(error);
    return {
      status: error.statusCode || 500,
      message: error.statusMessage || "Internal Server Error",
    };
  }
});

const createPayment = async (amount) => {
  try {
    const paymentURL = ENV.toyyibpay.url.payment;
    const userSecretKey = await getConfiguration("USER_SECRET_KEY");

    if (!userSecretKey)
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });

    // Generate reference number
    const referenceNo = "AC" + Math.random().toString().slice(2, 10);

    // Convert amount to cents (toyyibpay requirement)
    const amountInCents = parseFloat(amount) * 100;

    // Prepare payment payload
    const paymentData = JSON.stringify({
      userSecretKey: userSecretKey.value,
      topupAmount: amountInCents,
      paymentTitle: "Credit Top Up",
      paymentDescription: "Credit Top Up Payment",
      paymentOrderId: referenceNo,
      returnUrl: "http://localhost:3000/receipt",
      callbackUrl: "http://localhost:3000/api/callback",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: paymentURL,
      headers: {
        "Content-Type": "application/json",
      },
      data: paymentData,
    };

    const response = await fetch(config);

    if (!response.data) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create payment",
      });
    }

    const billCode = response.data[0].BillCode;

    // Insert payment record into database
    const currentDate = new Date();
    await prisma.payment.create({
      data: {
        paymentPayorName: "Credit Top Up",
        paymentPayorEmail: "abc@gmail.com",
        paymentPayorPhone: "0123456789",
        paymentBillCode: billCode,
        paymentBillInvoiceNo: referenceNo,
        paymentBillExternalInvoiceNo: referenceNo,
        paymentBillStatus: 0, // Pending payment
        paymentType: "CREDIT",
        paymentAmount: parseFloat(amount),
        paymentAmountNett: parseFloat(amount),
        paymentFlag: 0,
        paymentStatus: "PENDING",
        paymentCreatedDate: currentDate,
        paymentModifiedDate: currentDate,
      },
    });

    return billCode;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to create payment",
    });
  }
};
