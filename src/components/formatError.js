export default function formatError(err) {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) return detail.map(d => d.msg).join("; ");
  if (typeof detail === "string") return detail;
  return err.message || "Onbekende fout";
}