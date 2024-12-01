const ENV = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const { amount } = await readBody(event);
    const { userID } = event.context.user;

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
    const min_amount = await getConfiguration("MIN_AMOUNT");
    console.log("min_amount");
    console.log(min_amount);

    if (!min_amount)
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });

    if (amount < parseFloat(min_amount.configurationValue))
      throw createError({
        statusCode: 400,
        statusMessage: "Amount is less than minimum amount",
      });

    const billCode = await createPayment(amount, userID);
    console.log("billCode");
    console.log(billCode);

    return {
      status: 200,
      message: "Payment created successfully",
      data: {
        url: ENV.toyyibpay.url.redirect + billCode,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: error.statusCode || 500,
      message: error.statusMessage || "Internal Server Error",
    };
  }
});

const createPayment = async (amount, userID) => {
  try {
    const paymentURL = ENV.toyyibpay.url.payment;
    const userSecretKey = await getConfiguration("TYP_ENT_SEC_KEY");

    console.log("paymentURL");
    console.log(paymentURL);

    console.log("userSecretKey");
    console.log(userSecretKey.configurationValue);

    if (!userSecretKey)
      throw createError({
        statusCode: 500,
        statusMessage: "Cannot get user secret key",
      });

    // Generate reference number
    const referenceNo = "AC" + Math.random().toString().slice(2, 10);

    // Convert amount to cents (toyyibpay requirement)
    const amountInCents = parseFloat(amount) * 100;

    // Prepare payment payload
    const paymentData = JSON.stringify({
      userSecretKey: userSecretKey.configurationValue,
      topupAmount: amountInCents,
      paymentTitle: "Credit Top Up",
      paymentDescription: "Credit Top Up Payment",
      paymentOrderId: referenceNo,
      returnUrl: `${ENV.url.app}/receipt/${referenceNo}`,
      callbackUrl: `${ENV.url.app}/api/payment/callback`,
    });

    console.log("paymentData");
    console.log(paymentData);

    const resp = await $fetch(paymentURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: paymentData,
    });

    if (!resp) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create payment",
      });
    }

    // Insert payment record into database
    const currentDate = new Date();
    await prisma.payment.create({
      data: {
        ...(userID ? { user: { connect: { userID: userID } } } : {}),
        paymentPayorName: "Credit Top Up",
        paymentPayorEmail: "abc@gmail.com",
        paymentPayorPhone: "0123456789",
        paymentBillCode: resp[0].BillCode,
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

    return resp[0].BillCode;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Failed to create payment",
    });
  }
};

const getConfiguration = async (code) => {
  try {
    const getConfiguration = await prisma.configuration.findFirst({
      where: {
        configurationCode: code,
      },
    });

    if (!getConfiguration) return false;

    return getConfiguration;
  } catch (error) {
    console.log(error);
    return false;
  }
};
