import { Data } from "./data";

const basicData = {
  stringData: 'Hello',
  numberData: 1,
  booleanData: true,
}

// A mock function to mimic making an async request for data
export function fetchData(): Promise<{ data: Data }> {
  return new Promise<{ data: Data }>((resolve) =>
    setTimeout(() => resolve({ data: basicData }), 500)
  );
}
