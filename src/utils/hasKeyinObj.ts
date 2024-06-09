// check if the key is in the object else return the default key
const hasKeyinObj = <T>(
  key: string | null,
  checkObj: T extends Object ? T : never,
  defaultKey: keyof T,
): keyof T => {
  return key && key in checkObj ? (key as keyof T) : defaultKey;
};

export default hasKeyinObj;
