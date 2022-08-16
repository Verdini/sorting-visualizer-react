export default function Sleep(ms: number): Promise<number> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
