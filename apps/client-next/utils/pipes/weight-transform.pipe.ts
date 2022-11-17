export const weightTransformPipe = (weight: number) => {
  return weight?.toString().replace('.', ',') + ' кг';
};
