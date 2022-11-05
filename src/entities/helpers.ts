export const valueToQuery = (value: any) => {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  switch (typeof value) {
    case 'string':
      return `"${value}"`;

    case 'number':
      return `${value}`;

    case 'boolean':
      return `${value === true ? 1 : 0}`;

    default:
      throw new Error('Invalid value type');
  }
};

export const rowValuesToQuery = (row: object) => {
  return `(${Object.values(row).map(valueToQuery).join(', ')})`;
};
