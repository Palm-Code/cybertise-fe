export function disableArrowKeys(
  event: React.KeyboardEvent<HTMLInputElement>
): void {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
}
