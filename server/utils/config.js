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

export default getConfiguration;
