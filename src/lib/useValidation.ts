import * as v from 'valibot';

const urlSchema = v.pipe(v.string(), v.url());

const useValidation = () => {
  const validateURL = (_: any, value: string) => {
    const result = v.safeParse(urlSchema, value);

    if (!result.success) {
      const errorMessage =
        result.issues?.map((issue) => issue.message).join(', ') ||
        'Invalid link!';
      return Promise.reject(errorMessage);
    }

    return Promise.resolve();
  };

  return { validateURL };
};

export default useValidation;
