export const logFunctionException = async <T>(fn: () => T, name: string) => {
  try {
    console.log(`${name} STARTING`);

    const result = await fn();

    console.log(`${name} DONE`);

    return result;
  } catch (error) {
    console.log(error);

    return null;
  }
};
